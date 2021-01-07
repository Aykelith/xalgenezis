import { RouteType } from "./data/RouteTypes";
export declare type RouteStructureType = {
    requestType: RouteType;
    path: string | string[];
    requestFunc: Function | Function[];
};
declare const _default: (requestType: RouteType, path: string | string[], requestFunc: Function | Function[]) => {
    requestType: RouteType;
    path: string | string[];
    requestFunc: Function | Function[];
};
export default _default;
//# sourceMappingURL=createRouteStructure.d.ts.map