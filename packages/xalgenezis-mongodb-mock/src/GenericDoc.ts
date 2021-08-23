//= Structures & Data
// Others
import { ObjectID as MongoID } from "mongodb";

type GenericDoc = { _id: MongoID; [key: string]: any };
export default GenericDoc;
