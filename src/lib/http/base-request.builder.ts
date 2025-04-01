import { CONTENT_TYPE, EMPTY_STR } from "../../constants";
import { EHttpMethod } from "../../enums";
import { TypeMismatchException } from "../../exceptions";
import { IExecutable, IHookResult, IKeyValue, IRequestBuilder } from "../../interfaces";
import { filter, first, isArray, isEmpty, isNil, isNilOrEmpty, isObject, map } from "../../utils";
import { AxiosError, AxiosInstance } from "../axios";


export abstract class BaseRequestBuilder implements IRequestBuilder {
  protected url: string;
  protected endpoint: string;
  protected method: EHttpMethod;
  protected headers: Map<string, string>;
  protected params: Map<string, string>;
  protected query: Map<string, string | string[]>;
  protected body: any;
  protected successHooks: Array<(response: any, builder: IRequestBuilder) => Promise<IHookResult>>;
  protected errorHooks: Array<(error: any, builder: IRequestBuilder, nextRetry?: boolean) => Promise<IHookResult>>;

  constructor(url?: string) {
    this.initialize();
    this.url = url ?? null;
  }

  public getUrl(): string {
    return this.url;
  }

  public setUrl(url: string): IRequestBuilder {
    this.url = url;
    return this;
  }

  public getEndpoint(): string {
    return this.endpoint;
  }

  public setEndpoint(endpoint: string): IRequestBuilder {
    this.endpoint = endpoint;
    return this;
  }

  public getMethod(): EHttpMethod {
    return this.method;
  }

  public setMethod(method: EHttpMethod): IRequestBuilder {
    this.method = method;
    return this;
  }

  public getContentType(): string {
    return this.headers.get(CONTENT_TYPE) ?? null;
  }

  public setContentType(mimeType: string): IRequestBuilder {
    this.headers.set(CONTENT_TYPE, mimeType);
    return this;
  }

  public getHeader(name: string): string {
    return this.headers.get(name.toLowerCase());
  }

  public hasHeader(name: string): boolean {
    return this.headers.has(name.toLowerCase());
  }

  public addHeader(name: string, value: string | number | boolean): IRequestBuilder;
  public addHeader(name: string, value: Date, formatter?: (date: Date) => string): IRequestBuilder;
  public addHeader(header: IKeyValue): IRequestBuilder;
  public addHeader(name: unknown, value?: unknown, formatter?: (date: Date) => string): IRequestBuilder {
    if (isObject(name)) {
      const { key, value } = name as IKeyValue;
      this.headers.set(key.toLowerCase(), value);
      return this;
    }
    if (typeof name !== "string") {
      throw new TypeMismatchException("'name' should be type of string");
    }
    this.headers.set(name.toLowerCase(), this.normalizeValue(value, formatter) as string);
    return this;
  }

  public removeHeader(name: string): IRequestBuilder;
  public removeHeader(header: IKeyValue): IRequestBuilder;
  public removeHeader(header: unknown): IRequestBuilder {
    if (isObject(header)) {
      this.headers.delete((header as IKeyValue).key.toLowerCase());
    }
    this.headers.delete((header as string).toLowerCase());
    return this;
  }

  public setHeaders(headers: IKeyValue[]): IRequestBuilder;
  public setHeaders(headers: Map<string, string>): IRequestBuilder;
  public setHeaders(headers: Record<string, string>): IRequestBuilder;
  public setHeaders(headers: unknown): IRequestBuilder {
    if (isArray(headers)) {
      for (const { key, value } of headers as IKeyValue[]) {
        this.headers.set(key.toLowerCase(), value.toString());
      }
      return this;
    }
    if (headers instanceof Map) {
      for (const [key, value] of headers) {
        this.headers.set(key.toLowerCase(), value.toString());
      }
      return this;
    }
    if (isObject(headers)) {
      for (const key in headers as Record<string, string>) {
        const value = headers[key];
        this.headers.set(key.toLowerCase(), value.toString());
      }
      return this;
    }
    throw new TypeMismatchException("'headers' should be Array of key-value pairs, Map, object as dictionary");
  }

  public getParam(name: string): string {
    return this.params.get(name);
  }

  public hasParam(name: string): boolean {
    return this.params.has(name);
  }

  // really ? do devs actually need it ???
  public addParam(name: string, value: string | number | boolean): IRequestBuilder;
  public addParam(name: string, date: Date, formatter?: (date: Date) => string): IRequestBuilder;
  public addParam(param: IKeyValue): IRequestBuilder;
  public addParam(name: unknown, value?: unknown, formatter?: (date: Date) => string): IRequestBuilder {
    if (isObject(name)) {
      const { key, value } = name as IKeyValue;
      this.params.set(key, value);
      return this;
    }
    if (typeof name !== "string") {
      throw new TypeMismatchException("'name' should be type of string");
    }
    this.params.set(name, this.normalizeValue(value, formatter) as string);
    return this;
  }

  public removeParam(name: string): IRequestBuilder;
  public removeParam(param: IKeyValue): IRequestBuilder;
  public removeParam(param: unknown): IRequestBuilder {
    if (isObject(param)) {
      this.params.delete((param as IKeyValue).key);
    }
    this.params.delete(param as string);
    return this;
  }

  public setParams(params: IKeyValue[]): IRequestBuilder;
  public setParams(params: Map<string, string>): IRequestBuilder;
  public setParams(params: Record<string, string>): IRequestBuilder;
  public setParams(params: unknown): IRequestBuilder {
    if (isArray(params)) {
      for (const { key, value } of params as IKeyValue[]) {
        this.params.set(key, value.toString());
      }
      return this;
    }
    if (params instanceof Map) {
      for (const [key, value] of params) {
        this.params.set(key, value.toString());
      }
      return this;
    }
    if (isObject(params)) {
      for (const key in params as Record<string, string>) {
        const value = params[key];
        this.params.set(key, value.toString());
      }
      return this;
    }
    throw new TypeMismatchException("'params' should be Array of key-value pairs, Map, object as dictionary");
  }

  public getQueryParam(name: string): string | string[] {
    return this.query.get(name);
  }

  public hasQueryParam(name: string): boolean {
    return !isNilOrEmpty(this.query.get(name));
  }

  public addQueryParam(name: string, value: string | number | boolean | string[] | number[] | boolean[]): IRequestBuilder;
  public addQueryParam(name: string, value: Date | Date[], formatter?: (date: Date) => string): IRequestBuilder;
  public addQueryParam(qp: IKeyValue<string, string | string[]>);
  public addQueryParam(name: unknown, value?: unknown, formatter?: (date: Date) => string): IRequestBuilder {
    if (isObject(name) && !isArray(name)) {
      const { key, value } = name as IKeyValue;
      const record = this.query.get(key);
      this.query.set(key, this.updatedValue(record, value));
      return this;
    }
    if (typeof name !== "string") {
      throw new TypeMismatchException("'name' should be type of string");
    }

    const record = this.query.get(name);
    this.query.set(name, this.updatedValue(record, value, formatter));
    return this;
  }

  public removeQueryParam(name: string): IRequestBuilder;
  public removeQueryParam(qp: IKeyValue<string, string | string[]>): IRequestBuilder;
  public removeQueryParam(name: unknown): IRequestBuilder {
    if (isObject(name)) {
      this.query.delete((name as IKeyValue).key);
    }
    this.query.delete(name as string);
    return this;
  }

  public setQueryParams(params: IKeyValue<string, string | string[]>[]): IRequestBuilder;
  public setQueryParams(params: Map<string, string | string[]>): IRequestBuilder;
  public setQueryParams(params: Record<string, string | string[]>);
  public setQueryParams(params: unknown): IRequestBuilder {
    if (isArray(params)) {
      for (const { key, value } of params as IKeyValue[]) {
        this.query.set(key, value);
      }
      return this;
    }
    if (params instanceof Map) {
      for (const [key, value] of params) {
        this.query.set(key, value);
      }
      return this;
    }
    if (isObject(params)) {
      for (const key in params as Record<string, string>) {
        const value = params[key];
        this.query.set(key, value);
      }
      return this;
    }
    throw new TypeMismatchException("'params' should be Array of key-value pairs, Map, object as dictionary");
  }

  public getBody<TBody>(): TBody {
    return this.body as TBody;
  }

  public hasBody(): boolean {
    return !isNilOrEmpty(this.body);
  }

  public setBody<TBody>(body: TBody): IRequestBuilder {
    this.body = body;
    return this;
  }

  public addOnSuccessHook(fn: (response: any, builder?: IRequestBuilder) => Promise<IHookResult>): IRequestBuilder {
    this.successHooks.push(fn);
    return this;
  }

  // TODO: use better approach for retry logic :3 
  public addOnErrorHook(fn: (error: AxiosError, builder: IRequestBuilder, nextRetry?: boolean) => Promise<IHookResult>): IRequestBuilder {
    this.errorHooks.push(fn);
    return this;
  }

  public abstract build<TRes = any>(): IExecutable<TRes>;
  public abstract getInstance(): AxiosInstance;

  protected initialize(): void {
    this.url = null;
    this.endpoint = EMPTY_STR;
    this.headers = new Map<string, string>();
    this.method = EHttpMethod.Get;
    this.params = new Map<string, string>();
    this.query = new Map<string, string[]>();
    this.body = null;
    this.successHooks = [];
    this.errorHooks = [];
  }

  private normalizeValue(value: unknown, formatter?: (date: Date) => string): string | string[] {
    if (value instanceof Date || (isArray(value) && first(value) instanceof Date)) {
      formatter = formatter ?? ((date: Date): string => date.toISOString());
      return isArray(value) ? map(value as Date[], formatter) : formatter(value);
    }
    if (isArray(value)) {
      const arr = filter(
        map(value, (v) => (!isNil(v) ? v.toString() : v)),
        (v) => !isNil(v),
      );
      return isEmpty(arr) ? null : arr;
    }
    if (!isNilOrEmpty(value)) {
      return value.toString();
    }
    return null;
  }

  private updatedValue(oldValue: string | string[], newValue: unknown, formatter?: (date: Date) => string): string | string[] {
    const value: string | string[] = this.normalizeValue(newValue, formatter);
    if (isArray(oldValue)) {
      return isArray(value) ? [...oldValue, ...value] : [...oldValue, value];
    } else if (!isNil(oldValue)) {
      return isArray(value) ? [oldValue, ...value] : [oldValue, value];
    }
    return value;
  }
}
