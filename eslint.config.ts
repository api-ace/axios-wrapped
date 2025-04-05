/* eslint-disable */
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],

    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },

    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      prettier: prettierPlugin,
    },

    rules: {
      // Existing KISS/SOLID rules
      complexity: ['error', 10],
      'max-lines-per-function': ['warn', 30],
      'max-params': ['error', 3],
      'no-magic-numbers': ['warn', { ignore: [0, 1, -1] }],
      '@typescript-eslint/no-extraneous-class': ['error'],
      'max-classes-per-file': ['error', 1],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      'no-dupe-class-members': 'error',
      'no-console': ['warn', { allow: ['error'] }],
      eqeqeq: ['error', 'always'],
      curly: 'error',
      '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      'prettier/prettier': 'error',
      '@typescript-eslint/no-empty-function': ['error', { allow: ['constructors'] }],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-ignore': 'allow-with-description',
          minimumDescriptionLength: 10,
        },
      ],
      'sort-imports': [
        'error',
        {
          ignoreDeclarationSort: true,
          ignoreCase: true,
        },
      ],
      // New Naming Convention Rules
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'function',
          format: ['camelCase'],
          leadingUnderscore: 'forbid',
          custom: {
            regex:
              '^(get|set|is|has|build|execute|init|create|fetch|update|delete|process|handle|run|add|remove|check|validate).*',
            match: true,
          },
        },
        {
          selector: 'method',
          modifiers: ['public'],
          format: ['camelCase'],
          custom: {
            regex:
              '^(get|set|is|has|build|execute|init|create|fetch|update|delete|process|handle|run|add|remove|check|validate).*',
            match: true,
          },
        },
        {
          selector: 'method',
          modifiers: ['private', 'protected'],
          format: ['camelCase'],
          leadingUnderscore: 'allow',
          custom: {
            regex:
              '^(get|set|is|has|build|execute|init|create|fetch|update|delete|process|handle|run|add|remove|check|validate).*',
            match: true,
          },
        },
      ],
    },
  },
  {
    ignores: [
      'node_modules/**',
      '.rollup.cache',
      'dist/**',
      'build/**',
      '.rpt2_cache/**',
      '*.min.js',
      'coverage/**',
      '**/*.d.ts',
      'rollup.config.js',
    ],
  },

  prettierConfig,
];
