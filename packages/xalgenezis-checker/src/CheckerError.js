//= Functions & Modules
// xalgenezis
import GenezisGeneralError from "@aykelith/xalgenezis-generalerror";

export default class extends GenezisGeneralError {
    constructor(type, property, value, originalError, additionalData) {
        super(
            type,
            {
                property,
                value,
                additionalData
            },
            originalError, 
            `genezis/CheckerError of type ${type} on "${property}":"${value}"`
        );

        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}