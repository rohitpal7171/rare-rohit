// @ts-check
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default tseslint.config(
  // ── Ignore everything that shouldn't be linted ──────────────────────────
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '*.config.ts',
      '*.config.mjs',
      '*.config.cjs',
      '*.config.js',
      'coverage/**',
      '.netlify/**',
      'scripts/**',
      'src/test/**',        // test files have vitest globals — exclude from lint
    ],
  },

  // ── Base JS ──────────────────────────────────────────────────────────────
  js.configs.recommended,

  // ── TypeScript — recommended only, no strict, no stylistic ──────────────
  ...tseslint.configs.recommended,

  // ── Rules ────────────────────────────────────────────────────────────────
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // TypeScript — only genuine errors
      '@typescript-eslint/no-explicit-any':       'off',
      '@typescript-eslint/no-unused-vars':        ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-empty-object-type':  'off',
      '@typescript-eslint/no-empty-function':     'off',
      '@typescript-eslint/ban-ts-comment':        'off',
      '@typescript-eslint/no-require-imports':    'off',

      // React
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // General — only things that matter
      'no-console':  ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-var':      'error',
      'prefer-const': 'warn',
      eqeqeq:        ['error', 'always'],
    },
  },
)
