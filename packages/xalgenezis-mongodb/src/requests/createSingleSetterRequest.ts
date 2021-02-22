//= Functions & Modules
// Own
import BaseRequestSettingsInterface from "./BaseRequestSettingsInterface";
import MongoDBRequestFieldInterface from "./MongoDBRequestFieldInterface";
import resolveHandler from "./resolveHandler";
import constructQueryFromArrayOfVariables from "./constructQueryFromArrayOfVariables";
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
  updateBy: MongoDBRequestFieldInterface[][];
  createErrorMessageForChecker?: Function;
  modifiedFieldName?: string;
  findFieldName?: string;
  returnTheUpdatedDoc?: boolean;
  acceptEmptyUserInput?: boolean;
  updateQuery?: any;
  afterUpdated?: Function;
}

/**
 * @function
 * @description Create a single setter that can edit a MongoDB document
 * @exports createSingleSetter
 * @genezis genezis-utils-router
 *
 * @param {GenezisChecker}         settings The settings for the request
 * @param {MongoDBRequestFields[]} settings.updateBy The possible fields to find the document to edit. The order of them matters
 * @param {Booelean}               settings.acceptEmptyUserInput
 * @param {Object | Function}      settings.updateQuery
 * @combineWith ":BaseGenezisConfigParams"
 * @combineWith "genezis-utils-router/createRequest.js:GenezisRulesConfigParams"
 *
 * @returns {RequestFunction}
 * @throws {GenezisChecker} If the configuration is wrong
 */
export default (settings: Settings): Function => {
  if (!settings.modifiedFieldName) settings.modifiedFieldName = "modified";
  if (!settings.findFieldName) settings.findFieldName = "find";
  if (!settings.returnTheUpdatedDoc) settings.returnTheUpdatedDoc = false;
  if (!settings.acceptEmptyUserInput) settings.acceptEmptyUserInput = false;

  if (!settings.onError)
    settings.onError = (error: Error) => {
      throw error;
    };

  return createRequest(
    <SettingsType>settings,
    async (req: Request, data: any, onSuccess: Function, sharedData: any) => {
      if (!data[settings.modifiedFieldName!])
        await settings.onError!(
          new GenezisGeneralError(
            Errors.EDIT_REQUEST__NO_USER_MODIFIED_ENTRY,
            settings.modifiedFieldName
          ),
          req,
          data,
          sharedData
        );

      let findIsEmpty = !data[settings.findFieldName!];
      if (!settings.acceptEmptyUserInput && findIsEmpty) {
        // @ts-ignore
        await settings.onError(
          new GenezisGeneralError(
            Errors.EDIT_REQUEST__NO_USER_FIND_ENTRY,
            settings.findFieldName
          ),
          req,
          data,
          sharedData
        );
      }

      sharedData.updateQuery = {};
      if (settings.updateBy) {
        // @ts-ignore
        sharedData.updateQuery = await constructQueryFromArrayOfVariables(
          settings.updateBy,
          data[settings.findFieldName!]
        );

        if (!sharedData.updateQuery) {
          // @ts-ignore
          await settings.onError(
            new GenezisGeneralError(
              Errors.QUERY_FROM_GIVEN_FIELDS_NOT_FOUND_MATCH
            ),
            req,
            data,
            sharedData
          );
        }
      }

      if (settings.updateQuery) {
        // @ts-ignore
        sharedData.updateQuery = await resolveHandler(
          settings.updateQuery,
          req,
          data[settings.findFieldName!],
          data,
          sharedData,
          sharedData.updateQuery
        );
      }

      let docData: any;

      try {
        docData = await settings.checker(
          req,
          data[settings.modifiedFieldName!],
          data,
          sharedData
        );
      } catch (error) {
        console.log("Error from checker:", error);
        if (error instanceof GenezisGeneralError) {
          // @ts-ignore
          await settings.onError(error, req, data, sharedData);
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

      let result: any;
      try {
        result = await collection.updateOne(sharedData.updateQuery, docData);
      } catch (error) {
        throw new RequestError(500, error.message, error);
      }

      if (result.modifiedCount != 1) {
        // @ts-ignore
        await settings.onError(
          new GenezisGeneralError(Errors.NO_MODIFIED_DOC),
          req,
          data,
          sharedData
        );
      }

      if (settings.afterUpdated) {
        await settings.afterUpdated(req, data, sharedData, result);
      }

      await onSuccess({});
    }
  );
};

