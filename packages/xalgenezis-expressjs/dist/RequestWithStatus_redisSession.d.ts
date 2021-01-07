declare const _default: (redisClient: any) => {
    createStatusSession: (customSessionName: string, initialValue: any) => Promise<string>;
    getStatusSession: (sessionName: string) => Promise<any>;
    setStatusSession: (sessionName: string, value: any) => Promise<void>;
    deleteStatusSession: (sessionName: string) => Promise<void>;
};
export default _default;
//# sourceMappingURL=RequestWithStatus_redisSession.d.ts.map