//= Functions & Modules
// xalGenezis
import GenezisGeneralError from "@aykelith/xalgenezis-generalerror";
import RequestError from "@aykelith/xalgenezis-expressjs/RequestError";

export default (settings) => {
    return async (error, req, res, next) => {
        if (error instanceof GenezisGeneralError && settings.resolveGenezisGeneralError) {
            const message = await settings.resolveGenezisGeneralError(error, req);

            return res.status(error.data?.httpStatus || 400).json(message);
        }

        if (error instanceof RequestError && error.statusCode != 500) {
            return res.status(error.statusCode || 400).json(error.message);
        }

        if (settings.callNext) return next();
        if (settings.logError) console.error(error);

        return res.status(500).end();
    };
};