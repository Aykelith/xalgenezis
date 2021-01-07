//= Structures & Data
// Own
import { RouteType } from "./data/RouteTypes";

export default interface RouteStructureType {
    requestType: RouteType,
    path: string | string[],
    requestFunc: Function | Function[]
};