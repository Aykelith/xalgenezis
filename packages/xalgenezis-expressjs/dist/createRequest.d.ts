import { Request, Response } from "express";
export declare const ERROR_ALREADY_IN_REQUEST = "error:already_in_request";
export interface SettingsType {
    onBegin?: Function[];
    onEnd?: Function[];
    onRequestError?: Function[];
    preventMultipleCalls?: any;
}
declare const _default: (settings: SettingsType | undefined, f: Function) => (req: Request, res: Response, next: Function) => Promise<void>;
export default _default;
/**
 * @name GenezisRulesConfigParams
 *
 * @param {RequestFunction[]} onBegin an array of RequestFunction functions that are called in the beggining of the request
 */ 
//# sourceMappingURL=createRequest.d.ts.map