//= Functions & Modules
// Own
import RequestManager from "./RequestsManager";
import RouteStructureType from "./RouteStructureType";

type GroupRoutesType = {
    mainPath: string | string[],
    routesData: RouteStructureType[]
}

export interface SettingsType {
    routes: (GroupRoutesType | RouteStructureType)[],
    routeErrorHandler: Function | Function[]
};

export default (settings : SettingsType) => {
    return (app : any) => {
        let requestManager = new RequestManager(app);

        settings.routes.forEach((routeData : any) => {
            if (routeData.mainPath) {
                requestManager.addGroupRoutes(routeData.mainPath, routeData.routesData);
            } else {
                requestManager.addRoute(routeData.requestType, routeData.path, routeData.requestFunc);
            }
        });

        // @ts-ignore
        if (Array.isArray(settings.routeErrorHandler)) requestManager.use(...settings.routeErrorHandler);
        else                                           requestManager.use(settings.routeErrorHandler);

        return requestManager;
    }
}
