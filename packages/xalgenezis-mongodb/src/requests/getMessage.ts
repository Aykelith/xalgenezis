export default async (message : string | Function, req? : Request) : Promise<string> => {
    if (typeof message == "function") return await message(req);
    return message;
}