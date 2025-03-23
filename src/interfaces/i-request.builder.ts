import { EHttpMethod } from "../enums";
import { AxiosError, AxiosInstance } from "../lib";
import { IExecutable } from "./i-executable";
import { IHookResult } from "./i-hook-result";
import { IKeyValue } from "./i-key-value";

export interface IRequestBuilder {


  /**
   * Gets the current base URL of the request.
   * 
   * @returns {string} The base URL of the request.
   */
  getUrl(): string;

  /**
   * Sets the base URL for the request.
   * 
   * @param {string} url - The base URL to set.
   * @returns {IRequestBuilder} The current instance of the request builder for chaining.
  */
  setUrl(url: string): IRequestBuilder;

  /**
 * Gets the current endpoint appended to the base URL.
 * 
 * @returns {string} The endpoint of the request.
*/
  getEndpoint(): string;

  /**
  * Sets the endpoint to be appended to the base URL.
  * 
  * @param {string} endpoint - The endpoint to set.
  * @returns {IRequestBuilder} The current instance of the request builder for chaining.
 */
  setEndpoint(endpoint: string): IRequestBuilder;

  /**
  * Gets the HTTP method (e.g., GET, POST) of the request.
  * 
  * @returns {EHttpMethod} The HTTP method of the request.
  */
  getMethod(): EHttpMethod;

  /**
  * Sets the HTTP method (e.g., GET, POST) for the request.
  * 
  * @param {EHttpMethod} method - The HTTP method to set.
  * @returns {IRequestBuilder} The current instance of the request builder for chaining.
  */
  setMethod(method: EHttpMethod): IRequestBuilder;

  /**
   * Gets the Content-Type header value of the request.
   * 
   * @returns {string} The Content-Type header value, or null if not set.
  */
  getContentType(): string;

  /**
   * Sets the Content-Type header for the request.
   * 
   * @param {string} mimeType - The MIME type to set as Content-Type header value.
   * @returns {IRequestBuilder} The current instance of the request builder for chaining.
  */
  setContentType(mimeType: string): IRequestBuilder;

  /**
   * Retrieves a specific header by name from the request headers.
   *
   * @param {string} name - The name of the header to retrieve.
   * @returns {string} The value of the specified header.
  */
  getHeader(name: string): string;

  /**
   * Checks if a specific header exists in the request headers.
   *
   * @param {string} name - The name of the header to check for existence.
   * @returns {boolean} True if the header exists, false otherwise.
 */
  hasHeader(name: string): boolean;

  /**
   * Adds a new header or updates an existing one in the request headers.
   *
   * @param {string} name - Header key.
   * @param {string | number | boolean } value - Header value.
   * @returns {IRequestBuilder} The current instance of the builder for chaining.
  */
  addHeader(name: string, value: string | number | boolean): IRequestBuilder;

  /**
   * Adds a new header or updates an existing one in the request headers.
   *
   * @param {string} name - Header key.
   * @param {Date} value - Header value (Date).
   * @param {(date: Date) => string} [formater] - Formatter function for date values. Optional if not a date value.
   * @returns {IRequestBuilder} The current instance of the builder for chaining.
 */
  addHeader(name: string, value: Date, formater?: (date: Date) => string): IRequestBuilder;

  /**
   * Adds a new header or updates an existing one in the request headers.
   *
   * @param {IKeyValue} header - Header key-value pair object.
   * @returns {IRequestBuilder} The current instance of the builder for chaining.
 */
  addHeader(header: IKeyValue): IRequestBuilder;

  /**
   * Removes a specific header from the request headers.
   * @param {string} name - Header key
   * @returns {IRequestBuilder}
  */
  removeHeader(name: string): IRequestBuilder;

  /**
   * Removes a specific header from the request headers.
   * @param {IKeyValue} header - Header object
   * @returns {IRequestBuilder}
  */
  removeHeader(header: IKeyValue): IRequestBuilder;

  /**
   * Sets multiple headers at once using an array.
   * @param {IKeyValue[]} headers - An array of key-value pairs.
   * @returns {IRequestBuilder}
  */
  setHeaders(headers: IKeyValue[]): IRequestBuilder;

  /**
   * Sets multiple headers at once using a Map.
   * @param {Map<string, string>} headers - A Map of headers.
   * @returns {IRequestBuilder}
  */
  setHeaders(headers: Map<string, string>): IRequestBuilder;
  setHeaders(headers: Record<string, string>): IRequestBuilder;

  /**
   * Gets a parameter value by name.
   * @param {string} name - Parameter name.
   * @returns {string}
   */
  getParam(name: string): string;

  /**
   * Checks if the param exists
   * @param {string} name - param name
   * @returns {boolean}
  */
  hasParam(name: string): boolean;


  /**
   * Adds a param to the params map.
   * @param {string} name - The name of the param
   * @param {string | number | boolean} value - The value of the param
   * @returns {IRequestBuilder}
   */
  addParam(name: string, value: string | number | boolean): IRequestBuilder;

  /**
  * Adds a date param to the params map.
  * @param {string} name - The name of the param
  * @param {Date} value - The value of the param
  * @param {(date: Date) => string} [formater] - Formatter function for date values. Optional if not a date value.
  * @returns {IRequestBuilder}
  */
  addParam(name: string, date: Date, formater?: (date: Date) => string): IRequestBuilder;

  /**
   * Adds a param to the params map.
   * @param {IKeyValue} param - Object that contains key value for the param
   * @returns {IRequestBuilder}
  */
  addParam(param: IKeyValue): IRequestBuilder;

  /**
  * Removes a param from the params map.
  * @param {string} name - The name of the param to be removed
  * @returns {IRequestBuilder}
 */
  removeParam(name: string): IRequestBuilder;

  /**
  * Removes a param from the params map.
  * @param {IKeyValue} param - Object that contains key value for the param
  * @returns {IRequestBuilder}
  */
  removeParam(param: IKeyValue): IRequestBuilder;


  /**
   * Sets params to the params map.
   * @param {IKeyValue[]} params - Array of key value pairs for the params
   * @returns {IRequestBuilder}
  */
  setParams(params: IKeyValue[]): IRequestBuilder;


  /**
   * Sets params to the params map.
   * @param {Map<string, string>} params - Map of key value pairs for the params
   * @returns {IRequestBuilder}
  */
  setParams(params: Map<string, string>): IRequestBuilder;

  /**
   * Sets params to the params map.
   * @param {Record<string, string>} params - Record of key value pairs for the params
   * @returns {IRequestBuilder}
  */
  setParams(params: Record<string, string>): IRequestBuilder;

  /**
   * Get query param
   * @param {string} name - query param name
   * @returns {string | string[]}
  */
  getQueryParam(name: string): string | string[];

  /**
   * Checks if the query param exists
   * @param {string} name - query param name
   * @returns {boolean}
  */
  hasQueryParam(name: string): boolean;

  /**
   * Adds query param
   * @param {string} name - the name of the query param
   * @param {string | number | boolean | string[] | number[] | boolean[]} value - the value of the query param
   * @returns {IRequestBuilder}
   */
  addQueryParam(name: string, value: string | number | boolean | string[] | number[] | boolean[]): IRequestBuilder;

  /**
   * Adds query param
   * @param {string} name - the name of the query param
   * @param {Date | Date[]} value - the value of the query param
   * @param {(date: Date) => string} [formater] - Formatter function for date values. Optional if not a date value.
   * @returns {IRequestBuilder}
   */
  addQueryParam(name: string, value: Date | Date[], formater?: (date: Date) => string): IRequestBuilder;

  /**
   * Adds query param
   * @param {IKeyValue} qp - Object that contains key value for the query param
   * @returns {IRequestBuilder}
   */
  addQueryParam(qp: IKeyValue<string, string | string[]>);

  /**
   * Removes query param
   * @param {string} name - the name of the query param
   * @returns {IRequestBuilder}
   */
  removeQueryParam(name: string): IRequestBuilder;

  /**
   * Removes query param
   * @param {IKeyValue} qp - Object that contains key value for the query param
   * @returns {IRequestBuilder}
   */
  removeQueryParam(qp: IKeyValue<string, string | string[]>): IRequestBuilder;

  /**
   * Sets query params
   * @param {IKeyValue[]} params - Array of key value pairs for the query params
   * @returns {IRequestBuilder}
   */
  setQueryParams(params: IKeyValue<string, string | string[]>[]): IRequestBuilder;

  /**
  * Sets query params
  * @param {Map<string, string>} params - Map of key value pairs for the query params
  * @returns {IRequestBuilder}
  */
  setQueryParams(params: Map<string, string | string[]>): IRequestBuilder;

  /**
   * Sets query params
   * @param {Record<string, string>} params - Record of key value pairs for the query params
   * @returns {IRequestBuilder}
   */
  setQueryParams(params: Record<string, string | string[]>);

  /**
   * Get the body
   * @returns {TBody}
   */
  getBody<TBody>(): TBody;

  /**
   * Checks if the body exists
   * @returns {boolean}
   */
  hasBody(): boolean;

  /**
   * Sets the body to the request
   * @param {TBody} body - The body
   * @returns {IRequestBuilder}
   */
  setBody<TBody>(body: TBody): IRequestBuilder;

  /**
   * Adds a success hook to be executed after a successful response is received.
   *
   * @param {(response: any, builder: IRequestBuilder) => Promise<any>} fn - A callback function to handle successful responses.
   * @returns {IRequestBuilder} The current instance of the request builder for chaining.
   */
  addOnSuccessHook<TRes>(fn: (response: TRes, builder: IRequestBuilder) => Promise<IHookResult>): IRequestBuilder;
  addOnSuccessHook(fn: (response: any, builder: IRequestBuilder) => Promise<IHookResult>): IRequestBuilder;

  /**
   * Adds an error hook to be executed after an error occurs during a request.
   *
   * @param {(error: any, builder: IRequestBuilder, nextRetry?: boolean) => Promise<any>} fn - A callback function to handle errors during requests.
   * @returns {IRequestBuilder} The current instance of the request builder for chaining.
   */
  addOnErrorHook<TRes>(fn: (error: AxiosError<TRes> | Error, builder: IRequestBuilder, nextRetry?: boolean) => Promise<IHookResult>): IRequestBuilder;
  addOnErrorHook(fn: (error: any, builder: IRequestBuilder, nextRetry?: boolean) => Promise<IHookResult>): IRequestBuilder;

  /**
   * method that builds and returns an executable object for making HTTP requests.
   *
   * @returns {IExecutable} An object with an `execute` method to perform the HTTP request.
  */
  build<TRes = any>(): IExecutable<TRes>;

  /**
   * Abstract method that retrieves an instance of Axios or another HTTP client. Must be implemented by subclasses.
   *
   * @abstract
   * @returns {AxiosInstance} An instance of Axios or another HTTP client library used for making requests.
   */
  getInstance(): AxiosInstance
}
