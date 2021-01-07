//= Functions & Modules
// xalgenezis
import RouteStructureType from "@aykelith/xalgenezis-expressjs/dist/RouteStructureType";
// Packages
import { Collection as MongoDBCollection } from "mongodb";

export default interface BaseRequestSettingsInterface extends RouteStructureType {
    collection: MongoDBCollection,
    onError?: Function
};