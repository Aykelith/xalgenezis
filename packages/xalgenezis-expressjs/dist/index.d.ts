/// <reference types="qs" />
/// <reference types="express" />
import RequestError from "./RequestError";
import RequestsManager from "./RequestsManager";
declare const _default: {
    createRequest: (settings: import("./createRequest").SettingsType | undefined, f: Function) => (req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs>, res: import("express").Response<any>, next: Function) => Promise<void>;
    createRequestLogger: (settings: import("./createRequestLogger").SettingsType) => (head?: string) => (req: Request, data: any) => void;
    createRequestManager: (settings: import("./createRequestManager").SettingsType) => (app: any) => RequestsManager;
    createRouteStructure: (requestType: import("./data/RouteTypes").RouteType, path: string | string[], requestFunc: Function | Function[]) => {
        requestType: import("./data/RouteTypes").RouteType;
        path: string | string[];
        requestFunc: Function | Function[];
    };
    createServer: (settings: import("./createServer").SettingsType) => Promise<import("express-serve-static-core").Express>;
    createSimpleRouteErrorHandler: (settings: any) => (error: import("@aykelith/xalgenezis-generalerror").default | Error | RequestError, req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs>, res: import("express").Response<any>, next: Function) => Promise<any>;
    initialize: (settings: import("./initialize").Settings) => void;
    PreventMultipleCalls_redisSession: (redisClient: any) => any;
    PreventMultipleCalls_requestSession: () => {
        getSession: (sessionVariableName: string, req: any) => any;
        saveSession: (sessionVariableName: string, value: any, req: any) => Promise<void>;
        checkSession: (sessionVariableName: string, req: any) => Promise<any>;
        cleanSession: (sessionVariableName: string, req: any) => Promise<void>;
    };
    PreventMultipleCalls_requestSetup: (requestSettings: any) => void;
    RequestError: typeof RequestError;
    RequestsManager: typeof RequestsManager;
    RequestWithStatus_redisSession: (redisClient: any) => {
        createStatusSession: (customSessionName: string, initialValue: any) => Promise<string>;
        getStatusSession: (sessionName: string) => Promise<any>;
        setStatusSession: (sessionName: string, value: any) => Promise<void>;
        deleteStatusSession: (sessionName: string) => Promise<void>;
    };
    RequestWithStatusUtils: {
        createStatusSession: any;
        setStatusSession: any;
        getStatusSession: any;
        deleteStatusSession: any;
    };
    RouteTypes: {
        readonly GET: 0;
        readonly POST: 1;
        readonly ALL: 9;
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map