//= Functions & Modules
// Own
import RequestError from "./RequestError";
// xalGenezis
import GenezisGeneralError from "@aykelith/xalgenezis-generalerror";
export default (settings) => {
    return async (error, req, res, next) => {
        if (error instanceof GenezisGeneralError && settings.resolveGenezisGeneralError) {
            const message = await settings.resolveGenezisGeneralError(error, req);
            // @ts-ignore
            return res.status(error.data?.httpStatus || 400).json(message);
        }
        // @ts-ignore
        if (error instanceof RequestError && error.statusCode != 500) {
            // @ts-ignore
            return res.status(error.statusCode || 400).json(error.message);
        }
        if (settings.callNext)
            return next();
        if (settings.logError)
            console.error(error);
        return res.status(500).end();
    };
};
//# sourceMappingURL=createSimpleRouteErrorHandler.js.map