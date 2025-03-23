import { IExecutable } from "./interfaces";
import { axios, BaseRequestBuilder } from "./lib";
import { isNil, isNilOrEmpty, mapToObject } from "./utils";

const PARAM_PREFIX = ":";

export class AxiosRequestBuilder extends BaseRequestBuilder {
  constructor(url?: string) {
    super(url);
  }

  public build<TRes = any>(): IExecutable<TRes> {
    let url = this.url;
    if (!isNilOrEmpty(this.endpoint)) {
      url += this.endpoint;
    }
    for (const [key, value] of this.params) {
      url = url.replace(PARAM_PREFIX + key, value);
    }
    const headers = mapToObject(this.headers);
    const queryParams = mapToObject(this.query);
    const instance = axios.create();
    const execute = async (): Promise<TRes> => {
      let data = null;
      let retry = false;
      try {
        const response = await instance.request({
          url,
          method: this.method.toString(),
          headers: headers,
          params: queryParams,
          data: this.body ?? undefined,
        });

        for (const fn of this.successHooks) {
          const sRes = await fn(response, this);
          if (!isNil(sRes)) {
            retry = retry || !!sRes.retry;
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

  private async buildAndExecWithoutRetry<TRes = any>(): Promise<TRes> {
    let url = this.url;
    if (!isNilOrEmpty(this.endpoint)) {
      url += this.endpoint;
    }
    for (const [key, value] of this.params) {
      url = url.replace(PARAM_PREFIX + key, value);
    }
    const instance = axios.create();
    let data = null;
    try {
      const response = await instance.request({
        url,
        method: this.method.toString(),
        headers: mapToObject(this.headers),
        params: mapToObject(this.query),
        data: this.body,
      });
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

}
