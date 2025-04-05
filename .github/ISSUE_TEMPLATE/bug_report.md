---
name: Bug Report
about: Report a bug to help us improve axios-wrapped
title: '[BUG] '
labels: bug, needs-triage
assignees: ''
---

## 🔍 Bug Description
A clear and concise description of what the bug is. The more details you provide, the faster we can address it.

## 🚶 Steps to Reproduce
1. Create a request with '...'
2. Add headers/params '...'
3. Execute with '...'
4. See error

## 📋 Code Example
```typescript
// Please provide a minimal code example that reproduces the issue
import { Request, EHttpMethod } from 'axios-wrapped';

const request = new Request('https://api.example.com')
  .setMethod(EHttpMethod.Get)
  // ... other relevant code

// Error occurs when...
```

## 🤔 Expected Behavior
A clear and concise description of what you expected to happen.

## 📊 Actual Behavior
A clear and concise description of what actually happened. If applicable, add error messages.

```
// Error message or stack trace if available
```

## 🌍 Environment
- Node.js version: [e.g., v18.15.0]
- axios-wrapped version: [e.g., 0.1.2-beta.1]
- axios version: [e.g., 1.8.4]
- TypeScript version (if relevant): [e.g., 5.8.3]
- Browser (if browser-related): [e.g., Chrome 129.0.6518.44]
- OS (optional): [e.g., Windows 11, macOS 15.4, Ubuntu 24.04]

## 🔄 Reproduction Rate
- [ ] Always reproduces
- [ ] Sometimes reproduces (approximately ___% of attempts)
- [ ] Rarely reproduces
- [ ] Only reproduced once

## 💡 Possible Solution
If you have any ideas on what might be causing the issue or how to fix it, please share them here.

## 📌 Additional Context
Add any other context about the problem here. For example:
- Were you using any specific features like hooks, retries, etc.?
- Did it work before and stop working after an update?
- Does the issue occur in both Node.js and browser environments?

## ✅ Workaround
If you've found a temporary workaround, please share it to help others who might encounter the same issue.