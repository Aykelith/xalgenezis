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
import { FindOneOptions } from "mongodb";

//= Structures & Data
// Own
import Errors from "./Errors";

export interface Settings extends BaseRequestSettingsInterface {
  getBy: MongoDBRequestFieldInterface[][];
  userProjectionAllowed?: boolean;
  userProjectionInputField?: string;
  customOnSuccess?: Function;
  findQueryMiddleware?: Function;
  customFindQueryMaker?: Function;
  customFindOneSettings?: Function;
  checksBeforeGettingDoc?: Function;
  onNoDocumentFound?: Function;
  onError: Function;
}

/**
 * @function
 * @description Create a getter that can get a single MongoDB document.
 * @warning No checking are made on user projection is it is allowed
 * @exports createSingleGetter
 * @genezis genezis-utils-router
 *
 * @param {GenezisChecker}         settings The settings for the request
 * @param {MongoDBRequestFields[]} settings.getBy The possible fields to get by the document. The order of them matters
 * @param {RequestFunction[]}      settings.onEmptyResponse An array of functions to be called when the answer from the query is empty
 * @param {Boolean}                settings.userProjectionAllowed Allow the user to set the fields to receive
 * @combineWith ":BaseGenezisConfigParams"
 * @combineWith "genezis-utils-router/createRequest.js:GenezisRulesConfigParams"
 *
 * @returns {RequestFunction}
 * @throws {GenezisChecker} If the configuration is wrong
 */
export default (settings: Settings): Function => {
  if (!settings.userProjectionAllowed) {
    settings.userProjectionAllowed = false;

    if (settings.userProjectionInputField)
      throw new Error(
        'The argument "userProjectionAllowed" is false, but the argument "userProjectionInputField" was defined'
      );
  } else {
    if (!settings.userProjectionInputField)
      throw new Error(
        'The argument "userProjectionAllowed" is true, but the argument "userProjectionInputField" is missing'
      );
  }

  if (settings.customFindQueryMaker) {
    if (settings.getBy)
      throw new Error(
        'You can\'t specify "customFindQueryMaker" and "getBy" togheter'
      );
  } else {
    if (!settings.getBy)
      throw new Error(
        'You can\'t specify "customFindQueryMaker" and "getBy" togheter'
      );
  }

  if (!settings.onError)
    settings.onError = (error: Error) => {
      throw error;
    };

  return createRequest(
    <SettingsType>settings,
    async (req: Request, data: any, onSuccess: Function, sharedData: any) => {
      let findOneSettings: any = {};
      if (
        settings.userProjectionAllowed &&
        settings.userProjectionInputField &&
        data[settings.userProjectionInputField]
      ) {
        // TODO: check if is object or it remains a string

        // @ts-ignore
        if (!Array.isArray(data[settings.userProjectionInputField])) {
          await settings.onError(
            new GenezisGeneralError(Errors.WRONG_TYPE, {
              field: settings.userProjectionInputField,
              mustBe: "Array",
            }),
            req,
            data,
            sharedData
          );
        }

        findOneSettings.projection = {};
        for (
          let i = 0, length = data[settings.userProjectionInputField].length;
          i < length;
          ++i
        ) {
          findOneSettings.projection[
            data[settings.userProjectionInputField][i]
          ] = 1;
        }
      }

      if (settings.customFindOneSettings) {
        // @ts-ignore
        findOneSettings = await resolveHandler(
          settings.customFindOneSettings,
          req,
          data,
          sharedData,
          findOneSettings
        );
      }

      let findOneQuery;
      if (settings.customFindQueryMaker) {
        findOneQuery = settings.customFindQueryMaker(req, data, sharedData);

        if (!findOneQuery) {
          throw new Error(
            'The function "customFindQueryMaker" should return the search object'
          );
        }
      } else {
        findOneQuery = await constructQueryFromArrayOfVariables(
          settings.getBy,
          data
        );

        if (!findOneQuery) {
          await settings.onError(
            new GenezisGeneralError(
              Errors.QUERY_FROM_GIVEN_FIELDS_NOT_FOUND_MATCH
            ),
            req,
            data,
            sharedData
          );
        }

        if (settings.findQueryMiddleware) {
          // @ts-ignore
          findOneQuery = await resolveHandler(
            settings.findQueryMiddleware,
            req,
            data,
            sharedData,
            findOneQuery
          );

          if (!findOneQuery) {
            throw new Error(
              'The function "findQueryMiddleware" should return the search object'
            );
          }
        }
      }

      if (settings.checksBeforeGettingDoc) {
        await settings.checksBeforeGettingDoc(
          req,
          data,
          sharedData,
          findOneQuery,
          findOneSettings
        );
      }

      const collection = await getCollection(
        settings.collection,
        req,
        data,
        sharedData
      );

      try {
        const doc = await collection.findOne(
          findOneQuery,
          <FindOneOptions<any>>findOneSettings
        );

        if (!doc && settings.onNoDocumentFound) {
          if (
            await settings.onNoDocumentFound(req, data, sharedData, onSuccess)
          )
            return;
        }

        if (settings.customOnSuccess)
          await settings.customOnSuccess(req, data, sharedData, onSuccess, doc);
        else await onSuccess(doc);
      } catch (error) {
        if (error instanceof RequestError) throw error;

        throw new RequestError(500, error.message, error);
      }
    }
  );
};

