export default class extends Error {
    constructor(statusCode : number, message? : string, originalError? : Error) {
        super(message);

        this.name = this.constructor.name;
        // @ts-ignore
        this.statusCode = statusCode;
        // @ts-ignore
        this.originalError = originalError;

        Error.captureStackTrace(this, this.constructor);
    }
};