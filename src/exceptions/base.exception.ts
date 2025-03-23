import { isArray, isObject } from "../utils";

export class BaseException {
  public readonly payload: string | Record<string, unknown>;
  public readonly status: number;
  public readonly type: string;
  public readonly isRpc = true;

  constructor(payload: string | Record<string, any>, status: number, errorType?: string) {

    this.payload = payload;
    this.status = status;
    this.type = errorType ?? this.constructor.name;
  }

  public getStatus(): number {
    return this.status;
  }

  public getPayload(): string | Record<string, unknown> {
    return this.payload;
  }

  public getType(): string {
    return this.type;
  }

  public static createPayload(objectOrError: object | string, description?: string, statusCode?: number): object {
    if (!objectOrError) {
      return { statusCode, message: description };
    }

    return isObject(objectOrError) && !isArray(objectOrError) ? (objectOrError as object) : { statusCode, message: objectOrError, error: description };
  }
}
