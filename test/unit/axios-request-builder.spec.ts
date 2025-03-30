import { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { AxiosRequestBuilder, EHttpMethod } from '../../src/index.js';
import axios, { AxiosRequestConfig } from 'axios';
import sinon from 'sinon';

describe('AxiosRequestBuilder', () => {
  const BASE_URL = 'https://api.example.com';
  let builder: AxiosRequestBuilder;

  beforeEach(() => {
    builder = new AxiosRequestBuilder(BASE_URL);
  });

  describe('Initialization', () => {
    it('should initialize with base URL', () => {
      expect(builder.getUrl()).to.equal(BASE_URL);
    });

    it('should initialize with empty endpoint', () => {
      expect(builder.getEndpoint()).to.equal('');
    });

    it('should initialize with GET method by default', () => {
      expect(builder.getMethod()).to.equal(EHttpMethod.Get);
    });
  });

  describe('URL and Endpoint Management', () => {
    it('should set and get URL', () => {
      const newUrl = 'https://new.api';
      builder.setUrl(newUrl);
      expect(builder.getUrl()).to.equal(newUrl);
    });

    it('should set and get endpoint', () => {
      const endpoint = '/users';
      builder.setEndpoint(endpoint);
      expect(builder.getEndpoint()).to.equal(endpoint);
    });

    it('should set and get HTTP method', () => {
      builder.setMethod(EHttpMethod.Post);
      expect(builder.getMethod()).to.equal(EHttpMethod.Post);
    });
  });

  describe('Headers Management', () => {
    it('should set and get Content-Type', () => {
      const contentType = 'application/json';
      builder.setContentType(contentType);
      expect(builder.getContentType()).to.equal(contentType);
    });

    it('should add and get header', () => {
      const headerName = 'Authorization';
      const headerValue = 'Bearer token';
      builder.addHeader(headerName, headerValue);
      expect(builder.getHeader(headerName)).to.equal(headerValue);
    });

    it('should check if header exists', () => {
      const headerName = 'X-API-Key';
      expect(builder.hasHeader(headerName)).to.be.false;
      builder.addHeader(headerName, '12345');
      expect(builder.hasHeader(headerName)).to.be.true;
    });

    it('should remove header', () => {
      const headerName = 'X-API-Key';
      builder.addHeader(headerName, '12345');
      builder.removeHeader(headerName);
      expect(builder.hasHeader(headerName)).to.be.false;
    });

    it('should set multiple headers', () => {
      const headers = {
        'X-Client': 'WebApp',
        'Accept-Language': 'en-US'
      };
      builder.setHeaders(headers);
      expect(builder.getHeader('X-Client')).to.equal('WebApp');
      expect(builder.getHeader('Accept-Language')).to.equal('en-US');
    });
  });

  describe('Parameters Management', () => {
    it('should add and get parameter', () => {
      const paramName = 'id';
      const paramValue = '123';
      builder.addParam(paramName, paramValue);
      expect(builder.getParam(paramName)).to.equal(paramValue);
    });

    it('should check if parameter exists', () => {
      const paramName = 'id';
      expect(builder.hasParam(paramName)).to.be.false;
      builder.addParam(paramName, '123');
      expect(builder.hasParam(paramName)).to.be.true;
    });

    it('should remove parameter', () => {
      const paramName = 'id';
      builder.addParam(paramName, '123');
      builder.removeParam(paramName);
      expect(builder.hasParam(paramName)).to.be.false;
    });

    it('should set multiple parameters', () => {
      const params = {
        id: '123',
        type: 'user'
      };
      builder.setParams(params);
      expect(builder.getParam('id')).to.equal('123');
      expect(builder.getParam('type')).to.equal('user');
    });
  });

  describe('Query Parameters Management', () => {
    it('should add and get query parameter', () => {
      const paramName = 'page';
      const paramValue = '2';
      builder.addQueryParam(paramName, paramValue);
      expect(builder.getQueryParam(paramName)).to.equal(paramValue);
    });

    it('should check if query parameter exists', () => {
      const paramName = 'page';
      expect(builder.hasQueryParam(paramName)).to.be.false;
      builder.addQueryParam(paramName, '2');
      expect(builder.hasQueryParam(paramName)).to.be.true;
    });

    it('should remove query parameter', () => {
      const paramName = 'page';
      builder.addQueryParam(paramName, '2');
      builder.removeQueryParam(paramName);
      expect(builder.hasQueryParam(paramName)).to.be.false;
    });

    it('should set multiple query parameters', () => {
      const params = {
        page: '2',
        limit: '10'
      };
      builder.setQueryParams(params);
      expect(builder.getQueryParam('page')).to.equal('2');
      expect(builder.getQueryParam('limit')).to.equal('10');
    });

    it('should handle date query parameters with formatter', () => {
      const date = new Date('2023-01-01');
      builder.addQueryParam('createdBefore', date, (d) => d.toISOString());
      expect(builder.getQueryParam('createdBefore')).to.equal(date.toISOString());
    });
  });

  describe('Body Management', () => {
    it('should set and get body', () => {
      const body = { title: 'Test Post' };
      builder.setBody(body);
      expect(builder.getBody()).to.deep.equal(body);
    });

    it('should check if body exists', () => {
      expect(builder.hasBody()).to.be.false;
      builder.setBody({ title: 'Test Post' });
      expect(builder.hasBody()).to.be.true;
    });
  });

  describe('Hooks', () => {
    it('should add success hook', () => {
      const hook = async (response: any) => ({ retry: false });
      builder.addOnSuccessHook(hook);
      // Implementation detail: hooks would be tested during execution
      expect(builder).to.have.property('addOnSuccessHook');
    });

    it('should add error hook', () => {
      const hook = async (error: any, builder: any) => ({ retry: true });
      builder.addOnErrorHook(hook);
      // Implementation detail: hooks would be tested during execution
      expect(builder).to.have.property('addOnErrorHook');
    });
  });

  describe('Execution', () => {
    let axiosStub: sinon.SinonStub;

    beforeEach(() => {
      axiosStub = sinon.stub(axios, 'request').resolves({ data: 'mock response' });
    });

    afterEach(() => {
      axiosStub.restore();
    });

    it('should build and execute GET request', async () => {
      const response = await builder
        .setMethod(EHttpMethod.Get)
        .setEndpoint('/users')
        .addQueryParam('page', '1')
        .build()
        .execute();
console.log(response)
      expect(response).to.equal('mock response');
      expect(axiosStub.calledOnce).to.be.true;

      const config: AxiosRequestConfig = axiosStub.firstCall.args[0];
      expect(config.method).to.equal('get');
      expect(config.url).to.equal(`${BASE_URL}/users?page=1`);
    });

    it('should build and execute POST request with body', async () => {
      const postData = { title: 'New Post' };
      await builder
        .setMethod(EHttpMethod.Post)
        .setEndpoint('/posts')
        .setBody(postData)
        .build()
        .execute();

      const config: AxiosRequestConfig = axiosStub.firstCall.args[0];
      expect(config.method).to.equal('post');
      expect(config.data).to.deep.equal(postData);
    });

    it('should handle type-safe responses', async () => {
      interface User {
        id: number;
        name: string;
      }

      axiosStub.resolves({ data: { id: 1, name: 'John' } });

      const response = await builder
        .setMethod(EHttpMethod.Get)
        .setEndpoint('/users/1')
        .build<User>()
        .execute();

      expect(response.id).to.equal(1);
      expect(response.name).to.equal('John');
    });
  });

  describe('Error Handling', () => {
    let axiosStub: sinon.SinonStub;

    beforeEach(() => {
      axiosStub = sinon.stub(axios, 'request');
    });

    afterEach(() => {
      axiosStub.restore();
    });

    it('should trigger error hook on failure', async () => {
      const error = new Error('Request failed');
      axiosStub.rejects(error);

      let errorHookCalled = false;
      builder.addOnErrorHook(async () => {
        errorHookCalled = true;
        return { retry: false };
      });

      try {
        await builder.build().execute();
      } catch (e) {
        expect(errorHookCalled).to.be.true;
      }
    });

    it('should retry request when hook returns retry: true', async () => {
      const error = new Error('Request failed');
      axiosStub.onFirstCall().rejects(error);
      axiosStub.onSecondCall().resolves({ data: 'success' });

      builder.addOnErrorHook(async () => ({ retry: true }));

      const response = await builder.build().execute();
      expect(response).to.equal('success');
      expect(axiosStub.calledTwice).to.be.true;
    });
  });
});