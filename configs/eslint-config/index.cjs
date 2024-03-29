module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:import/recommended', 'plugin:unicorn/recommended', 'prettier'],
  overrides: [
    {
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@typescript-eslint/strict',
        'plugin:import/typescript',
      ],
      files: ['**/*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      plugins: ['@typescript-eslint', 'typescript-sort-keys'],
      rules: {
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
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/no-shadow': 2,
        '@typescript-eslint/no-unused-vars': [
          2,
          { args: 'all', argsIgnorePattern: '^_', ignoreRestSiblings: false, vars: 'all' },
        ],
        '@typescript-eslint/no-use-before-define': 0,
        'import/consistent-type-specifier-style': [2, 'prefer-inline'],
        'import/no-named-as-default': 0,
        'import/no-named-as-default-member': 0,
        'no-use-before-define': 0,
        'typescript-sort-keys/interface': [2, 'asc', { caseSensitive: true, natural: true, requiredFirst: false }],
        'typescript-sort-keys/string-enum': 2,
      },
      settings: {
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
            project: '<root>/tsconfig.json',
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
  ],
  plugins: [
    'import',
    'prefer-arrow',
    'sort-class-members',
    'sort-destructure-keys',
    'sort-keys-fix',
    'unicorn',
    'prettier',
  ],
  rules: {
    'import/extensions': [2, 'ignorePackages'],
    'import/namespace': 0,
    'import/no-default-export': 2,
    // Outstanding bug impacting this rule: https://github.com/import-js/eslint-plugin-import/issues/2168
    'import/no-extraneous-dependencies': [
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
    'import/order': [
      2,
      {
        alphabetize: { caseInsensitive: false, order: 'asc' },
        groups: [['builtin', 'external'], 'parent', 'sibling', 'index'],
        'newlines-between': 'never',
      },
    ],
    'max-len': [
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
    'no-unused-vars': [2, { args: 'all', argsIgnorePattern: '^_', ignoreRestSiblings: false, vars: 'all' }],
    'no-use-before-define': [2, { functions: false }],
    'one-var': [2, { initialized: 'never' }],
    'one-var-declaration-per-line': [2, 'initializations'],
    'padding-line-between-statements': [
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
    'prefer-arrow/prefer-arrow-functions': [
      2,
      {
        allowStandaloneDeclarations: false,
        classPropertiesAllowed: false,
        disallowPrototype: true,
        singleReturnOnly: false,
      },
    ],
    'prettier/prettier': 2,
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
      },
    ],
    'unicorn/no-array-reduce': 0,
    'unicorn/prevent-abbreviations': 0,
  },
};
