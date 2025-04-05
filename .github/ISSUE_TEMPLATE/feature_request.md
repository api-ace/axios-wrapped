---
name: Feature Request
about: Suggest an enhancement for axios-wrapped
title: '[FEATURE] '
labels: enhancement, feature-request
assignees: ''
---

## 🚀 Feature Description
A clear and concise description of the feature you'd like to see added to axios-wrapped.

## 🎯 Problem Statement
What problem would this feature solve? Is your feature request related to a difficulty you're experiencing with the library?

## 📋 Use Case Example
```typescript
// A code example showing how you imagine using this feature
import { Request, EHttpMethod } from 'axios-wrapped';

// Potential API usage:
const request = new Request('https://api.example.com')
  .setMethod(EHttpMethod.Get)
  .yourNewFeature(...)
  .build()
  .execute();
```

## 🔄 Current Workaround
How are you currently solving this problem without the requested feature? (if applicable)

## 💭 Proposed Solution
Do you have ideas about how this could be implemented? Any specific behavior you have in mind?

## 🔍 Alternatives Considered
Have you considered any alternative approaches or features?

## 📊 Impact Assessment
- [ ] This would be a **major** feature (new functionality, API changes)
- [ ] This would be a **minor** feature (enhancement to existing functionality)
- [ ] This would be a **patch** (convenience improvement, no API changes)

## 📝 Additional Context
Add any other context, examples from other libraries, screenshots, or references to similar implementations elsewhere.

## 📚 Are you willing to help implement this feature?
- [ ] Yes, I'd be willing to submit a PR
- [ ] I can help with testing
- [ ] I can only provide feedback on implementation
- [ ] Not at this time