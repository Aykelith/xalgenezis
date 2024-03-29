//= Functions & Modules
// Packages
import { Collection as MongoDBCollection } from "mongodb";

export default interface BaseRequestSettingsInterface {
  collection: MongoDBCollection;
  onBegin?: Function[];
  onError?: Function;
}

