//= Functions & Modules
// Own
import { createRouteFunction } from "./data/RouteTypes";
// Packages
// @ts-ignore
import asyncHandler from "express-async-handler";
import express from "express";
export default class RequestManager {
    constructor(app) {
        if (!app)
            throw new Error();
        // @ts-ignore
        this.app = app;
    }
    addRoute(requestType, path, requestFunc, router) {
        // @ts-ignore
        (router || this.app)[createRouteFunction(requestType)](path, Array.isArray(requestFunc) ? requestFunc.map(f => asyncHandler(f)) : asyncHandler(requestFunc));
    }
    addGroupRoutes(mainPath, routes) {
        console.log(mainPath);
        const router = express.Router();
        routes.forEach(data => this.addRoute(data.requestType, data.path, data.requestFunc, router));
        // @ts-ignore
        this.app.use(mainPath, router);
    }
    use(f) {
        // @ts-ignore
        this.app.use(f);
    }
}
;
//# sourceMappingURL=RequestsManager.js.map