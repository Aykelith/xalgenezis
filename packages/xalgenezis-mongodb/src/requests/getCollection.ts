//= Functions & Modules
// Packages
import { Collection as MongoDBCollection } from "mongodb";

/**
 * @description Get the collection from settings
 * @async
 * 
 * @param {MongoDB.Collection | CollectionRetrieverFunction} collection The collection given in the settings
 * @param {Request} req The request object
 */
export default async (collection : MongoDBCollection | Function, req : Request, data : any, sharedData : any) : Promise<MongoDBCollection> => {
    if (typeof collection == "function") return await collection(req, data, sharedData);
    return collection;
}