import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import importX from 'eslint-plugin-import-x';
import preferArrow from 'eslint-plugin-prefer-arrow';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import sortClassMembers from 'eslint-plugin-sort-class-members';
import sortDestructureKeys from 'eslint-plugin-sort-destructure-keys';
import sortKeysFix from 'eslint-plugin-sort-keys-fix';
import typescriptSortKeys from 'eslint-plugin-typescript-sort-keys';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
// eslint is randomly not resolving module
// eslint-disable-next-line import-x/no-unresolved
import tsEslint from 'typescript-eslint';

const cwd = process.cwd();
const project = './tsconfig.json';

const flatCompat = new FlatCompat({
  baseDirectory: cwd,
});

// eslint convention is to export default
// eslint-disable-next-line import-x/no-default-export
export default tsEslint.config(
  {
    ignores: [
      '!.*',
      '.github/*',
      '.husky/*',
      '.vscode/*',
      'coverage/*',
      'dist/*',
      'lib/*',
      'node_modules/*',
      '**/dist/*',
      '**/lib/*',
      '**/node_modules/*',
    ],
  },
  {
    extends: [
      eslint.configs.recommended,
      importX.flatConfigs.recommended,
      unicorn.configs['flat/recommended'],
      ...fixupConfigRules(flatCompat.extends('plugin:eslint-comments/recommended')),
    ],
    files: ['**/*.{mjs,cjs,js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
      },
      sourceType: 'module',
    },
    plugins: {
      '@stylistic': stylistic,
      'prefer-arrow': fixupPluginRules(preferArrow),
      'sort-class-members': fixupPluginRules(sortClassMembers),
      'sort-destructure-keys': fixupPluginRules(sortDestructureKeys),
      'sort-keys-fix': fixupPluginRules(sortKeysFix),
    },
    rules: {
      '@stylistic/max-len': [
        2,
        {
          code: 120,
          comments: 100,
          ignoreRegExpLiterals: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreUrls: true,
        },
      ],
      '@stylistic/one-var-declaration-per-line': [2, 'initializations'],
      '@stylistic/padding-line-between-statements': [
        2,
        { blankLine: 'any', next: '*', prev: '*' },
        { blankLine: 'always', next: '*', prev: 'multiline-block-like' },
        { blankLine: 'always', next: 'multiline-block-like', prev: '*' },
        { blankLine: 'always', next: '*', prev: 'multiline-expression' },
        { blankLine: 'always', next: 'multiline-expression', prev: '*' },
        { blankLine: 'always', next: '*', prev: 'directive' },
        { blankLine: 'always', next: 'directive', prev: '*' },
        { blankLine: 'never', next: 'singleline-const', prev: 'singleline-const' },
        { blankLine: 'never', next: 'singleline-const', prev: 'singleline-let' },
        { blankLine: 'never', next: 'singleline-let', prev: 'singleline-let' },
        { blankLine: 'never', next: 'singleline-let', prev: 'singleline-const' },
        { blankLine: 'always', next: 'singleline-const', prev: 'cjs-import' },
        { blankLine: 'always', next: 'singleline-let', prev: 'cjs-import' },
        { blankLine: 'always', next: '*', prev: 'multiline-const' },
        { blankLine: 'always', next: 'multiline-const', prev: '*' },
        { blankLine: 'always', next: '*', prev: 'multiline-let' },
        { blankLine: 'always', next: 'multiline-let', prev: '*' },
        { blankLine: 'never', next: 'cjs-export', prev: 'cjs-export' },
        { blankLine: 'never', next: 'cjs-import', prev: 'cjs-import' },
        { blankLine: 'always', next: 'case', prev: '*' },
        { blankLine: 'always', next: 'default', prev: '*' },
        { blankLine: 'always', next: '*', prev: 'break' },
      ],
      'eslint-comments/disable-enable-pair': 0,
      'import-x/extensions': [2, 'ignorePackages'],
      'import-x/namespace': 0,
      'import-x/no-default-export': 2,
      'import-x/no-extraneous-dependencies': [
        2,
        {
          devDependencies: [
            '**/.*',
            '**/*.config.*',
            '**/*.setup.*',
            '**/*.test.*',
            '**/*.stories.*',
            '**/__testUtils__/**',
            '**/__tests__/**',
            '**/__mocks__/**',
            '**/.storybook/**',
          ],
          peerDependencies: false,
        },
      ],
      'import-x/order': [
        2,
        {
          alphabetize: { caseInsensitive: false, order: 'asc' },
          groups: [['builtin', 'external'], 'parent', 'sibling', 'index'],
          'newlines-between': 'never',
        },
      ],
      'no-unused-vars': [2, { args: 'all', argsIgnorePattern: '^_', ignoreRestSiblings: false, vars: 'all' }],
      'no-use-before-define': [2, { functions: false }],
      'object-shorthand': [2, 'always', { avoidQuotes: true }],
      'one-var': [2, { initialized: 'never' }],
      'prefer-arrow/prefer-arrow-functions': [
        2,
        {
          allowStandaloneDeclarations: false,
          classPropertiesAllowed: false,
          disallowPrototype: true,
          singleReturnOnly: false,
        },
      ],
      'sort-class-members/sort-class-members': [
        2,
        {
          accessorPairPositioning: 'getThenSet',
          groups: {
            'arrow-function-properties': [
              { propertyType: 'ArrowFunctionExpression', sort: 'alphabetical', type: 'property' },
            ],
            methods: [{ sort: 'alphabetical', type: 'method' }],
            'private-arrow-function-properties': [
              { name: '/_.+/', propertyType: 'ArrowFunctionExpression', type: 'property' },
            ],
            'private-methods': [{ name: '/_.+/', sort: 'alphabetical', type: 'method' }],
            'private-properties': [{ name: '/_.+/', sort: 'alphabetical', type: 'property' }],
            properties: [{ sort: 'alphabetical', type: 'property' }],
            'static-methods': [{ sort: 'alphabetical', static: true, type: 'method' }],
            'static-private-methods': [{ name: '/_.+/', sort: 'alphabetical', static: true, type: 'method' }],
            'static-private-properties': [{ name: '/_.+/', sort: 'alphabetical', static: true, type: 'property' }],
            'static-properties': [{ sort: 'alphabetical', static: true, type: 'property' }],
          },
          order: [
            '[static-properties]',
            '[static-private-properties]',
            '[static-methods]',
            '[static-private-methods]',
            '[arrow-function-properties]',
            '[properties]',
            '[private-arrow-function-properties]',
            '[private-properties]',
            'constructor',
            'getters',
            'setters',
            '[methods]',
            '[private-methods]',
          ],
        },
      ],
      'sort-destructure-keys/sort-destructure-keys': [2, { caseSensitive: true }],
      'sort-imports': [
        2,
        {
          ignoreDeclarationSort: true,
        },
      ],
      'sort-keys': 0,
      'sort-keys-fix/sort-keys-fix': [2, 'asc', { caseSensitive: true, natural: true }],
      'sort-vars': [2, { ignoreCase: false }],
      'unicorn/consistent-function-scoping': [2, { checkArrowFunctions: false }],
      'unicorn/filename-case': [
        2,
        {
          cases: {
            camelCase: true,
            pascalCase: true,
          },
          ignore: ['^module-defs.d.ts$', '^next-env.d.ts$'],
        },
      ],
      'unicorn/import-style': 0,
      'unicorn/no-array-reduce': 0,
      'unicorn/prevent-abbreviations': 0,
    },
  },
  {
    extends: [
      ...tsEslint.configs.recommendedTypeChecked,
      ...tsEslint.configs.strictTypeChecked,
      ...tsEslint.configs.stylisticTypeChecked,
      importX.flatConfigs.typescript,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project,
        tsconfigRootDir: cwd,
      },
    },
    plugins: {
      'typescript-sort-keys': fixupPluginRules(typescriptSortKeys),
    },
    rules: {
      '@typescript-eslint/consistent-type-assertions': [2, { assertionStyle: 'never' }],
      '@typescript-eslint/consistent-type-definitions': 0,
      '@typescript-eslint/consistent-type-imports': [
        2,
        {
          disallowTypeAnnotations: false,
          fixStyle: 'inline-type-imports',
          prefer: 'type-imports',
        },
      ],
      '@typescript-eslint/naming-convention': [
        2,
        {
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
          selector: 'variable',
        },
        {
          format: ['camelCase', 'PascalCase'],
          selector: 'function',
        },
        {
          format: ['PascalCase'],
          selector: 'typeLike',
        },
        {
          custom: {
            match: false,
            regex: '^I[A-Z]',
          },
          format: ['PascalCase'],
          selector: 'interface',
        },
        {
          custom: {
            match: false,
            regex: '^T[A-Z]',
          },
          format: ['PascalCase'],
          selector: 'typeLike',
        },
      ],
      '@typescript-eslint/no-non-null-assertion': 2,
      '@typescript-eslint/no-shadow': 2,
      '@typescript-eslint/no-unnecessary-type-parameters': 0,
      '@typescript-eslint/no-unused-vars': [
        2,
        { args: 'all', argsIgnorePattern: '^_', ignoreRestSiblings: false, vars: 'all' },
      ],
      '@typescript-eslint/no-use-before-define': 0,
      'import-x/consistent-type-specifier-style': [2, 'prefer-inline'],
      'import-x/no-named-as-default': 0,
      'import-x/no-named-as-default-member': 0,
      'no-use-before-define': 0,
      'typescript-sort-keys/interface': [2, 'asc', { caseSensitive: true, natural: true, requiredFirst: false }],
      'typescript-sort-keys/string-enum': 2,
    },
    settings: {
      'import-x/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project,
        },
      },
    },
  },
  {
    files: ['**/*.{mjs,cjs,js,jsx}'],
    rules: {
      'no-shadow': 2,
    },
  },
  {
    extends: [prettierRecommended],
    files: ['**/*.{mjs,cjs,js,jsx,ts,tsx}'],
  },
  {
    extends: [prettierRecommended],
    files: ['**/*.{mjs,cjs,js,jsx,ts,tsx}'],
  },
  {
    files: ['**/*.{spec,test}.*', '**/__testUtils__/**'],
    rules: {
      '@typescript-eslint/consistent-type-assertions': [
        2,
        { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow' },
      ],
      '@typescript-eslint/no-non-null-assertion': 0,
    },
  },
);
