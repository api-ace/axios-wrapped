# Axios Wrapped 🚀

[![npm version](https://img.shields.io/npm/v/axios-request-builder.svg?style=flat-square)](https://www.npmjs.com/package/axios-request-builder)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg?style=flat-square)](https://www.typescriptlang.org/)
[![Star on GitHub](https://img.shields.io/github/stars/your-repo.svg?style=social)](https://github.com/your-repo)

A fluent, chainable HTTP client builder for Node.js and browsers, powered by Axios. Perfect for crafting API requests with elegance and precision.

## Features ✨

- **Fluent Interface** - Chain methods for clean, readable request configuration
- **TypeScript First** - Full type safety with generics support
- **Advanced Hooks** - Custom success/error handlers with retry capabilities
- **Flexible Configuration** - Set headers, params, query params, and bodies with ease
- **Smart Retries** - Automatic retry logic with request modification
- **Multiple Formats** - Support for Dates, Objects, Maps and Arrays in headers/params

## Installation 📦

```bash
npm install axios-request-builder
```

## Quick Start ⚡

### Basic GET Request

```typescript
import { AxiosRequestBuilder, EHttpMethod } from 'axios-request-builder';

const response = await new AxiosRequestBuilder("https://api.example.com")
  .setMethod(EHttpMethod.Get)
  .setEndpoint("/users")
  .addQueryParam("page", 1)
  .build()
  .execute();

console.log(response.data);
```

## Core Concepts 🧠

### Method Chaining

Build requests through intuitive method chaining:

```typescript
const request = new AxiosRequestBuilder("https://api.example.com")
  .setMethod(EHttpMethod.Post)
  .setContentType("application/json")
  .addHeader("Authorization", `Bearer ${token}`)
  .setBody({ title: "New Post" });
```

### Hooks System

Handle outcomes with powerful hooks:

```typescript
.addOnSuccessHook((response) => {
  console.log("Success! Status:", response.status);
  return response.data;
})
.addOnErrorHook(async (error, builder) => {
  if (error.response?.status === 401) {
    await refreshToken();
    builder.addHeader("Authorization", `Bearer ${newToken}`);
    return { retry: true };
  }
  return { retry: false };
});
```

## Comprehensive Usage Guide 📖

### Request Configuration

| Method               | Description                          | Example                                  |
|----------------------|--------------------------------------|------------------------------------------|
| `.setUrl()`          | Set base URL                         | `.setUrl("https://new.api")`             |
| `.setEndpoint()`     | Set API endpoint path                | `.setEndpoint("/users/123")`             |
| `.setMethod()`       | Set HTTP method                      | `.setMethod(EHttpMethod.Patch)`          |
| `.setContentType()`  | Set Content-Type header shortcut     | `.setContentType("application/json")`    |

### Headers Management

```typescript
// Single header
.addHeader("X-API-Key", "12345")

// Multiple headers
.setHeaders({
  "Accept": "application/json",
  "X-Request-ID": uuidv4()
})

// Special types
.addHeader("Expires", new Date()) // Auto-converted to ISO string
.addHeader("Retry-After", 120) // Number converted to string
```

### Query Parameters

```typescript
// Single parameter
.addQueryParam("page", 2)

// Multiple values
.addQueryParam("fields", ["id", "name", "email"])

// Date handling
.addQueryParam("createdBefore", new Date(), date => date.toISOString())
```

### Request Body

```typescript
.setBody({
  title: "New Post",
  content: "Lorem ipsum...",
  tags: ["tech", "javascript"]
})
```

## Advanced Examples 🚀

### CRUD Operations

**Create Resource:**
```typescript
const newPost = await new AxiosRequestBuilder("https://api.example.com")
  .setMethod(EHttpMethod.Post)
  .setEndpoint("/posts")
  .setBody({
    title: "New Post",
    content: "Lorem ipsum..."
  })
  .addHeader("Authorization", `Bearer ${token}`)
  .build()
  .execute();
```

**Update with Retry:**
```typescript
const updatedPost = await new AxiosRequestBuilder(apiUrl)
  .setMethod(EHttpMethod.Patch)
  .setEndpoint(`/posts/${postId}`)
  .setBody({ title: "Updated Title" })
  .addOnErrorHook(async (error, builder) => {
    if (error.response?.status === 429) {
      await delay(1000);
      builder.addHeader("X-Retry-Attempt", retryCount++);
      return { retry: retryCount <= 3 };
    }
    return { retry: false };
  })
  .build()
  .execute();
```

### Type-Safe Responses (TypeScript)

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const user = await new AxiosRequestBuilder(apiUrl)
  .setMethod(EHttpMethod.Get)
  .setEndpoint("/users/123")
  .build<User>()
  .execute();

console.log(user.data.name); // Type-safe access
```

## Error Handling ⚠️

### Retry Strategies

```typescript
.addOnErrorHook((error, builder) => {
  // Retry on network errors
  if (!error.response) {
    return { retry: true };
  }
  
  // Don't retry on client errors
  if (error.response.status >= 400 && error.response.status < 500) {
    return { retry: false };
  }
  
  return { retry: true };
});
```

## API Reference 📚

### Exported Members

```typescript
AxiosRequestBuilder // Main builder class
EHttpMethod // Enum: Get, Post, Put, Delete, Patch, etc.
```

### Core Methods

| Method               | Chainable | Description                              |
|----------------------|-----------|------------------------------------------|
| `.setMethod()`       | ✓         | Set HTTP method                          |
| `.setEndpoint()`     | ✓         | Set API endpoint path                    |
| `.addHeader()`       | ✓         | Add/modify single header                 |
| `.setHeaders()`      | ✓         | Set multiple headers at once             |
| `.addQueryParam()`   | ✓         | Add URL query parameter                  |
| `.setBody()`         | ✓         | Set request payload                      |
| `.addOnSuccessHook()`| ✓         | Add success callback                     |
| `.addOnErrorHook()`  | ✓         | Add error handler with retry capability  |
| `.build()`           | ✗         | Finalize configuration                   |
| `.execute()`         | ✗         | Send request (returns Promise)           |

## Best Practices 🏆

1. **Reusable Builders:**
```typescript
function createAuthRequest(baseUrl: string, token: string) {
  return new AxiosRequestBuilder(baseUrl)
    .addHeader("Authorization", `Bearer ${token}`)
    .setContentType("application/json");
}
```

2. **Request Templates:**
```typescript
const jsonRequest = (url: string) => 
  new AxiosRequestBuilder(url)
    .setContentType("application/json")
    .addHeader("Accept", "application/json");
```

3. **Centralized Error Handling:**
```typescript
function withDefaultRetry(builder: AxiosRequestBuilder) {
  return builder.addOnErrorHook((error) => ({
    retry: error.response?.status === 503
  }));
}
```

## License 📄

MIT © [Your Name] - See [LICENSE](LICENSE) for details.