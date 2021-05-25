export default class GenezisGeneralError extends Error {
  public type: string | number;
  public data: any;
  public originalError: any;

  constructor(
    type: string | number,
    data?: any,
    originalError?: any,
    customMessage?: string
  ) {
    super(customMessage || `genezis/GeneralError thrown with type "${type}"`);

    this.name = this.constructor.name;

    this.type = type;
    this.data = data;
    this.originalError = originalError;

    // @ts-ignore
    Error.captureStackTrace(this, this.constructor);
  }
}
