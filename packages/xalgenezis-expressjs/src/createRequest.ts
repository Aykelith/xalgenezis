//= Functions & Modules
// Own
import PreventMultipleCalls_requestSetup from "./PreventMultipleCalls_requestSetup";
// Packages
import { Request, Response } from "express";

export const ERROR_ALREADY_IN_REQUEST = "error:already_in_request";

function getRequestData(req: Request) {
  return req.method == "GET" ? req.query : req.body;
}

export interface SettingsType {
  onBegin?: Function[];
  onEnd?: Function[];
  onRequestError?: Function[];
  preventMultipleCalls?: any;
}

type HeadParamsType = {
  status: number;
  headers: string;
};

export default (settings: SettingsType = {}, f: Function) => {
  if (!global._genezis_router) {
    global._genezis_router = {};
    console.warn("xalgenezis-expressjs: Need to initialize genezis router");
  }

  if (settings.preventMultipleCalls)
    PreventMultipleCalls_requestSetup(settings);

  return async (req: Request, res: Response, next: Function) => {
    let sharedData = { req };

    let onSuccess = (
      response: Response,
      callNext: boolean = false,
      resMethod: string = "json",
      resEndType: string,
      writeHeadParams: HeadParamsType
    ) => {
      if (callNext) {
        next();
        return;
      }

      if (writeHeadParams)
        res.writeHead(writeHeadParams.status, writeHeadParams.headers);

      // @ts-ignore
      if (resEndType) res[resMethod](response, resEndType);
      // @ts-ignore
      else res[resMethod](response);
    };

    const data = getRequestData(req);

    try {
      if (settings.onBegin) {
        for (let i = 0, length = settings.onBegin.length; i < length; ++i) {
          await settings.onBegin[i](req, data, sharedData);
        }
      }

      await f(req, data, onSuccess, sharedData, res);

      if (settings.onEnd) {
        for (let i = 0, length = settings.onEnd.length; i < length; ++i) {
          await settings.onEnd[i](req, data, sharedData);
        }
      }
    } catch (error) {
      if (settings.onRequestError) {
        for (
          let i = 0, length = settings.onRequestError.length;
          i < length;
          ++i
        ) {
          await settings.onRequestError[i](req, data, sharedData, error);
        }
      }

      throw error;
    }
  };
};

/**
 * @name GenezisRulesConfigParams
 *
 * @param {RequestFunction[]} onBegin an array of RequestFunction functions that are called in the beggining of the request
 */

