/* eslint-disable */
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import sonarjs from 'eslint-plugin-sonarjs';

export default [
  prettierConfig,
  {
    files: ['**/*.ts'],
    ignores: ['node_modules', 'dist'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
      sonarjs,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...sonarjs.configs.recommended.rules,
      'prettier/prettier': 'error',

      eqeqeq: ['error', 'always'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-throw-literal': 'error',
      'no-magic-numbers': ['warn', { ignore: [0, 1, -1], ignoreArrayIndexes: true }],
      'max-params': ['warn', 4],
      complexity: ['warn', 15],
      'max-lines-per-function': ['warn', 50],
      'sort-imports': ['warn', { ignoreDeclarationSort: true, ignoreCase: true }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-empty-function': ['warn', { allow: ['constructors'] }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'function',
          format: ['camelCase'],
          custom: {
            regex:
              '^(get|set|is|has|build|execute|init|create|fetch|update|delete|process|handle|run|add|remove|check|validate).*',
            match: true,
          },
        },
      ],
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      'sonarjs/function-return-type': 'off',
      'sonarjs/todo-tag': 'off',
    },
  },
];
