declare global {
    namespace NodeJS {
        interface Global {
            _genezis_router: any;
        }
    }
}
export interface Settings {
    preventMultipleCalls?: {
        getSession: Function;
        saveSession: Function;
        cleanSession: Function;
    };
    requestWithStatus?: {
        prefixSessionName?: string;
        expireSeconds?: number;
        createStatusSession: Function;
        setStatusSession: Function;
        getStatusSession: Function;
        deleteStatusSession: Function;
    };
}
declare const _default: (settings: Settings) => void;
export default _default;
//# sourceMappingURL=initialize.d.ts.map