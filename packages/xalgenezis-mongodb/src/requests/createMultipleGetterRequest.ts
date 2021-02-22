//= Functions & Modules
// Own
import BaseRequestSettingsInterface from "./BaseRequestSettingsInterface";
import getCollection from "./getCollection";
import checkOnEmptyResponseArray from "./checkOnEmptyResponseArray";
import createSearchAggregate from "../createSearchAggregate";
// xalgenezis
import { RequestError, createRequest } from "@aykelith/xalgenezis-expressjs";
import { SettingsType } from "@aykelith/xalgenezis-expressjs/dist/createRequest";

export interface Settings extends BaseRequestSettingsInterface {
  onEmptyResponse?: Function[];
  searchQueryMiddleware?: Function;
  afterGetting?: Function;
}

/**
 * @function
 * @description Create a multiple getter that can get multiple MongoDB documents.
 * @warning No checking are made on user projection
 * @exports createMultipleGetter
 * @genezis genezis-utils-router
 *
 * @param {GenezisChecker}          settings The settings for the request
 * @param {RequestFunction[]}      settings.onEmptyResponse An array of functions to be called when the answer from the query is empty
 * @combineWith ":BaseGenezisConfigParams"
 * @combineWith "genezis-utils-router/createRequest.js:GenezisRulesConfigParams"
 *
 * @returns {RequestFunction}
 * @throws {GenezisChecker} If the configuration is wrong
 */
export default (settings: Settings): Function => {
  let onEmptyResponseStopAfter = checkOnEmptyResponseArray(
    settings.onEmptyResponse
  );

  return createRequest(
    <SettingsType>settings,
    async (req: Request, data: any, onSuccess: Function, sharedData: any) => {
      let searchObject = createSearchAggregate(data);

      if (settings.searchQueryMiddleware) {
        searchObject = await settings.searchQueryMiddleware(
          req,
          data,
          sharedData,
          searchObject
        );
      }

      const collection = await getCollection(
        settings.collection,
        req,
        data,
        sharedData
      );

      try {
        const cursor = collection.aggregate(searchObject);

        const docs = await cursor.toArray();

        if (docs.length == 0 && settings.onEmptyResponse) {
          await Promise.all(
            settings.onEmptyResponse.map((f) => f(req, data, onSuccess))
          );
          if (onEmptyResponseStopAfter) return;
        }

        if (settings.afterGetting) {
          await settings.afterGetting(req, data, sharedData, docs);
        }

        await onSuccess(data.onlyCount ? (docs[0] ? docs[0].number : 0) : docs);
      } catch (error) {
        if (error instanceof RequestError) throw error;

        throw new RequestError(500, error.message, error);
      }
    }
  );
};

