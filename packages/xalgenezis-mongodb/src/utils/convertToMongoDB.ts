//= Functions & Modules
// Packages
import { ObjectID as MongoID } from "mongodb";

export default (x : MongoID | string) => {
    if (!MongoID.isValid(x)) throw new Error();
    return new MongoID(x);
}