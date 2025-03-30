# Axios Wrapped

[![npm version](https://img.shields.io/npm/v/axios-wrapped.svg?style=flat-square)](https://www.npmjs.com/package/axios-wrapped)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg?style=flat-square)](https://www.typescriptlang.org/)

A fluent, chainable HTTP client builder for Node.js and browsers, powered by Axios. Perfect for crafting API requests with elegance and precision.

## Features ✨

- **Fluent Interface**: Chain methods for clean, readable request configuration.
- **Full TypeScript Support**: Type-safe methods and generics.
- **Advanced Hooks**: Success/error handlers with retry capabilities.
- **Flexible Configuration**: Easily set headers, params, query params, and bodies.
- **Smart Retries**: Retry logic with request modification.

## Installation 📦

```bash
npm install axios-request-builder
```

## Quick Start ⚡

### Basic GET Request

```javascript
const { AxiosRequestBuilder, EHttpMethod } = require("axios-request-builder");

const response = await new AxiosRequestBuilder("https://api.example.com")
  .setMethod(EHttpMethod.Get)
  .setEndpoint("/users")
  .addQueryParam("page", 1)
  .build()
  .execute();

console.log(response);
```

## Core Concepts

### Method Chaining

Build requests through sequential method calls:

```javascript
builder
  .setMethod(EHttpMethod.Post)
  .setContentType("application/json")
  .addHeader("Authorization", "Bearer token")
  .setBody({ data: "payload" });
```

### Hooks System

Handle outcomes and implement retry logic:

```javascript
builder
  .addOnSuccessHook((response) => {
    console.log("Success!", response.status);
    return { retry: false }; // Return IHookResult
  })
  .addOnErrorHook((error, builder) => {
    console.error("Attempt failed");
    return { retry: true }; // Request will be sent again!
  });
```

## Full Usage Guide 📖

### Creating Requests

```javascript
const builder = new AxiosRequestBuilder("https://api.example.com")
  .setMethod(EHttpMethod.Get)
  .setEndpoint("/users");
```

### Configuration Methods

Below is a comprehensive list of all methods available in the `IRequestBuilder` interface, including those previously missing from the README.

#### URL and Endpoint Management

| Method            | Description                          | Example                           |
|-------------------|--------------------------------------|-----------------------------------|
| `.getUrl()`       | Get the current base URL            | `builder.getUrl()`                |
| `.setUrl()`       | Set the base URL                    | `.setUrl("https://new.api")`      |
| `.getEndpoint()`  | Get the current endpoint            | `builder.getEndpoint()`           |
| `.setEndpoint()`  | Set the endpoint                    | `.setEndpoint("/posts")`          |
| `.getMethod()`    | Get the HTTP method                 | `builder.getMethod()`             |
| `.setMethod()`    | Set the HTTP method                 | `.setMethod(EHttpMethod.Post)`    |

#### Headers Management

| Method            | Description                          | Example                           |
|-------------------|--------------------------------------|-----------------------------------|
| `.getContentType()`| Get the Content-Type header value  | `builder.getContentType()`        |
| `.setContentType()`| Set the Content-Type header        | `.setContentType("text/xml")`     |
| `.getHeader()`    | Get a specific header value         | `builder.getHeader("Authorization")` |
| `.hasHeader()`    | Check if a header exists            | `builder.hasHeader("X-API-Key")`  |
| `.addHeader()`    | Add or update a header              | `.addHeader("X-API-Key", "12345")`|
| `.removeHeader()` | Remove a specific header            | `.removeHeader("X-API-Key")`      |
| `.setHeaders()`   | Set multiple headers at once        | `.setHeaders({ "X-Client": "WebApp" })` |

**Notes:**
- `.addHeader()` supports multiple overloads: `(name, value)`, `(name, Date, formatter?)`, and `(IKeyValue)`.
- `.removeHeader()` supports both string and `IKeyValue` inputs.
- `.setHeaders()` accepts arrays, Maps, or Records.

#### Parameters Management

| Method            | Description                          | Example                           |
|-------------------|--------------------------------------|-----------------------------------|
| `.getParam()`     | Get a specific parameter value      | `builder.getParam("id")`          |
| `.hasParam()`     | Check if a parameter exists         | `builder.hasParam("id")`          |
| `.addParam()`     | Add a parameter                     | `.addParam("id", "123")`          |
| `.removeParam()`  | Remove a parameter                  | `.removeParam("id")`              |
| `.setParams()`    | Set multiple parameters at once     | `.setParams({ id: "123" })`       |

**Notes:**
- `.addParam()` supports strings, numbers, booleans, Dates (with optional formatter), and `IKeyValue`.
- `.setParams()` accepts arrays, Maps, or Records.

#### Query Parameters Management

| Method              | Description                          | Example                           |
|---------------------|--------------------------------------|-----------------------------------|
| `.getQueryParam()`  | Get a query parameter value         | `builder.getQueryParam("page")`   |
| `.hasQueryParam()`  | Check if a query parameter exists   | `builder.hasQueryParam("page")`   |
| `.addQueryParam()`  | Add a query parameter               | `.addQueryParam("page", 2)`       |
| `.removeQueryParam()`| Remove a query parameter           | `.removeQueryParam("page")`       |
| `.setQueryParams()` | Set multiple query parameters       | `.setQueryParams({ page: "2" })`  |

**Notes:**
- `.addQueryParam()` supports arrays, Dates (with optional formatter), and `IKeyValue`.
- `.getQueryParam()` returns `string | string[]`.

#### Body Management

| Method            | Description                          | Example                           |
|-------------------|--------------------------------------|-----------------------------------|
| `.getBody<TBody>()`| Get the request body               | `builder.getBody()`               |
| `.hasBody()`      | Check if a body exists              | `builder.hasBody()`               |
| `.setBody<TBody>()`| Set the request body               | `.setBody({ title: "Hello" })`    |

#### Hooks

| Method                | Description                          | Example                           |
|-----------------------|--------------------------------------|-----------------------------------|
| `.addOnSuccessHook()` | Add a success handler               | `.addOnSuccessHook((res) => ...)` |
| `.addOnErrorHook()`   | Add an error handler                | `.addOnErrorHook((err) => ...)`   |

#### Execution

| Method            | Description                          | Example                           |
|-------------------|--------------------------------------|-----------------------------------|
| `.build<TRes>()`  | Build an executable request         | `builder.build<User>()`           |
| `.getInstance()`  | Get the underlying Axios instance   | `builder.getInstance()`           |

### Full CRUD Example

#### Create Post

```javascript
const newPost = await new AxiosRequestBuilder("https://api.example.com")
  .setMethod(EHttpMethod.Post)
  .setEndpoint("/posts")
  .setBody({
    title: "New Post",
    content: "Lorem ipsum...",
  })
  .addHeader("Authorization", "Bearer abc123")
  .build()
  .execute();
```

#### Update with Retry Logic

```javascript
const updated = await new AxiosRequestBuilder("https://api.example.com")
  .setMethod(EHttpMethod.Patch)
  .setEndpoint("/posts/123")
  .setBody({ title: "Updated Title" })
  .addOnErrorHook(async (error, builder) => {
    builder.addHeader("Retry-Attempt", "1");
    return { retry: true };
  })
  .build()
  .execute();
```

## Advanced Features

### Date Handling

```javascript
builder.addQueryParam(
  "createdBefore",
  new Date(),
  (date) => date.toISOString()
);
```

### Bulk Operations

```javascript
builder.setHeaders({
  "X-Client": "WebApp",
  "Accept-Language": "en-US",
});

builder.setParams([
  { key: "id", value: "123" },
  { key: "type", value: "user" },
]);
```

### Type-Safe Responses

```typescript
interface User {
  id: number;
  name: string;
}

const response = await builder.build<User>().execute();
console.log(response.name); // Type-safe auto-complete
```

## Error Handling

Implement smart retry strategies:

```javascript
builder.addOnErrorHook((error, builder) => {
  if (error.response?.status === 429) {
    builder.addHeader("RateLimit-Backoff", "1s");
    return { retry: true };
  }
  return { retry: false };
});
```

## API Reference 📚

### Exported Members

- `AxiosRequestBuilder`: Main builder class.
- `EHttpMethod`: Enum of HTTP methods (`Get`, `Post`, `Put`, etc.).

### Core Methods

| Method                | Chainable | Description                          |
|-----------------------|-----------|--------------------------------------|
| `.setMethod()`        | ✓         | Set HTTP method                     |
| `.addHeader()`        | ✓         | Add single header                   |
| `.addQueryParam()`    | ✓         | Add URL query parameter             |
| `.setBody()`          | ✓         | Set request payload                 |
| `.addOnSuccessHook()` | ✓         | Add success handler                 |
| `.addOnErrorHook()`   | ✓         | Add error handler                   |
| `.build()`            | ✗         | Finalize configuration              |
| `.execute()`          | ✗         | Send request (returns Promise)      |

## License 📄

MIT © [Sahil Multani]
