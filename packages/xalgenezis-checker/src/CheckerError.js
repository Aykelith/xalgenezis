import GenezisGeneralError from "@aykelith/xalgenezis-generalerror";

export default class extends GenezisGeneralError {
    constructor(type, data, originalError, customMessage) {
        super(customMessage || `genezis/GeneralError thrown`);

        this.name = this.constructor.name;

        this.type = type;
        this.data = data;
        this.originalError = originalError;

        Error.captureStackTrace(this, this.constructor);
    }
}