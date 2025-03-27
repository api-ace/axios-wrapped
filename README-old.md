

# Axios Request Builder 🚀

A fluent, chainable HTTP client builder for Node.js and browsers, powered by Axios. Perfect for crafting API requests with elegance and precision.

## Features ✨

- **Fluent Interface**: Chain methods for clean, readable request configuration.
- **Full TypeScript Support**: Type-safe methods and generics.
- **Advanced Hooks**: Success/error handlers with retry capabilities.
- **Flexible Configuration**: Easily set headers, params, query params, and bodies.
- **Smart Retries**: Automatic retry logic with request modification.

## Installation 📦

```
npm install axios-request-builder
```

## Quick Start ⚡

### Basic GET Request

```
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

```
builder
.setMethod(EHttpMethod.Post)
.setContentType("application/json")
.addHeader("Authorization", "Bearer token")
.setBody({ data: "payload" });
```

### Hooks System

Handle outcomes and implement retry logic:

```
.addOnSuccessHook((response) => {
    console.log("Success!", response.status);
    return response
})
.addOnErrorHook((error, builder) => {
    console.error("Attempt failed");
    return { retry: true }; // request will be sent again!
});

```

## Full Usage Guide 📖

### Creating Requests

```
const builder = new AxiosRequestBuilder(baseURL)
.setMethod(httpMethod)
.setEndpoint(endpoint);
```

### Configuration Methods

| Method            | Description           | Example                           |
|-------------------|-----------------------|-----------------------------------|
| `.setUrl()`       | Set base URL          | `.setUrl("https://new.api")`      |
| `.setEndpoint()`  | API endpoint          | `.setEndpoint("/posts")`          |
| `.addHeader()`    | Add/modify header     | `.addHeader("X-API-Key", "12345")`|
| `.addQueryParam()`| Add URL query param   | `.addQueryParam("page", 2)`       |
| `.setBody()`      | Set request body      | `.setBody({ title: "Hello" })`    |
| `.setContentType()`| Content-Type shortcut| `.setContentType("text/xml")`     |

### Full CRUD Example

#### Create Post

```
const newPost = await new AxiosRequestBuilder("https://api.example.com")
.setMethod(EHttpMethod.Post)
.setEndpoint("/posts")
.setBody({
    title: "New Post",
    content: "Lorem ipsum..."
})
.addHeader("Authorization", "Bearer abc123")
.build()
.execute();

```

#### Update with Retry Logic

```
const updated = await new AxiosRequestBuilder("https://api.example.com")
.setMethod(EHttpMethod.Patch)
.setEndpoint("/posts/123")
.setBody({ title: "Updated Title" })
.addOnErrorHook( async (error,b) => ({
    b.addHeader("Retry-Attempt", retries)
    // or refresh your auth token here !
    return { retry: true }
}))
.build()
.execute();

```

## Advanced Features

### Date Handling

```JS
.addQueryParam("createdBefore", new Date(), date => date.toISOString());  // provide your date format function or convert default to ISO string
```

### Bulk Header Operations

```
.setHeaders({
"X-Client": "WebApp",
"Accept-Language": "en-US"
});
```

### Type-Safe Responses

```
interface User {
id: number;
name: string;
}

const response = await builder.build<User>().execute();
console.log(response.name); // Auto-complete works

```

## Error Handling

Implement smart retry strategies:

```
.addOnErrorHook((error, builder) => {
    if(error.response?.status === 429) {
        b => b.addHeader("RateLimit-Backoff", "1s")
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

| Method              | Chainable | Description               |
|---------------------|-----------|---------------------------|
| `.setMethod()`      | ✓         | Set HTTP method           |
| `.addHeader()`      | ✓         | Add single header         |
| `.addQueryParam()`  | ✓         | Add URL query parameter   |
| `.setBody()`        | ✓         | Set request payload       |
| `.addOnSuccessHook()`| ✓        | Add success handler       |
| `.addOnErrorHook()` | ✓         | Add error handler         |
| `.build()`          | ✗         | Finalize configuration    |
| `.execute()`        | ✗         | Send request (returns Promise)|

## License 📄

MIT © [Your Name]

---

> **Note**: Replace placeholder values (author, license info) with your actual project details before publishing.
