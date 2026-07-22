import { defineConfig } from 'oxlint';

export default defineConfig({
  plugins: [],
  jsPlugins: ['@tanstack/eslint-plugin-query'],
  rules: {
    'eslint/no-unused-vars': 'error',
    'eslint/curly': 'warn',

    // Import rules
    'import/no-duplicates': ['error', { preferInline: true }],

    // TypeScript rules
    'typescript/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
    ],
    'typescript/no-explicit-any': 'warn',

    // --- React rules ---
    'react/exhaustive-deps': 'error',
    'react/rules-of-hooks': 'error',
    'react/jsx-key': 'error',
    'react/no-array-index-key': 'warn',
    'react/jsx-curly-brace-presence': 'warn',

    // --- TanStack Query rules ---
    '@tanstack/query/exhaustive-deps': 'error',
    '@tanstack/query/no-rest-destructuring': 'error',
    '@tanstack/query/stable-query-client': 'error',
    '@tanstack/query/no-unstable-deps': 'error',
    '@tanstack/query/infinite-query-property-order': 'error',
    '@tanstack/query/no-void-query-fn': 'error',
    '@tanstack/query/mutation-property-order': 'error',
    '@tanstack/query/prefer-query-options': 'error',
  },
  ignorePatterns: ['coverage/**', 'node_modules/**', 'dist/**'],
});
