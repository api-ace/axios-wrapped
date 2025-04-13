import { PARAM_PREFIX } from './constants';
import { IExecutable } from './interfaces';
import { axios, AxiosError, AxiosInstance, AxiosResponse, BaseRequestBuilder } from './lib';
import { resolveAllStrict } from './tools';
import { isNil, isNilOrEmpty, map, mapToObject } from './utils';

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

        if (await this.callSuccessHooks(response)) {
          return await this.buildAndExecWithoutRetry<TRes>();
          }
        }
        data = response.data;
      } catch (ex) {
        if (await this.callErrorHooks(ex, true)) {
          return await this.buildAndExecWithoutRetry<TRes>();
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

      await this.callSuccessHooks(response);
      data = response.data;
    } catch (ex) {
      await this.callErrorHooks(ex, false);
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

  /**
   * @returns A Promise boolean or rejects with an Error
   */
  private readonly callSuccessHooks = async (response: AxiosResponse): Promise<boolean> => {
    const sRes = await resolveAllStrict(map(this.successHooks, (fn) => fn(response, this)));

    return sRes.some((res) => !isNil(res) && !!res.retry);
  };

  /**
   * @returns A Promise boolean or rejects with an Error
   */
  private readonly callErrorHooks = async (
    error: AxiosError,
    shouldRetry: boolean,
  ): Promise<boolean> => {
    const eRes = await resolveAllStrict(map(this.errorHooks, (fn) => fn(error, this, shouldRetry)));

    return eRes.some((res) => !isNil(res) && res.retry);
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
