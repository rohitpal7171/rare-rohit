// @ts-check
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importPlugin from 'eslint-plugin-import'
import react from 'eslint-plugin-react'

export default tseslint.config(
  // Ignore patterns
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
    ],
  },

  // Base JS
  js.configs.recommended,

  // TypeScript — recommended (not strict) — fewer red lines
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,

  // Main rules — practical errors only
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      react,
    },
    rules: {
      // ── TypeScript ────────────────────────────────────────────────
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/ban-ts-comment': 'warn',

      // Disable noisy strict-checked rules
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',

      // ── React ─────────────────────────────────────────────────────
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/jsx-no-useless-fragment': 'off',
      'react/self-closing-comp': 'warn',
      'react/no-array-index-key': 'off',
      'react/hook-use-state': 'off',
      'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'ignore' }],

      // ── Accessibility ─────────────────────────────────────────────
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/interactive-supports-focus': 'warn',
      'jsx-a11y/label-has-associated-control': 'warn',

      // ── Imports ───────────────────────────────────────────────────
      'import/order': 'off',
      'import/no-duplicates': 'warn',
      'import/no-cycle': 'warn',
      'import/no-self-import': 'error',
      'import/no-useless-path-segments': 'warn',

      // ── General ───────────────────────────────────────────────────
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-alert': 'warn',
      'prefer-const': 'warn',
      'no-var': 'error',
      'object-shorthand': 'warn',
      'prefer-arrow-callback': 'warn',
      'no-nested-ternary': 'warn',
      'no-unneeded-ternary': 'warn',
      eqeqeq: ['error', 'always'],
    },
  },
)
