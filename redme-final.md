
# Axios Wrapped

[![npm version](https://img.shields.io/npm/v/axios-wrapped.svg?style=flat-square)](https://www.npmjs.com/package/axios-wrapped)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg?style=flat-square)](https://www.typescriptlang.org/)

A fluent, chainable HTTP client builder for Node.js and browsers, built on top of Axios. Craft API requests with elegance, precision, and full TypeScript support.

## Why Axios Wrapped?

`axios-wrapped` enhances the Axios experience by offering a fluent, chainable API that simplifies request configuration, adds advanced features like hooks and retries, and ensures type safety—all while maintaining the power and flexibility of Axios.

### Comparison with Axios

| Feature                  | Axios                              | Axios Wrapped                           |
|--------------------------|------------------------------------|-----------------------------------------|
| **Request Building**     | Imperative, object-based config   | Fluent, chainable method calls          |
| **Type Safety**          | Partial (manual typing)           | Full TypeScript support with generics   |
| **Hooks & Retries**                | Not natively supported            | Success/Error hooks with retry logic    |
| **Configuration**        | Single config object              | Granular, chainable methods             |
| **Readability**          | Can become verbose                | Clean, readable method chaining         |
| **Flexibility**          | Highly flexible                   | Equally flexible with added structure   |

**Axios Example:**

```javascript
const axios = require('axios');
axios({
  method: 'post',
  url: 'https://api.example.com/posts',
  headers: { 'Authorization': 'Bearer token' },
  data: { title: 'New Post' }
}).then(response => console.log(response.data));
```

**Axios Wrapped Example:**
```javascript
const { AxiosRequestBuilder, EHttpMethod } = require('axios-wrapped');
new AxiosRequestBuilder('https://api.example.com')
  .setMethod(EHttpMethod.Post)
  .setEndpoint('/posts')
  .addHeader('Authorization', 'Bearer token')
  .setBody({ title: 'New Post' })
  .build()
  .execute()
  .then(response => console.log(response.data));
```

## Features ✨

- **Fluent Interface**: Chain methods for clean, readable request configuration.
- **Full TypeScript Support**: Type-safe methods and generics for better developer experience.
- **Advanced Hooks**: Success and error handlers with retry capabilities.
- **Flexible Configuration**: Easily manage headers, params, query params, and bodies.
- **Smart Retries**: Automatic retry logic with request modification.
- **Multiple Formats**: Supports Dates, Objects, Maps, and Arrays in headers/params.

## Installation 📦

```bash
npm install axios-wrapped
```

## Quick Start ⚡

### Basic GET Request

```typescript
import { AxiosRequestBuilder, EHttpMethod } from 'axios-wrapped';

const response = await new AxiosRequestBuilder('https://api.example.com')
  .setMethod(EHttpMethod.Get)
  .setEndpoint('/users')
  .addQueryParam('page', '1')
  .build()
  .execute();

console.log(response.data);
```

## Core Concepts 🧠

### Method Chaining
Build requests intuitively with a chainable API:

```typescript
const builder = new AxiosRequestBuilder('https://api.example.com')
  .setMethod(EHttpMethod.Post)
  .setContentType('application/json')
  .addHeader('Authorization', 'Bearer token')
  .setBody({ title: 'New Post' });
```

### Hooks System
Handle success and errors with custom logic:

```typescript
builder
  .addOnSuccessHook(response => {
    console.log('Success:', response.status);
    return { retry: false };
  })
  .addOnErrorHook(async (error, builder) => {
    console.error('Failed:', error.message);
    builder.addHeader('Retry-Attempt', '1');
    return { retry: true };
  });
```

## Comprehensive Usage Guide 📖

### Creating a Request
Start with the `AxiosRequestBuilder` class:

```typescript
const builder = new AxiosRequestBuilder('https://api.example.com')
  .setMethod(EHttpMethod.Get)
  .setEndpoint('/users');
```

### Full Method Listing

#### URL and Endpoint Management
| Method            | Chainable | Description                          | Example                           |
|-------------------|-----------|--------------------------------------|-----------------------------------|
| `getUrl()`        | ✗         | Get the current base URL            | `builder.getUrl()`                |
| `setUrl()`        | ✓         | Set the base URL                    | `.setUrl('https://new.api')`      |
| `getEndpoint()`   | ✗         | Get the current endpoint            | `builder.getEndpoint()`           |
| `setEndpoint()`   | ✓         | Set the endpoint                    | `.setEndpoint('/posts')`          |
| `getMethod()`     | ✗         | Get the HTTP method                 | `builder.getMethod()`             |
| `setMethod()`     | ✓         | Set the HTTP method                 | `.setMethod(EHttpMethod.Post)`    |

#### Headers Management
| Method            | Chainable | Description                          | Example                           |
|-------------------|-----------|--------------------------------------|-----------------------------------|
| `getContentType()`| ✗         | Get the Content-Type header         | `builder.getContentType()`        |
| `setContentType()`| ✓         | Set the Content-Type header         | `.setContentType('application/json')` |
| `getHeader()`     | ✗         | Get a specific header value         | `builder.getHeader('Authorization')` |
| `hasHeader()`     | ✗         | Check if a header exists            | `builder.hasHeader('X-API-Key')`  |
| `addHeader()`     | ✓         | Add or update a header              | `.addHeader('X-API-Key', '12345')`|
| `removeHeader()`  | ✓         | Remove a specific header            | `.removeHeader('X-API-Key')`      |
| `setHeaders()`    | ✓         | Set multiple headers at once        | `.setHeaders({ 'X-Client': 'WebApp' })` |

#### Parameters Management
| Method            | Chainable | Description                          | Example                           |
|-------------------|-----------|--------------------------------------|-----------------------------------|
| `getParam()`      | ✗         | Get a specific parameter value      | `builder.getParam('id')`          |
| `hasParam()`      | ✗         | Check if a parameter exists         | `builder.hasParam('id')`          |
| `addParam()`      | ✓         | Add a parameter                     | `.addParam('id', '123')`          |
| `removeParam()`   | ✓         | Remove a parameter                  | `.removeParam('id')`              |
| `setParams()`     | ✓         | Set multiple parameters at once     | `.setParams({ id: '123' })`       |

#### Query Parameters Management
| Method              | Chainable | Description                          | Example                           |
|---------------------|-----------|--------------------------------------|-----------------------------------|
| `getQueryParam()`   | ✗         | Get a query parameter value         | `builder.getQueryParam('page')`   |
| `hasQueryParam()`   | ✗         | Check if a query parameter exists   | `builder.hasQueryParam('page')`   |
| `addQueryParam()`  | ✓         | Add a query parameter               | `.addQueryParam('page', '2')`     |
| `removeQueryParam()`| ✓         | Remove a query parameter            | `.removeQueryParam('page')`       |
| `setQueryParams()`  | ✓         | Set multiple query parameters       | `.setQueryParams({ page: '2' })`  |

#### Body Management
| Method            | Chainable | Description                          | Example                           |
|-------------------|-----------|--------------------------------------|-----------------------------------|
| `getBody<TBody>()`| ✗         | Get the request body                | `builder.getBody()`               |
| `hasBody()`       | ✗         | Check if a body exists              | `builder.hasBody()`               |
| `setBody<TBody>()`| ✓         | Set the request body                | `.setBody({ title: 'Hello' })`    |

#### Hooks
| Method                | Chainable | Description                          | Example                           |
|-----------------------|-----------|--------------------------------------|-----------------------------------|
| `addOnSuccessHook()`  | ✓         | Add a success handler               | `.addOnSuccessHook(res => ...)`   |
| `addOnErrorHook()`    | ✓         | Add an error handler with retry     | `.addOnErrorHook((err, b) => ...)`|

#### Execution
| Method            | Chainable | Description                          | Example                           |
|-------------------|-----------|--------------------------------------|-----------------------------------|
| `build<TRes>()`   | ✗         | Finalize configuration              | `builder.build<User>()`           |
| `execute()`       | ✗         | Send the request (returns Promise)  | `builder.execute()`               |
| `getInstance()`   | ✗         | Get the underlying Axios instance   | `builder.getInstance()`           |

### Full CRUD Example

#### Create Post
```typescript
const newPost = await new AxiosRequestBuilder('https://api.example.com')
  .setMethod(EHttpMethod.Post)
  .setEndpoint('/posts')
  .setBody({
    title ‘New Post’,
    content: 'Lorem ipsum...',
  })
  .addHeader('Authorization', 'Bearer abc123')
  .build()
  .execute();
```

#### Update with Retry Logic
```typescript
const updated = await new AxiosRequestBuilder('https://api.example.com')
  .setMethod(EHttpMethod.Patch)
  .setEndpoint('/posts/123')
  .setBody({ title: 'Updated Title' })
  .addOnErrorHook(async (error, builder) => {
    builder.addHeader('Retry-Attempt', '1');
    return { retry: true };
  })
  .build()
  .execute();
```

## Advanced Features 🚀

### Date Handling
Format dates in query params or headers:
```typescript
builder.addQueryParam(
  'createdBefore',
  new Date(),
  date => date.toISOString()
);
```

### Bulk Operations
Set multiple headers or params at once:
```typescript
builder.setHeaders({
  'X-Client': 'WebApp',
  'Accept-Language': 'en-US',
});

builder.setParams([
  { key: 'id', value: '123' },
  { key: 'type', value: 'user' },
]);
```

### Type-Safe Responses
Leverage TypeScript generics:
```typescript
interface User {
  id: number;
  name: string;
}

const response = await builder.build<User>().execute();
console.log(response.data.name); // Type-safe access
```

## Error Handling

### Smart Retry Strategies
```typescript
builder.addOnErrorHook((error, builder) => {
  if (error.response?.status === 429) {
    builder.addHeader('RateLimit-Backoff', '1s');
    return { retry: true };
  }
  return { retry: false };
});
```

## Best Practices

1. **Reusable Builders:**
```typescript
function createAuthRequest(baseUrl: string, token: string) {
  return new AxiosRequestBuilder(baseUrl)
    .addHeader('Authorization', `Bearer ${token}`)
    .setContentType('application/json');
}
```

2. **Centralized Error Handling:**
```typescript
function withDefaultRetry(builder: AxiosRequestBuilder) {
  return builder.addOnErrorHook((error) => ({
    retry: error.response?.status === 503
  }));
}
```

## API Reference 📚

### Exported Members
- `AxiosRequestBuilder`: Main builder class.
- `EHttpMethod`: Enum of HTTP methods (`Get`, `Post`, `Put`, `Delete`, `Patch`, etc.).

## License 📄

MIT © [Sahil Multani]









# ATTEMPT 2

# Axios Wrapped: A Fluent HTTP Client Builder

Axios Wrapped is a TypeScript-friendly HTTP client builder that provides a chainable, fluent interface for working with HTTP requests. Built on top of Axios, it enhances the experience of making API calls with a more readable and maintainable approach.

## Overview

Axios Wrapped offers a builder pattern approach to constructing HTTP requests. Instead of configuring requests through configuration objects, it allows developers to chain method calls for a more natural and readable syntax.

```typescript
// Using Axios Wrapped
const response = await new AxiosRequestBuilder("https://api.example.com")
  .setMethod(EHttpMethod.Get)
  .setEndpoint("/users")
  .addQueryParam("page", 1)
  .build()
  .execute();
```

## Key Features

- **Fluent Interface**: Chain methods for cleaner, more readable request configuration
- **Type Safety**: Full TypeScript support with generics for type-safe responses
- **Advanced Hooks**: Handle success and error scenarios with custom hooks
- **Smart Retries**: Built-in retry mechanism with request modification capabilities
- **Flexible Configuration**: Comprehensive methods for headers, params, and body management

## Use Cases & Comparison with Axios

### 1. Basic Request Configuration

**With Axios:**
```typescript
// Using Axios directly
const response = await axios({
  method: 'get',
  url: 'https://api.example.com/users',
  params: { page: 1 }
});
```

**With Axios Wrapped:**
```typescript
// Using Axios Wrapped
const response = await new AxiosRequestBuilder("https://api.example.com")
  .setMethod(EHttpMethod.Get)
  .setEndpoint("/users")
  .addQueryParam("page", 1)
  .build()
  .execute();
```

**Advantage:** More readable, chainable syntax that clearly separates each configuration element.

### 2. Complex Header Management

**With Axios:**
```typescript
// Using Axios directly
const response = await axios({
  method: 'post',
  url: 'https://api.example.com/users',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'X-API-Key': apiKey,
    'X-Client-ID': clientId
  },
  data: userData
});
```

**With Axios Wrapped:**
```typescript
// Using Axios Wrapped
const response = await new AxiosRequestBuilder("https://api.example.com")
  .setMethod(EHttpMethod.Post)
  .setEndpoint("/users")
  .setContentType("application/json")
  .addHeader("Authorization", `Bearer ${token}`)
  .addHeader("X-API-Key", apiKey)
  .addHeader("X-Client-ID", clientId)
  .setBody(userData)
  .build()
  .execute();
```

**Advantage:** Headers can be added individually or in groups, with specialized methods like `setContentType()` for common operations.

### 3. Error Handling and Retries

**With Axios:**
```typescript
// Using Axios directly with interceptors
axios.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // Refresh token
      const newToken = await refreshToken();
      error.config.headers.Authorization = `Bearer ${newToken}`;
      // Retry the request
      return axios(error.config);
    }
    return Promise.reject(error);
  }
);

// Later in code
try {
  const response = await axios.get('https://api.example.com/protected');
} catch (error) {
  console.error('Request failed:', error);
}
```

**With Axios Wrapped:**
```typescript
// Using Axios Wrapped
const response = await new AxiosRequestBuilder("https://api.example.com")
  .setMethod(EHttpMethod.Get)
  .setEndpoint("/protected")
  .addHeader("Authorization", `Bearer ${token}`)
  .addOnErrorHook(async (error, builder) => {
    if (error.response?.status === 401) {
      const newToken = await refreshToken();
      builder.addHeader("Authorization", `Bearer ${newToken}`);
      return { retry: true };
    }
    return { retry: false };
  })
  .build()
  .execute();
```

**Advantage:** Error handling and retry logic is encapsulated within the request itself, making it more maintainable and specific to each request. The builder can be modified inside the hook to update headers or other request properties before retrying.

### 4. Type-Safe Responses

**With Axios:**
```typescript
// Using Axios directly with TypeScript
interface User {
  id: number;
  name: string;
}

try {
  const response = await axios.get<User>('https://api.example.com/users/1');
  console.log(response.data.name); // Type-safe access
} catch (error) {
  console.error('Request failed:', error);
}
```

**With Axios Wrapped:**
```typescript
// Using Axios Wrapped
interface User {
  id: number;
  name: string;
}

const user = await new AxiosRequestBuilder("https://api.example.com")
  .setMethod(EHttpMethod.Get)
  .setEndpoint("/users/1")
  .build<User>()
  .execute();

console.log(user.name); // Type-safe access directly on the returned object
```

**Advantage:** With Axios Wrapped, the `execute()` method directly returns the parsed response data with proper typing, simplifying access to the response data.

### 5. Building Reusable Request Templates

**With Axios:**
```typescript
// Using Axios directly
function createAuthenticatedRequest(endpoint, method, data = null) {
  return axios({
    url: `https://api.example.com${endpoint}`,
    method,
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    },
    data
  });
}

// Usage
const users = await createAuthenticatedRequest('/users', 'get');
```

**With Axios Wrapped:**
```typescript
// Using Axios Wrapped
function createAuthenticatedBuilder() {
  return new AxiosRequestBuilder("https://api.example.com")
    .addHeader("Authorization", `Bearer ${getToken()}`)
    .setContentType("application/json");
}

// Usage
const users = await createAuthenticatedBuilder()
  .setMethod(EHttpMethod.Get)
  .setEndpoint("/users")
  .build()
  .execute();
```

**Advantage:** The builder pattern allows for creating partial request templates that can be further customized before execution, promoting reusability and consistency across API calls.

## When to Choose Axios Wrapped

Axios Wrapped is particularly useful when:

1. **Your project involves complex API interactions** with various headers, parameters, and error handling strategies
2. **You want improved code readability** for HTTP requests through method chaining
3. **You need advanced retry logic** with the ability to modify requests between attempts
4. **You're working in a TypeScript environment** and want enhanced type safety
5. **You prefer object-oriented patterns** like the builder pattern over configuration objects

## When to Stick with Plain Axios

Plain Axios might be sufficient when:

1. **Your API interactions are simple** and don't require complex configuration
2. **You want to minimize dependencies** in a small project
3. **You prefer configuration objects** over method chaining
4. **You're already using axios interceptors** for global request/response handling
