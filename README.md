
# 🚀 Axios Wrapped

[![npm version](https://img.shields.io/npm/v/axios-wrapped.svg?style=flat-square)](https://www.npmjs.com/package/axios-wrapped)
[![Package Size](https://img.shields.io/bundlephobia/min/axios-wrapped)](https://bundlephobia.com/package/axios-wrapped)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg?style=flat-square)](https://www.typescriptlang.org/)

> Making HTTP requests that don't make you want to pull your hair out!

A fluent, chainable HTTP client builder for Node.js and browsers, built on top of Axios. Because life's too short for messy request configs.

## Why Axios Wrapped?

Ever looked at your API code and thought it resembled spaghetti more than JavaScript? Us too! That's why we created `axios-wrapped` - to bring some sanity back to your HTTP requests.

```javascript
// Before: "What was I even trying to do here?"
axios({
  method: 'post',
  url: 'https://api.example.com/posts',
  headers: { 'Authorization': 'Bearer ' + token, 'X-API-Version': '2.0' },
  params: { source: 'web' },
  data: { title: 'API calls should be fun', content: '...but they rarely are' }
}).then(res => console.log(res.data)).catch(err => console.error('Oops!', err));

// After: "Oh, that's actually readable!"
new Request('https://api.example.com')
  .setMethod(EHttpMethod.Post)
  .setEndpoint('/posts')
  .addHeader('Authorization', `Bearer ${token}`)
  .addHeader('X-API-Version', '2.0')
  .addQueryParam('source', 'web')
  .setBody({ 
    title: 'API calls should be fun', 
    content: '...and now they are!' 
  })
  .build()
  .execute()
  .then(data => console.log(data))
  .catch(err => console.error('Still oops, but at least the code looks nice!', err));
```

## ✨ Features That Will Make Your Day Better

- **Chain All The Things**: Write requests that actually make sense when you read them
- **TypeScript Love**: Full TypeScript support because `any`'s are scary
- **Smart Retries**: Auto-retry failed requests without copy-pasting code everywhere
- **Hook It Up**: Add success and error hooks like you're setting up event listeners
- **Be Flexible**: Handle dates, objects, and arrays in headers/params without breaking a sweat
- **Parameter Power**: Manage URL params, query params, and body params with equal ease
- **Instance Control**: Bring your own Axios instance with custom configs
- **Header Happiness**: Manage headers like a boss with easy get/set/remove operations
- **Date Magic**: Automatic date formatting for query parameters and headers
- **Bulk Operations**: Set multiple headers/params at once because your time is precious

## 📦 Installation (It's Easy, Promise!)

```bash
npm install axios axios-wrapped
```

## ⚡ Quick Start (Even Quicker Than Instant Ramen)

```typescript
import { Request, EHttpMethod } from 'axios-wrapped';

// Fetch users without losing your will to live
const users = await new Request('https://api.example.com')
  .setMethod(EHttpMethod.Get)
  .setEndpoint('/users')
  .addQueryParam('page', '1')
  .build()
  .execute();

console.log(users); // Look ma, no response.data!
```

## 🧩 Core Concepts (Don't Worry, They're Simple)

### Method Chaining (Like LEGO, But For Code)

```typescript
const builder = new Request('https://api.example.com')
  .setMethod(EHttpMethod.Post)
  .setContentType('application/json')
  .addHeader('Authorization', `Bearer ${token}`)
  .setBody({ message: "This is so much cleaner than a config object!" });
```

### Parameter Magic (Different Kinds, Same Easy Syntax)

```typescript
// Query params (after the ?)
builder.addQueryParam('include', 'details');
builder.addQueryParam('limit', '10');

// Multiple at once? No problem!
builder.setQueryParams({
  sort: 'desc',
  fields: 'name,email'
});
```

### Date Formatting (Because Dates Are Hard)

```typescript
// "Give me all orders from last week"
const lastWeek = new Date();
lastWeek.setDate(lastWeek.getDate() - 7);

builder.addQueryParam(
  'createdAfter', 
  lastWeek,
  date => date.toISOString() // Format however you want!
);
```
### Request Cancellation (Stop It Right Now!)
Sometimes you need to pull the plug on a request—like when a user navigates away or a timeout kicks in. Use `abort()` to cancel a request before it completes.

```typescript
const builder = new Request('https://api.example.com')
  .setEndpoint('/slow-endpoint')
  .build();

builder.execute();
setTimeout(() => builder.abort(), 2000); // Cancel after 2 seconds
```
### Hooks (For When Things Go Right or Wrong)

```typescript
builder
  .addOnSuccessHook(response => {
    console.log('Woohoo! Status:', response.status);
    return { retry: false }; // We're good!
  })
  .addOnErrorHook(async (error, builder) => {
    console.error('Dang it:', error.message);
    
    // Token expired? No problem!
    if (error.response?.status === 401) {
      const newToken = await refreshToken();
      builder.addHeader('Authorization', `Bearer ${newToken}`);
      return { retry: true }; // Let's try again
    }
    return { retry: false }; // I give up
  });
```

## 🛠️ Complete API Reference (Because You're a Power User)

### URL & Endpoint Management

```typescript
const request = new Request('https://api.example.com');

// Get/Set base URL
request.getUrl(); // 'https://api.example.com'
request.setUrl('https://api2.example.com');

// Get/Set endpoint
request.setEndpoint('/users');
request.getEndpoint(); // '/users'

// Get/Set HTTP method
request.setMethod(EHttpMethod.Post);
request.getMethod(); // EHttpMethod.Post
```

### Header Management (Because Headers Matter)

```typescript
// Content-Type shortcuts
request.setContentType('application/json');
request.getContentType(); // 'application/json'

// Single header operations
request.addHeader('Authorization', 'Bearer token123');
request.getHeader('Authorization'); // 'Bearer token123'
request.hasHeader('X-API-Key'); // false
request.removeHeader('X-Temp-Header');

// Bulk header operations
request.setHeaders({
  'X-Client': 'WebApp',
  'Accept-Language': 'en-US'
});

// Date headers with custom formatting
request.addHeader('Expires', new Date(), date => date.toUTCString());
```

### Parameter Management (For That URL Magic)

```typescript
// Single parameter
request.addParam('id', '123');
request.getParam('id'); // '123'
request.hasParam('id'); // true
request.removeParam('id');

// Bulk parameters
request.setParams({
  userId: '456',
  role: 'admin'
});

// Date parameters
request.addParam('expiresAt', new Date(), date => date.getTime().toString());
```

### Query Parameter Management (The ? Stuff)

```typescript
// Single query param
request.addQueryParam('page', '2');
request.getQueryParam('page'); // '2'
request.hasQueryParam('page'); // true
request.removeQueryParam('page');

// Bulk query params
request.setQueryParams({
  limit: '10',
  sort: 'desc'
});

// Array query params
request.addQueryParam('tags', ['js', 'ts', 'axios']);

// Date query params
request.addQueryParam('createdBefore', new Date(), date => date.toISOString());
```

### Body Management (Where the Meat Goes)

```typescript
// Set and check body
request.setBody({ title: 'Hello World' });
request.getBody(); // { title: 'Hello World' }
request.hasBody(); // true
```

### Hooks (For Those Special Moments)

```typescript
// Success hook
request.addOnSuccessHook(async (response) => {
  console.log('Success!', response.status);
  return { retry: false };
});

// Error hook with retry logic
request.addOnErrorHook(async (error, builder) => {
  if (error.response?.status === 429) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { retry: true };
  }
  return { retry: false };
});
```

### Execution (Make It So!)

```typescript
// Build with TypeScript generics
interface User {
  id: number;
  name: string;
}

const executable = request.build<User>();

// Execute and get typed response
const user = await executable.execute();
console.log(user.name); // TypeScript knows this is a string!
```

## 🔍 Common Request Patterns (Copy-Paste These, We Won't Judge)

### Create a New Thing
```typescript
const post = await new Request('https://api.example.com')
  .setMethod(EHttpMethod.Post)
  .setEndpoint('/posts')
  .setBody({
    title: 'Axios Wrapped Rocks',
    content: 'No, seriously, it does.',
  })
  .build()
  .execute();
```

### Get a Thing with Type Safety
```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const user = await new Request('https://api.example.com')
  .setMethod(EHttpMethod.Get)
  .setEndpoint('/users/123')
  .build<User>()  // Look ma, type safety!
  .execute();

console.log(user.name); // TypeScript knows this is a string!
```

### Update a Thing with Automatic Retry
```typescript
const updatedPost = await new Request('https://api.example.com')
  .setMethod(EHttpMethod.Patch)
  .setEndpoint('/posts/123')
  .setBody({ title: 'Updated Title' })
  .addOnErrorHook(async (error, builder) => {
    // Server having a bad day? Give it another chance
    if (error.response?.status >= 500) {
      // Wait a second before retry
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { retry: true };
    }
    return { retry: false };
  })
  .build()
  .execute();
```

### Delete a Thing
```typescript
await new Request('https://api.example.com')
  .setMethod(EHttpMethod.Delete)
  .setEndpoint('/posts/123')
  .build()
  .execute();

console.log('Goodbye, post 123! 👋');
```

### Custom Axios Instance (When You Need Extra Control)
```typescript
// Create an Axios instance with custom settings
const instance = axios.create({
  timeout: 5000,
  withCredentials: true
});

// Use it with your request
const response = await new Request('https://api.example.com', instance)
  .setMethod(EHttpMethod.Get)
  .setEndpoint('/users')
  .build()
  .execute();
```

## 💡 Pro Tips

1. **Debug More Easily**: Each step in the chain is clear, making it easier to spot issues
2. **Handle 401s Gracefully**: Use error hooks to refresh tokens and retry
3. **Keep It DRY**: Create base request builders for common API patterns
4. **Format Those Dates**: Use the date formatter to ensure consistent date formats
5. **Type Everything**: Use TypeScript generics for type-safe responses
6. **Bulk It Up**: Use `setHeaders` and `setParams` to configure multiple values at once
7. **Hook It**: Add logging or analytics in your hooks for cross-cutting concerns
8. **Check Before You Get**: Use `hasHeader`/`hasParam` to avoid undefined errors

## 👨‍💻 Contributing
## 👨‍💻 Contributing
Got ideas to make `axios-wrapped` even cooler? We’re open to contributions—jump in and join the fun! 🎉 See [CONTRIBUTING.md](./CONTRIBUTING.md).
## 📄 License

MIT © [Sahil Multani]

*Because coding HTTP requests should be fun, not painful.*


