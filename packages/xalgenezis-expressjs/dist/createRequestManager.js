//= Functions & Modules
// Own
import RequestManager from "./RequestsManager";
;
export default (settings) => {
    return (app) => {
        let requestManager = new RequestManager(app);
        settings.routes.forEach((routeData) => {
            if (routeData.mainPath) {
                requestManager.addGroupRoutes(routeData.mainPath, routeData.routesData);
            }
            else {
                requestManager.addRoute(routeData.requestType, routeData.path, routeData.requestFunc);
            }
        });
        // @ts-ignore
        if (Array.isArray(settings.routeErrorHandler))
            requestManager.use(...settings.routeErrorHandler);
        else
            requestManager.use(settings.routeErrorHandler);
        return requestManager;
    };
};
//# sourceMappingURL=createRequestManager.js.map