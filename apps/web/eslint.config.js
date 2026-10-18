import eslint from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default defineConfig([
  globalIgnores(['dist/**']),
  eslint.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: globals.browser,
    },
    settings: {
      react: { version: 'detect' },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-no-target-blank': 'off',
      'react/prop-types': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    // Config files run in Node, not the browser.
    files: ['*.config.js'],
    languageOptions: { globals: globals.node },
  },
  {
    // React Three Fiber uses Three.js props that are not valid DOM attributes.
    files: ['src/components/world/**/*.{js,jsx}'],
    rules: { 'react/no-unknown-property': 'off' },
  },
  eslintConfigPrettier,
]);
