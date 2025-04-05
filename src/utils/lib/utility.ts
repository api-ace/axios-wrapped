/**
 * Gets the first element of array
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function first<T>(array: Array<T> | null | undefined): T | undefined {
  if (isNil(array) || array.length === 0) return undefined;
  return array[0];
}

/**
 * Checks if value is an array
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

/**
 * Checks if value is empty
 */
export function isEmpty(value: unknown): boolean {
  if (isNil(value)) return true;

  if (isArray(value) || isString(value)) {
    return value.length === 0;
  }

  if (isObject(value)) {
    return Object.keys(value).length === 0;
  }

  return false;
}

/**
 * Checks if value is null or undefined
 */
export function isNil(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * Checks if value is an object
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  const type = typeof value;
  return value !== null && (type === 'object' || type === 'function');
}

/**
 * Creates an array of values by running each element through iteratee
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function map<T, R>(
  collection: Array<T> | Record<string, T> | null | undefined,
  iteratee: (value: T, index: number | string, collection: Array<T> | Record<string, T>) => R,
): R[] {
  if (isNil(collection)) return [];

  if (isArray(collection)) {
    return collection.map((value, index) => iteratee(value, index, collection));
  }

  if (isObject(collection)) {
    const result: R[] = [];
    const keys = Object.keys(collection);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      result.push(iteratee(collection[key], key, collection));
    }

    return result;
  }

  return [];
}

/**
 * Checks if value is object-like
 */
export function isObjectLike(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
}

/**
 * Checks if value is a string
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Checks if value is a number
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

/**
 * Checks if value is a boolean
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/**
 * Checks if value is Primitive
 */
export function isPrimitive(value: unknown): value is string | number | boolean {
  return isString(value) || isNumber(value) || isBoolean(value);
}

/**
 * Filters elements of array that the predicate returns truthy for
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function filter<T>(
  collection: Array<T> | Record<string, T> | null | undefined,
  predicate: (
    value: T,
    index: number | string,
    collection: Array<T> | Record<string, T>,
  ) => boolean,
): T[] {
  if (isNil(collection)) return [];

  if (isArray(collection)) {
    return processFilterArray(collection, predicate);
  }

  if (isObject(collection)) {
    return processFilterObject(collection, predicate);
  }

  return [];
}

function processFilterArray<T>(
  array: T[],
  predicate: (value: T, index: number, collection: T[]) => boolean,
): T[] {
  return array.filter((value, index) => predicate(value, index, array));
}

function processFilterObject<T>(
  object: Record<string, T>,
  predicate: (value: T, key: string, collection: Record<string, T>) => boolean,
): T[] {
  const result: T[] = [];

  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      const value = object[key];
      if (predicate(value, key, object)) {
        result.push(value);
      }
    }
  }

  return result;
}
