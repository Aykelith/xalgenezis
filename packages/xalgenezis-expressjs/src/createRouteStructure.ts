//= Structures & Data
// Own
import { RouteType } from "./data/RouteTypes";

export type RouteStructureType = {
    requestType: RouteType,
    path: string | string[],
    requestFunc: Function | Function[]
};

export default (requestType : RouteType, path : string | string[], requestFunc : Function | Function[]) => {
    return {
        requestType: requestType,
        path: path,
        requestFunc: requestFunc
    };
}