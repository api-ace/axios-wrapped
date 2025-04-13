# Changelog

All notable changes to `axios-wrapped` will be documented in this file.

## [0.1.3-beta.1] - 2025-04-13

### 💡 Highlights for Developers

- **🔄 Cancel requests** using `.abort()` — same as Axios’s cancel token, but wrapped neatly in the `IExecutable` interface.
- **📦 Smaller, cleaner build**: fewer dependencies, stricter types, no stale build cache.
- **🧠 Promise handling improved** internally — more reliable hooks and stricter execution.
- **🛠️ Lint, config, and doc cleanup**: all internal improvements to make the project easier to maintain and contribute to.

> That’s it. If you use this lib, you now get request cancellation.  
> If you *build* this lib, life just got smoother.

<details>
<summary>Changelog for maintainers & contributors</summary>

### Added

- **Request Cancellation and Error Handling**:
  - Implemented `abort()` method in `IExecutable` interface and `Request` class using `AbortController` for cancelling HTTP requests.
  - Added constants (`PROMISE_FULFILLED`, `INVALID_NAME_TYPE_ERROR`, `INVALID_PARAMS_FORMAT_ERROR`, `INVALID_HEADERS_FORMAT_ERROR`) in `src/constants/constants.ts` for improved error clarity.
  - Introduced `i-promise-handler-options.ts` in `src/interfaces/index.ts` for flexible promise handling configurations.
- **Tooling Enhancements**:
  - Integrated `eslint-plugin-sonarjs` for better code quality checks (`package.json`).
  - Extended `gulpfile.js` to clear `.rollup.cache` during `clear` task, preventing stale build artifacts.

### Changed

- **Request Builder and Execution**:
  - Enhanced `BaseRequestBuilder` to use new error constants and refined type definitions for headers, params, and hooks.
  - Modified `Request.build()` to leverage `resolveAllStrict` for stricter hook execution, with extracted `callSuccessHooks` and `callErrorHooks` methods.
  - Added `signal` to Axios request config for cancellation support.
- **Linting and Formatter Setup**:
  - Replaced `eslint.config.ts` with a simpler ESLint setup, scoping `lint:check` and `lint:fix` scripts to `src/**/*.ts` and `test/**/*.ts` (`package.json`).

- **Dependency and Build Cleanup**:
  - Removed unused dependencies (`@babel/core`, `@eslint/js`, `@rollup/plugin-babel`, `@types/lodash`, `babel-plugin-transform-remove-console`, `globals`, `typescript-eslint`) in `package.json`.
  - Made `axios` a `peerDependency` to clarify usage and reduce bundle size.
- **Utility Functions**: Relaxed `@typescript-eslint/naming-convention` rule for its entirety in `src/utils/lib/utility.ts` to keep utility names concise.

### Removed
- **ESLint Config**: Eliminated `eslint.config.ts` to simplify linting workflow.

### Fixed
- **Type Safety**: Strengthened type definitions in `BaseRequestBuilder` and `Request` for better reliability.
- **Build Consistency**: Ensured `.rollup.cache` cleanup in `gulp clear` task for reliable builds.

</details>
