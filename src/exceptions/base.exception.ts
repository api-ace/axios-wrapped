import { isArray, isObject } from "../utils";

export class BaseException extends Error {
  public readonly payload: string | Record<string, unknown>;
  public readonly type: string;


  constructor(payload: string | Record<string, any>, errorType?: string) {
    super(typeof payload === "string" ? payload : payload?.message || "");


    this.payload = payload;
    this.type = errorType ?? new.target.name;
  }


  public getPayload(): string | Record<string, unknown> {
    return this.payload;
  }

  public getType(): string {
    return this.type;
  }

  public static createPayload(
    objectOrError: object | string,
    description?: string,
  ): object {
    if (!objectOrError) {
      return { message: description };
    }

    return isObject(objectOrError) && !isArray(objectOrError)
      ? (objectOrError as object)
      : { message: objectOrError, error: description };
  }
}