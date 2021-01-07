//= Functions & Modules
// Packages
import { promisify } from "util";

export default (redisClient : any) => {
    if (!redisClient.getAsync) redisClient.getAsync = promisify(redisClient.get).bind(redisClient);
    if (!redisClient.delAsync) redisClient.delAsync = promisify(redisClient.del).bind(redisClient);

    let functions : any = {
        getSession: async (sessionVariableName : string, req : Request) => {
            return await redisClient.getAsync(sessionVariableName);
        },
        saveSession: async (sessionVariableName : string, value : any, req : Request) => {
            redisClient.set(sessionVariableName, value);
        },
        cleanSession: async (sessionVariableName : string, req : Request) => {
            await redisClient.delAsync(sessionVariableName);
        }
    };

    functions.checkSession = functions.getSession;

    return functions;
}