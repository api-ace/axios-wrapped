import { BaseException } from "./base.exception";

export class InternalException extends BaseException {
  constructor(objectOrError: string | object, description = "Something Went Wrong!") {
    super(BaseException.createPayload(objectOrError, description), 500);
  }
}
