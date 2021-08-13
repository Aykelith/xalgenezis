//= Functions & Modules
// Own
import { createRouteFunction } from "@aykelith/xalgenezis-expressjs-data";
import { RouteTypeValues } from "@aykelith/xalgenezis-expressjs-data";
// Packages
// @ts-ignore
import asyncHandler from "express-async-handler";
import express, { Router } from "express";

export default class RequestManager {
  constructor(app: any) {
    if (!app) throw new Error();

    // @ts-ignore
    this.app = app;
  }

  addRoute(
    requestType: RouteTypeValues,
    path: string,
    requestFunc: Function,
    router?: Router
  ) {
    // @ts-ignore
    (router || this.app)[createRouteFunction(requestType)](
      path,
      Array.isArray(requestFunc)
        ? requestFunc.map((f) => asyncHandler(f))
        : asyncHandler(requestFunc)
    );
  }

  addGroupRoutes(mainPath: string | string[], routes: any[]) {
    console.log(mainPath);
    const router = express.Router();

    routes.forEach((data) =>
      this.addRoute(data.requestType, data.path, data.requestFunc, router)
    );

    // @ts-ignore
    this.app.use(mainPath, router);
  }

  use(f: Function | Function[]) {
    // @ts-ignore
    this.app.use(f);
  }
}
