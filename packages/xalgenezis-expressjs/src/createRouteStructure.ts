//= Structures & Data
// Own
import { RouteTypeValues } from "@aykelith/xalgenezis-expressjs-data";

export default (
  requestType: RouteTypeValues,
  path: string | string[],
  requestFunc: Function | Function[]
) => {
  return {
    requestType: requestType,
    path: path,
    requestFunc: requestFunc,
  };
};

