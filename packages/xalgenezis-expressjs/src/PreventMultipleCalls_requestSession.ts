export default () => {
    return {
        getSession: (sessionVariableName : string, req : any) => req.session[sessionVariableName],
        saveSession: async (sessionVariableName : string, value : any, req : any) => {
            req.session[sessionVariableName] = value;
            await new Promise(resolve => req.session.save(resolve));
        },
        checkSession: async (sessionVariableName : string, req : any) => {
            await new Promise(resolve => req.session.reload(resolve));
            return req.session[sessionVariableName];
        },
        cleanSession: async (sessionVariableName : string, req : any) => {
            delete req.session[sessionVariableName];
            await new Promise(resolve => req.session.save(resolve));
        }
    };
}