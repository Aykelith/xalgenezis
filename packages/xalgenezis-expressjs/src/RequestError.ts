export default class extends Error {
  public statusCode: number;
  public originalError: any;

  constructor(statusCode: number, message?: string, originalError?: any) {
    super(message);

    this.name = this.constructor.name;
    // @ts-ignore
    this.statusCode = statusCode;
    // @ts-ignore
    this.originalError = originalError;

    Error.captureStackTrace(this, this.constructor);
  }
}

