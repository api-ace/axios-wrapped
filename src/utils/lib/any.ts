import { isEmpty, isNil, isObjectLike, isString } from "./utility";

export const isNilOrEmpty = (value: any): boolean =>
    isNil(value) || ((isObjectLike(value) || isString(value)) && isEmpty(value));
