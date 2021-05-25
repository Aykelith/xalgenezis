//= Functions & Modules
// Own
import BaseRequestSettingsInterface from "./BaseRequestSettingsInterface";
import getCollection from "./getCollection";
// xalgenezis
import GenezisGeneralError from "@aykelith/xalgenezis-generalerror";
import { RequestError, createRequest } from "@aykelith/xalgenezis-expressjs";
import { SettingsType } from "@aykelith/xalgenezis-expressjs/dist/createRequest";

//= Structures & Data
// Own
import Errors from "./Errors";

export interface Settings extends BaseRequestSettingsInterface {
  checker: Function;
  returnDocField?: string;
  returnTheNewDoc?: boolean;
  afterInserted?: Function;
  customReturn?: Function;
}

/**
 * @function
 * @description Create a single setter that can add a MongoDB document
 * @exports createSingleAdder
 * @genezis genezis-utils-routers
 *
 * @param {GenezisChecker} settings The settings for the request
 * @combineWith ":BaseGenezisConfigParams"
 * @combineWith "genezis-utils-router/createRequest.js:GenezisRulesConfigParams"
 *
 * @returns {RequestFunction}
 * @throws {GenezisChecker} If the configuration is wrong
 */
export default (settings: Settings): Function => {
  if (!settings.returnTheNewDoc) settings.returnTheNewDoc = false;

  if (!settings.onError)
    settings.onError = (error: Error) => {
      throw error;
    };

  return createRequest(
    <SettingsType>settings,
    async (
      req: Request,
      data: any,
      onSuccess: Function,
      sharedData: any,
      _1: any
    ) => {
      if (!data)
        await settings.onError!(
          new GenezisGeneralError(Errors.ADD_REQUEST__NO_USER_ADD_ENTRY),
          req,
          data,
          sharedData
        );

      let doc;
      try {
        doc = await settings.checker(req, data, sharedData);
      } catch (error) {
        if (error instanceof GenezisGeneralError) {
          await settings.onError!(error, req, data, sharedData);
        }

        throw error;
      }

      const collection = await getCollection(
        settings.collection,
        req,
        data,
        sharedData
      );

      // @ts-ignore
      if (req.checkIfUniqueCall) req.checkIfUniqueCall();

      if (data.request_onlyCheck) return await onSuccess({});

      let result: any;
      try {
        result = await collection.insertOne(doc);
      } catch (error) {
        throw new RequestError(500, error.message, error);
      }

      if (result.insertedCount != 1)
        await settings.onError!(
          new GenezisGeneralError(Errors.NO_MODIFIED_DOC),
          req,
          data,
          sharedData
        );

      if (settings.afterInserted) {
        await settings.afterInserted(req, data, sharedData, result);
      }

      if (settings.customReturn) {
        await onSuccess(
          await settings.customReturn(req, data, sharedData, result.ops[0])
        );
      } else {
        await onSuccess(
          settings.returnTheNewDoc
            ? result.ops[0]
            : settings.returnDocField
            ? result.ops[0][settings.returnDocField].toString()
            : {}
        );
      }
    }
  );
};
