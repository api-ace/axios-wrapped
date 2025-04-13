# Contributing to axios-wrapped

First off, thank you for considering contributing to axios-wrapped! It's people like you that make it such a great tool.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (v8 or higher recommended)

### Setup Development Environment

1. Fork the repository on GitHub
2. Clone your fork locally
   ```bash
   git clone https://github.com/YOUR-USERNAME/axios-wrapped.git
   cd axios-wrapped
   ```
3. Install dependencies
   ```bash
   npm install
   ```
4. Create a branch for your feature
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🔧 Development Workflow

### Building the Project

```bash
npm run build
```

### Running Tests

```bash
npm test
```

### Linting

```bash
# Check for linting issues
npm run lint:check

# Fix linting issues when possible
npm run lint:fix
```

## 📝 Submitting Changes

1. Make your changes in your feature branch
2. Add tests for your changes
3. Run the test suite to ensure tests pass
4. Commit your changes
   ```bash
   git commit -am "Add feature: your feature description"
   ```
5. Push to your fork
   ```bash
   git push origin feature/your-feature-name
   ```
6. Create a Pull Request from your fork to the main repository
## Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/) for clarity:

### Format
```
<type>(<scope>): <description>
```

### Types
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `perf`: Code changes that improve performance
- `test`: Adding or updating tests
- `chore`: Changes to the build process, tooling, etc.
- `ci`: Changes to CI configuration files and scripts

### Scope
Optional field specifying the module your change affects:
- `config`: Configuration-related changes
- `core`: Core library functionality
- `auth`: Authentication functionality
- `cache`: Caching mechanisms
- `interceptors`: Request/response interceptors
- `types`: TypeScript type definitions
- `utils`: Utility functions

### Examples
```
feat(interceptors): add request timing interceptor
fix(core): prevent duplicate headers on retry
docs(api): clarify timeout configuration options
refactor(utils): simplify URL parameter encoding
chore(deps): migrate from Jest to Vitest
test(cache): add tests for cache invalidation
perf(core): optimize response data handling
ci(github): add Node 20 to test matrix
```

### Linking Issues
Reference issues or PRs with `#123` or keywords:
```
fix(auth): resolve token refresh race condition

Fixes #87
```
## 🔍 Pull Request Process

1. Update the README.md and documentation with details of changes, if applicable
2. Update the version number in package.json following [Semantic Versioning](https://semver.org/)
3. Your PR should pass all checks (tests, linting, build)
4. Your PR will be reviewed by maintainers
5. Once approved, your PR will be merged

## 🛠️ Code Style

We use ESLint and Prettier to maintain code quality. Please ensure your code follows these standards:

- Follow TypeScript best practices
- Write self-documenting code where possible
- Include JSDoc comments for public APIs
- Follow the existing code style

## 🧪 Testing Guidelines

- Write tests for all new features and bug fixes
- Aim for high test coverage (at least 80%)
- Use descriptive test names that explain the expected behavior

Example:
```typescript
describe('Request', () => {
  describe('setEndpoint', () => {
    it('should correctly set and retrieve the endpoint', () => {
      // Test code here
    });
  });
});
```

## 📚 Documentation

- Add or update JSDoc comments for all public APIs
- Update README.md with new features or changes
- Consider adding examples for complex functionality

## 🔄 Version Control

We follow [Semantic Versioning](https://semver.org/):

- MAJOR version for incompatible API changes
- MINOR version for new functionality in a backward-compatible manner
- PATCH version for backward-compatible bug fixes

## ⚠️ Adding Dependencies

Be cautious when adding new dependencies. Consider:

- Is the dependency well-maintained?
- What is the impact on bundle size?
- Are there simpler alternatives?
- Could you implement the needed functionality directly?

## 🚩 Issue Reporting

If you find a bug or have a suggestion, please create an issue using the appropriate template:

- 🐛 [Bug Report](.github//ISSUE_TEMPLATE/bug_report.md)
- 💡 [Feature Request](.github//ISSUE_TEMPLATE/feature_request.md)

## 📜 Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## 📄 License

By contributing, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).

---

Thank you for your contributions! ❤️
