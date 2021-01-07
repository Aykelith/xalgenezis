export default class extends Error {
    constructor(statusCode, message, originalError) {
        super(message);
        this.name = this.constructor.name;
        // @ts-ignore
        this.statusCode = statusCode;
        // @ts-ignore
        this.originalError = originalError;
        Error.captureStackTrace(this, this.constructor);
    }
}
;
//# sourceMappingURL=RequestError.js.map