import { EHttpMethod } from "../enums";
import { AxiosError } from "../lib";
import { IExecutable } from "./i-executable";
import { IHookResult } from "./i-hook-result";
import { IKeyValue } from "./i-key-value";

export interface IRequestBuilder {
  getUrl(): string;
  setUrl(url: string): IRequestBuilder;

  getEndpoint(): string;
  setEndpoint(endpoint: string): IRequestBuilder;

  getMethod(): EHttpMethod;
  setMethod(method: EHttpMethod): IRequestBuilder;

  getContentType(): string;
  setContentType(mimeType: string): IRequestBuilder;

  getHeader(name: string): string;
  hasHeader(name: string): boolean;
  addHeader(name: string, value: string | number | boolean): IRequestBuilder;
  addHeader(name: string, value: Date, formater?: (date: Date) => string): IRequestBuilder;
  addHeader(header: IKeyValue): IRequestBuilder;
  removeHeader(name: string): IRequestBuilder;
  removeHeader(header: IKeyValue): IRequestBuilder;
  setHeaders(headers: IKeyValue[]): IRequestBuilder;
  setHeaders(headers: Map<string, string>): IRequestBuilder;
  setHeaders(headers: Record<string, string>): IRequestBuilder;

  getParam(name: string): string;
  hasParam(name: string): boolean;
  addParam(name: string, value: string | number | boolean): IRequestBuilder;
  addParam(name: string, date: Date, formater?: (date: Date) => string): IRequestBuilder;
  addParam(param: IKeyValue): IRequestBuilder;
  removeParam(name: string): IRequestBuilder;
  removeParam(param: IKeyValue): IRequestBuilder;
  setParams(params: IKeyValue[]): IRequestBuilder;
  setParams(params: Map<string, string>): IRequestBuilder;
  setParams(params: Record<string, string>): IRequestBuilder;

  getQueryParam(name: string): string | string[];
  hasQueryParam(name: string): boolean;
  addQueryParam(name: string, value: string | number | boolean | string[] | number[] | boolean[]): IRequestBuilder;
  addQueryParam(name: string, value: Date | Date[], formater?: (date: Date) => string): IRequestBuilder;
  addQueryParam(qp: IKeyValue<string, string | string[]>);
  removeQueryParam(name: string): IRequestBuilder;
  removeQueryParam(qp: IKeyValue<string, string | string[]>): IRequestBuilder;
  setQueryParams(params: IKeyValue<string, string | string[]>[]): IRequestBuilder;
  setQueryParams(params: Map<string, string | string[]>): IRequestBuilder;
  setQueryParams(params: Record<string, string | string[]>);

  getBody<TBody>(): TBody;
  hasBody(): boolean;
  setBody<TBody>(body: TBody): IRequestBuilder;

  addOnSuccessHook<TRes>(fn: (response: TRes, builder: IRequestBuilder) => Promise<IHookResult>): IRequestBuilder;
  addOnSuccessHook(fn: (response: any, builder: IRequestBuilder) => Promise<IHookResult>): IRequestBuilder;

  addOnErrorHook<TRes>(fn: (error: AxiosError<TRes> | Error, builder: IRequestBuilder, nextRetry?: boolean) => Promise<IHookResult>): IRequestBuilder;
  addOnErrorHook(fn: (error: any, builder: IRequestBuilder, nextRetry?: boolean) => Promise<IHookResult>): IRequestBuilder;

  build<TRes = any>(): IExecutable<TRes>;
}
