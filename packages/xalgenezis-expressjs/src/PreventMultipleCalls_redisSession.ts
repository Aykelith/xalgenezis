export default (redisClient: any) => {
  let functions: any = {
    getSession: async (sessionVariableName: string, req: Request) => {
      return await redisClient.get(sessionVariableName);
    },
    saveSession: async (
      sessionVariableName: string,
      value: any,
      req: Request
    ) => {
      redisClient.set(sessionVariableName, value);
    },
    cleanSession: async (sessionVariableName: string, req: Request) => {
      await redisClient.del(sessionVariableName);
    },
  };

  functions.checkSession = functions.getSession;

  return functions;
};

