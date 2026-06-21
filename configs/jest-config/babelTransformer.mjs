import babelJest from 'babel-jest';

// Required in this instance
// eslint-disable-next-line import-x/no-default-export
export default babelJest.createTransformer({
  rootMode: 'upward',
});
