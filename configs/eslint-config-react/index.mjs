import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

// eslint convention is to export default
// eslint-disable-next-line import-x/no-default-export
export default [
  jsxA11y.flatConfigs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  {
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react/jsx-filename-extension': [2, { extensions: ['.jsx', '.tsx'] }],
      'react/jsx-sort-props': [
        2,
        {
          callbacksLast: false,
          ignoreCase: false,
          noSortAlphabetically: false,
          reservedFirst: false,
          shorthandFirst: false,
          shorthandLast: false,
        },
      ],
      'react/jsx-wrap-multilines': [
        2,
        {
          arrow: 'parens-new-line',
          assignment: 'parens-new-line',
          condition: 'parens-new-line',
          declaration: 'parens-new-line',
          logical: 'parens-new-line',
          prop: 'ignore',
          return: 'parens-new-line',
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
