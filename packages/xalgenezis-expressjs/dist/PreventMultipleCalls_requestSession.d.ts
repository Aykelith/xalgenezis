declare const _default: () => {
    getSession: (sessionVariableName: string, req: any) => any;
    saveSession: (sessionVariableName: string, value: any, req: any) => Promise<void>;
    checkSession: (sessionVariableName: string, req: any) => Promise<any>;
    cleanSession: (sessionVariableName: string, req: any) => Promise<void>;
};
export default _default;
//# sourceMappingURL=PreventMultipleCalls_requestSession.d.ts.map