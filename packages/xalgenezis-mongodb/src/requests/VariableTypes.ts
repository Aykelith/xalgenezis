//= Functions & Modules
// Own
import { RequestError } from "@aykelith/xalgenezis-expressjs";
// Packages
import { ObjectID as MongoID } from "mongodb";

export type VariableType_SettingsType = {
    errorCode?: number,
    errorMessage: string
}

export default {
    MongoID: (settings : VariableType_SettingsType) : Function => {
        if (!settings.errorCode) settings.errorCode = 400;

        return (x : any) : MongoID => {
            if (!MongoID.isValid(x)) throw new RequestError(settings.errorCode, settings.errorMessage);
            return new MongoID(x);
        };
    },

    Integer: (settings : VariableType_SettingsType) : Function => {
        if (!settings.errorCode) settings.errorCode = 400;

        return (x : any) : number => {
            let n = Number.parseInt(x);
            if (Number.isNaN(n)) throw new RequestError(settings.errorCode, settings.errorMessage);
            return n;
        };
    }
};