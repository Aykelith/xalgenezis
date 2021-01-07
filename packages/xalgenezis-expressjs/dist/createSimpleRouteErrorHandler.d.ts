import RequestError from "./RequestError";
import GenezisGeneralError from "@aykelith/xalgenezis-generalerror";
import { Request, Response } from "express";
declare type ErrorType = Error | GenezisGeneralError | RequestError;
declare const _default: (settings: any) => (error: ErrorType, req: Request, res: Response, next: Function) => Promise<any>;
export default _default;
//# sourceMappingURL=createSimpleRouteErrorHandler.d.ts.map