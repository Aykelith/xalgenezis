export interface SettingsType {
    viewEngine?: string;
    viewsPaths?: string[];
    staticPaths?: string[];
    supportJSONRequest?: {
        limit?: string;
    };
    supportGet?: {
        limit?: string;
        extended?: boolean;
    };
    trustProxy?: boolean;
    hmr?: {
        webpackConfigFilePath: string;
    };
    session?: {
        secret: string;
        saveUninitialized?: boolean;
        resave: boolean;
        cookie?: {
            secure: boolean;
        };
        store: Function;
    };
    port?: number;
    plugins?: Function[];
    before?: Function;
    onlySecure?: boolean;
    secureSettings?: {
        key: string;
        cert: string;
        port?: number;
    };
    webpack_hot_middleware_settings?: any;
}
declare const _default: (settings: SettingsType) => Promise<import("express-serve-static-core").Express>;
/**
 *
 */
export default _default;
//# sourceMappingURL=createServer.d.ts.map