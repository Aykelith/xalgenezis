//= Functions & Modules
// Own
import BaseRequestSettingsInterface from "./BaseRequestSettingsInterface";
import getCollection from "./getCollection";
import getMessage from "./getMessage";
// xalgenezis
import GenezisGeneralError from "@aykelith/xalgenezis-generalerror";
import { RequestError, createRequest } from "@aykelith/xalgenezis-expressjs";
import { SettingsType } from "@aykelith/xalgenezis-expressjs/dist/createRequest";

//= Structures & Data
// Own
import Errors from "./Errors";

export interface Settings extends BaseRequestSettingsInterface {
  afterDeletedRequiresDoc?: boolean;
  afterDeleted?: Function;
  oneField?: {
    inputFieldName: string;
    dbFieldName?: string;
    fieldTransformer?: Function;
  };
  queryMaker: Function;
  messageOnNoData: string | Function;
  beforeDeleting?: Function;

  throwErrorOnNoDocumentDeleted?: boolean;
}

export default (settings: Settings): Function => {
  if (!settings.afterDeletedRequiresDoc)
    settings.afterDeletedRequiresDoc = false;
  if (!settings.queryMaker) {
    if (settings.oneField !== undefined) {
      settings.queryMaker = (_req: Request, data: any, _sharedData: any) => {
        const dbFieldName =
          settings.oneField!.dbFieldName || settings.oneField!.inputFieldName;

        return {
          [dbFieldName]: data[settings.oneField!.inputFieldName],
        };
      };
    } else {
      throw new GenezisGeneralError(Errors.MISSING, "queryMaker");
    }
  }

  if (!settings.onError)
    settings.onError = (error: Error) => {
      throw error;
    };

  if (settings.throwErrorOnNoDocumentDeleted == undefined)
    settings.throwErrorOnNoDocumentDeleted = true;

  return createRequest(
    <SettingsType>settings,
    async (req: Request, data: any, onSuccess: Function, sharedData: any) => {
      if (!data)
        throw new RequestError(
          400,
          await getMessage(settings.messageOnNoData, req)
        );

      if (settings.oneField) {
        if (!data[settings.oneField.inputFieldName])
          await settings.onError!(
            new GenezisGeneralError(Errors.DELETE_REQUEST__NO_INPUT_FIELD_NAME),
            req,
            data,
            sharedData
          );

        if (settings.oneField.fieldTransformer) {
          data[
            settings.oneField.inputFieldName
          ] = await settings.oneField.fieldTransformer(
            data[settings.oneField.inputFieldName],
            req
          );
        }
      }

      if (settings.beforeDeleting)
        await settings.beforeDeleting(req, data, sharedData);

      const collection = await getCollection(
        settings.collection,
        req,
        data,
        sharedData
      );

      let result: any;
      try {
        if (settings.afterDeletedRequiresDoc)
          result = await collection["findOneAndDelete"](
            await settings.queryMaker(req, data, sharedData)
          );
        else
          result = await collection["deleteOne"](
            await settings.queryMaker(req, data, sharedData)
          );
      } catch (error) {
        throw new RequestError(500, error.message, error);
      }

      const itWorked = settings.afterDeletedRequiresDoc
        ? result.lastErrorObject.n == 1
        : result.deletedCount == 1;

      if (!itWorked) {
        if (settings.throwErrorOnNoDocumentDeleted)
          await settings.onError!(
            new GenezisGeneralError(Errors.DELETE_REQUEST__NO_DOCUMENT_DELETED),
            req,
            data,
            sharedData
          );
      }

      if (settings.afterDeleted) {
        await settings.afterDeleted(req, data, sharedData, result.value);
      }

      await onSuccess({});
    }
  );
};
