// eslint is randomly not resolving module
// eslint-disable-next-line import-x/no-unresolved
import playwright from 'eslint-plugin-playwright';

// eslint convention is to export default
// eslint-disable-next-line import-x/no-default-export
export default [playwright.configs['flat/recommended']];