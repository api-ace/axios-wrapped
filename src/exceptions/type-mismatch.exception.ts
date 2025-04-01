import { InternalException } from "./internal.exception";

export class TypeMismatchException extends InternalException {
  constructor(objectOrError: string | object, description = "Type Mismatch") {
    super(objectOrError, description);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, new.target);
    }
  }
}
