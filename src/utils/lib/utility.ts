/**
 * Custom implementation of commonly used Lodash functions with TypeScript support
 */

/**
 * Filters elements of array that the predicate returns truthy for
 */
export function filter<T>(collection: Array<T> | Record<string, T> | null | undefined, predicate: (value: T, index: number | string, collection: Array<T> | Record<string, T>) => boolean): T[] {
    if (isNil(collection)) return [];
    
    if (isArray(collection)) {
      return collection.filter((value, index) => predicate(value, index, collection));
    }
    
    if (isObject(collection)) {
      const result: T[] = [];
      const keys = Object.keys(collection);
      
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = collection[key];
        if (predicate(value, key, collection)) {
          result.push(value);
        }
      }
      
      return result;
    }
    
    return [];
  }
  
  /**
   * Gets the first element of array
   */
  export function first<T>(array: Array<T> | null | undefined): T | undefined {
    if (isNil(array) || array.length === 0) return undefined;
    return array[0];
  }
  
  /**
   * Checks if value is an array
   */
  export function isArray(value: any): value is any[] {
    return Array.isArray(value);
  }
  
  /**
   * Checks if value is empty
   */
  export function isEmpty(value: any): boolean {
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
  export function isNil(value: any): value is null | undefined {
    return value === null || value === undefined;
  }
  
  /**
   * Checks if value is an object
   */
  export function isObject(value: any): value is Record<string, any> {
    const type = typeof value;
    return value !== null && (type === 'object' || type === 'function');
  }
  
  /**
   * Creates an array of values by running each element through iteratee
   */
  export function map<T, R>(collection: Array<T> | Record<string, T> | null | undefined, iteratee: (value: T, index: number | string, collection: Array<T> | Record<string, T>) => R): R[] {
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
  export function isObjectLike(value: any): value is object {
    return typeof value === 'object' && value !== null;
  }
  
  /**
   * Checks if value is a string
   */
  export function isString(value: any): value is string {
    return typeof value === 'string';
  }