//= Structures & Data
// Own
import { RouteTypeValues } from "@aykelith/xalgenezis-expressjs-data";

export default interface RouteStructureType {
  requestType: RouteTypeValues;
  path: string | string[];
  requestFunc: Function | Function[];
}

