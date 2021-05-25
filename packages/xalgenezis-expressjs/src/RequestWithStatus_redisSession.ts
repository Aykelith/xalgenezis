//= Functions & Modules
// Packages
import { promisify } from "util";
import { nanoid } from "nanoid/non-secure";

function createName(name: string) {
  return `${global._genezis_router.requestWithStatus.prefixSessionName}:${name}`;
}

export default (redisClient: any) => {
  if (!redisClient.getAsync)
    redisClient.getAsync = promisify(redisClient.get).bind(redisClient);
  if (!redisClient.expireAsync)
    redisClient.expireAsync = promisify(redisClient.del).bind(redisClient);

  let functions = {
    createStatusSession: async (
      customSessionName: string,
      initialValue: any
    ) => {
      let name = customSessionName;
      if (!name) name = nanoid();

      redisClient.set(createName(name), initialValue);

      return name;
    },
    getStatusSession: async (sessionName: string) => {
      return await redisClient.getAsync(createName(sessionName));
    },
    setStatusSession: async (sessionName: string, value: any) => {
      redisClient.set(createName(sessionName), value);
    },
    deleteStatusSession: async (sessionName: string) => {
      await redisClient.expireAsync(
        createName(sessionName),
        global._genezis_router.requestWithStatus.expireSeconds
      );
    },
  };

  return functions;
};

