import { PARAM_PREFIX } from './constants';
import { IExecutable } from './interfaces';
import { axios, AxiosInstance, AxiosResponse, BaseRequestBuilder } from './lib';
import { isNil, isNilOrEmpty, mapToObject } from './utils';

export class Request extends BaseRequestBuilder {
  private instance: AxiosInstance;

  constructor(url?: string, instance?: AxiosInstance) {
    super(url);
    this.init(instance);
  }

  public build<TRes = unknown>(): IExecutable<TRes> {
    const execute = async (): Promise<TRes> => {
      let data = null;
      let retry = false;
      try {
        const response = await this.createRequestObject();

        for (const fn of this.successHooks) {
          const sRes = await fn(response, this);
          if (!isNil(sRes)) {
            retry = retry || !!sRes?.retry;
          }
        }
        data = response.data;
      } catch (ex) {
        for (const fn of this.errorHooks) {
          const eRes = await fn(ex, this, true);
          if (!isNil(eRes)) {
            retry = retry || !!eRes.retry;
          }
        }
      }
      if (retry) {
        data = await this.buildAndExecWithoutRetry<TRes>();
      }
      return data as TRes;
    };
    return { execute };
  }

  private async buildAndExecWithoutRetry<TRes = unknown>(): Promise<TRes> {
    let url = this.url;
    if (!isNilOrEmpty(this.endpoint)) {
      url += this.endpoint;
    }
    for (const [key, value] of this.params) {
      url = url.replace(PARAM_PREFIX + key, value);
    }

    let data = null;
    try {
      const response = await this.createRequestObject();

      for (const fn of this.successHooks) {
        await fn(response, this);
      }
      data = response.data;
    } catch (ex) {
      for (const fn of this.errorHooks) {
        await fn(ex, this, false);
      }
    }
    return data as TRes;
  }

  public getInstance(): AxiosInstance {
    return this.instance;
  }

  private init(instance?: AxiosInstance): void {
    this.instance = instance ?? axios.create();
  }

  private buildUrl = (): string => {
    let url = this.url;
    if (!isNilOrEmpty(this.endpoint)) {
      url += this.endpoint;
    }
    for (const [key, value] of this.params) {
      url = url.replace(PARAM_PREFIX + key, value);
    }
    return url;
  };

  private readonly buildHeaders = (): Record<string, string> => mapToObject(this.headers);

  private readonly buildQueryParams = (): Record<string, string | string[]> =>
    mapToObject(this.query);

  private readonly createRequestObject = (): Promise<AxiosResponse> => {
    return this.instance.request({
      url: this.buildUrl(),
      method: this.method.toString(),
      headers: this.buildHeaders(),
      params: this.buildQueryParams(),
      data: this.body ?? undefined,
    });
  };
}
