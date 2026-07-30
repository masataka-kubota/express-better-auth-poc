import { defineConfig } from 'oxlint';

export default defineConfig({
  plugins: [],
  rules: {
    'eslint/no-unused-vars': 'error',
    'eslint/curly': 'warn',

    // Import rules
    'import/no-duplicates': ['error', { preferInline: true }],

    // TypeScript rules
    'typescript/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', fixStyle: 'inline-type-imports' }
    ],
    'typescript/no-explicit-any': 'warn'
  },
  ignorePatterns: ['android/**', 'ios/**', '.expo/**', 'coverage/**', 'node_modules/**', 'dist/**']
});
