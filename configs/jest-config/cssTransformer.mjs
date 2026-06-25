// Required in this instance
// eslint-disable-next-line import-x/no-default-export
export default {
  getCacheKey: () => {
    return 'cssTransformer';
  },
  process: () => {
    return 'module.exports = {};';
  },
};
