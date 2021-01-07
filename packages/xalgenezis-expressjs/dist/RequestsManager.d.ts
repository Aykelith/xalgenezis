import { RouteType } from "./data/RouteTypes";
import { Router } from "express";
export default class RequestManager {
    constructor(app: any);
    addRoute(requestType: RouteType, path: string, requestFunc: Function, router?: Router): void;
    addGroupRoutes(mainPath: string | string[], routes: any[]): void;
    use(f: Function | Function[]): void;
}
//# sourceMappingURL=RequestsManager.d.ts.map