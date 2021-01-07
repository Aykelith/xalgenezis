export default class extends Error {
    constructor(type : string | number, data : any, originalError : Error | undefined, customMessage? : string) {
        super(customMessage || `genezis/GeneralError thrown`);

        this.name = this.constructor.name;

        // @ts-ignore
        this.type = type;
        // @ts-ignore
        this.data = data;
        // @ts-ignore
        this.originalError = originalError;

        // @ts-ignore
        Error.captureStackTrace(this, this.constructor);
    }
}