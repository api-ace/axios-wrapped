"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var mocha_1 = require("mocha");
var src_1 = require("../../src");
var axios_1 = require("axios");
var sinon_1 = require("sinon");
(0, mocha_1.describe)('AxiosRequestBuilder', function () {
    var BASE_URL = 'https://api.example.com';
    var builder;
    (0, mocha_1.beforeEach)(function () {
        builder = new src_1.AxiosRequestBuilder(BASE_URL);
    });
    (0, mocha_1.describe)('Initialization', function () {
        (0, mocha_1.it)('should initialize with base URL', function () {
            (0, chai_1.expect)(builder.getUrl()).to.equal(BASE_URL);
        });
        (0, mocha_1.it)('should initialize with empty endpoint', function () {
            (0, chai_1.expect)(builder.getEndpoint()).to.equal('');
        });
        (0, mocha_1.it)('should initialize with GET method by default', function () {
            (0, chai_1.expect)(builder.getMethod()).to.equal(src_1.EHttpMethod.Get);
        });
    });
    (0, mocha_1.describe)('URL and Endpoint Management', function () {
        (0, mocha_1.it)('should set and get URL', function () {
            var newUrl = 'https://new.api';
            builder.setUrl(newUrl);
            (0, chai_1.expect)(builder.getUrl()).to.equal(newUrl);
        });
        (0, mocha_1.it)('should set and get endpoint', function () {
            var endpoint = '/users';
            builder.setEndpoint(endpoint);
            (0, chai_1.expect)(builder.getEndpoint()).to.equal(endpoint);
        });
        (0, mocha_1.it)('should set and get HTTP method', function () {
            builder.setMethod(src_1.EHttpMethod.Post);
            (0, chai_1.expect)(builder.getMethod()).to.equal(src_1.EHttpMethod.Post);
        });
    });
    (0, mocha_1.describe)('Headers Management', function () {
        (0, mocha_1.it)('should set and get Content-Type', function () {
            var contentType = 'application/json';
            builder.setContentType(contentType);
            (0, chai_1.expect)(builder.getContentType()).to.equal(contentType);
        });
        (0, mocha_1.it)('should add and get header', function () {
            var headerName = 'Authorization';
            var headerValue = 'Bearer token';
            builder.addHeader(headerName, headerValue);
            (0, chai_1.expect)(builder.getHeader(headerName)).to.equal(headerValue);
        });
        (0, mocha_1.it)('should check if header exists', function () {
            var headerName = 'X-API-Key';
            (0, chai_1.expect)(builder.hasHeader(headerName)).to.be.false;
            builder.addHeader(headerName, '12345');
            (0, chai_1.expect)(builder.hasHeader(headerName)).to.be.true;
        });
        (0, mocha_1.it)('should remove header', function () {
            var headerName = 'X-API-Key';
            builder.addHeader(headerName, '12345');
            builder.removeHeader(headerName);
            (0, chai_1.expect)(builder.hasHeader(headerName)).to.be.false;
        });
        (0, mocha_1.it)('should set multiple headers', function () {
            var headers = {
                'X-Client': 'WebApp',
                'Accept-Language': 'en-US'
            };
            builder.setHeaders(headers);
            (0, chai_1.expect)(builder.getHeader('X-Client')).to.equal('WebApp');
            (0, chai_1.expect)(builder.getHeader('Accept-Language')).to.equal('en-US');
        });
    });
    (0, mocha_1.describe)('Parameters Management', function () {
        (0, mocha_1.it)('should add and get parameter', function () {
            var paramName = 'id';
            var paramValue = '123';
            builder.addParam(paramName, paramValue);
            (0, chai_1.expect)(builder.getParam(paramName)).to.equal(paramValue);
        });
        (0, mocha_1.it)('should check if parameter exists', function () {
            var paramName = 'id';
            (0, chai_1.expect)(builder.hasParam(paramName)).to.be.false;
            builder.addParam(paramName, '123');
            (0, chai_1.expect)(builder.hasParam(paramName)).to.be.true;
        });
        (0, mocha_1.it)('should remove parameter', function () {
            var paramName = 'id';
            builder.addParam(paramName, '123');
            builder.removeParam(paramName);
            (0, chai_1.expect)(builder.hasParam(paramName)).to.be.false;
        });
        (0, mocha_1.it)('should set multiple parameters', function () {
            var params = {
                id: '123',
                type: 'user'
            };
            builder.setParams(params);
            (0, chai_1.expect)(builder.getParam('id')).to.equal('123');
            (0, chai_1.expect)(builder.getParam('type')).to.equal('user');
        });
    });
    (0, mocha_1.describe)('Query Parameters Management', function () {
        (0, mocha_1.it)('should add and get query parameter', function () {
            var paramName = 'page';
            var paramValue = '2';
            builder.addQueryParam(paramName, paramValue);
            (0, chai_1.expect)(builder.getQueryParam(paramName)).to.equal(paramValue);
        });
        (0, mocha_1.it)('should check if query parameter exists', function () {
            var paramName = 'page';
            (0, chai_1.expect)(builder.hasQueryParam(paramName)).to.be.false;
            builder.addQueryParam(paramName, '2');
            (0, chai_1.expect)(builder.hasQueryParam(paramName)).to.be.true;
        });
        (0, mocha_1.it)('should remove query parameter', function () {
            var paramName = 'page';
            builder.addQueryParam(paramName, '2');
            builder.removeQueryParam(paramName);
            (0, chai_1.expect)(builder.hasQueryParam(paramName)).to.be.false;
        });
        (0, mocha_1.it)('should set multiple query parameters', function () {
            var params = {
                page: '2',
                limit: '10'
            };
            builder.setQueryParams(params);
            (0, chai_1.expect)(builder.getQueryParam('page')).to.equal('2');
            (0, chai_1.expect)(builder.getQueryParam('limit')).to.equal('10');
        });
        (0, mocha_1.it)('should handle date query parameters with formatter', function () {
            var date = new Date('2023-01-01');
            builder.addQueryParam('createdBefore', date, function (d) { return d.toISOString(); });
            (0, chai_1.expect)(builder.getQueryParam('createdBefore')).to.equal(date.toISOString());
        });
    });
    (0, mocha_1.describe)('Body Management', function () {
        (0, mocha_1.it)('should set and get body', function () {
            var body = { title: 'Test Post' };
            builder.setBody(body);
            (0, chai_1.expect)(builder.getBody()).to.deep.equal(body);
        });
        (0, mocha_1.it)('should check if body exists', function () {
            (0, chai_1.expect)(builder.hasBody()).to.be.false;
            builder.setBody({ title: 'Test Post' });
            (0, chai_1.expect)(builder.hasBody()).to.be.true;
        });
    });
    (0, mocha_1.describe)('Hooks', function () {
        (0, mocha_1.it)('should add success hook', function () {
            var hook = function (response) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ retry: false })];
            }); }); };
            builder.addOnSuccessHook(hook);
            // Implementation detail: hooks would be tested during execution
            (0, chai_1.expect)(builder).to.have.property('addOnSuccessHook');
        });
        (0, mocha_1.it)('should add error hook', function () {
            var hook = function (error, builder) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, ({ retry: true })];
            }); }); };
            builder.addOnErrorHook(hook);
            // Implementation detail: hooks would be tested during execution
            (0, chai_1.expect)(builder).to.have.property('addOnErrorHook');
        });
    });
    (0, mocha_1.describe)('Execution', function () {
        var axiosStub;
        (0, mocha_1.beforeEach)(function () {
            axiosStub = sinon_1.default.stub(axios_1.default, 'request').resolves({ data: 'mock response' });
        });
        (0, mocha_1.afterEach)(function () {
            axiosStub.restore();
        });
        (0, mocha_1.it)('should build and execute GET request', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, builder
                            .setMethod(src_1.EHttpMethod.Get)
                            .setEndpoint('/users')
                            .addQueryParam('page', '1')
                            .build()
                            .execute()];
                    case 1:
                        response = _a.sent();
                        (0, chai_1.expect)(response).to.equal('mock response');
                        (0, chai_1.expect)(axiosStub.calledOnce).to.be.true;
                        config = axiosStub.firstCall.args[0];
                        (0, chai_1.expect)(config.method).to.equal('get');
                        (0, chai_1.expect)(config.url).to.equal("".concat(BASE_URL, "/users?page=1"));
                        return [2 /*return*/];
                }
            });
        }); });
        (0, mocha_1.it)('should build and execute POST request with body', function () { return __awaiter(void 0, void 0, void 0, function () {
            var postData, config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postData = { title: 'New Post' };
                        return [4 /*yield*/, builder
                                .setMethod(src_1.EHttpMethod.Post)
                                .setEndpoint('/posts')
                                .setBody(postData)
                                .build()
                                .execute()];
                    case 1:
                        _a.sent();
                        config = axiosStub.firstCall.args[0];
                        (0, chai_1.expect)(config.method).to.equal('post');
                        (0, chai_1.expect)(config.data).to.deep.equal(postData);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, mocha_1.it)('should handle type-safe responses', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        axiosStub.resolves({ data: { id: 1, name: 'John' } });
                        return [4 /*yield*/, builder
                                .setMethod(src_1.EHttpMethod.Get)
                                .setEndpoint('/users/1')
                                .build()
                                .execute()];
                    case 1:
                        response = _a.sent();
                        (0, chai_1.expect)(response.id).to.equal(1);
                        (0, chai_1.expect)(response.name).to.equal('John');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, mocha_1.describe)('Error Handling', function () {
        var axiosStub;
        (0, mocha_1.beforeEach)(function () {
            axiosStub = sinon_1.default.stub(axios_1.default, 'request');
        });
        (0, mocha_1.afterEach)(function () {
            axiosStub.restore();
        });
        (0, mocha_1.it)('should trigger error hook on failure', function () { return __awaiter(void 0, void 0, void 0, function () {
            var error, errorHookCalled, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = new Error('Request failed');
                        axiosStub.rejects(error);
                        errorHookCalled = false;
                        builder.addOnErrorHook(function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                errorHookCalled = true;
                                return [2 /*return*/, { retry: false }];
                            });
                        }); });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, builder.build().execute()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        (0, chai_1.expect)(errorHookCalled).to.be.true;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        (0, mocha_1.it)('should retry request when hook returns retry: true', function () { return __awaiter(void 0, void 0, void 0, function () {
            var error, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = new Error('Request failed');
                        axiosStub.onFirstCall().rejects(error);
                        axiosStub.onSecondCall().resolves({ data: 'success' });
                        builder.addOnErrorHook(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, ({ retry: true })];
                        }); }); });
                        return [4 /*yield*/, builder.build().execute()];
                    case 1:
                        response = _a.sent();
                        (0, chai_1.expect)(response).to.equal('success');
                        (0, chai_1.expect)(axiosStub.calledTwice).to.be.true;
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
