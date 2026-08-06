import eslintReact from '@eslint-react/eslint-plugin';
import stylistic from '@stylistic/eslint-plugin';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';

// ESLint convention is to export default
// eslint-disable-next-line import-x/no-default-export
export default [
  stylistic.configs.customize({
    jsx: true,
  }),
  eslintReact.configs['recommended-type-checked'],
  jsxA11y.flatConfigs.recommended,
  reactHooks.configs.flat.recommended,
  {
    rules: {
      '@stylistic/jsx-sort-props': [
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
      '@stylistic/jsx-wrap-multilines': [
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
