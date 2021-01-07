import RequestManager from "./RequestsManager";
import { RouteStructureType } from "./createRouteStructure";
declare type GroupRoutesType = {
    mainPath: string | string[];
    routesData: RouteStructureType[];
};
export interface SettingsType {
    routes: (GroupRoutesType | RouteStructureType)[];
    routeErrorHandler: Function | Function[];
}
declare const _default: (settings: SettingsType) => (app: any) => RequestManager;
export default _default;
//# sourceMappingURL=createRequestManager.d.ts.map