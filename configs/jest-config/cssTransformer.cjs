module.exports = {
  getCacheKey() {
    return 'cssTransformer';
  },
  process() {
    return 'module.exports = {};';
  },
};
