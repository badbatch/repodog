module.exports = {
  env: {
    jasmine: false,
  },
  extends: ['plugin:jasmine/recommended'],
  plugins: ['jasmine'],
  rules: {
    'jasmine/new-line-before-expect': 0,
    'jasmine/no-spec-dupes': 0,
    'jasmine/no-suite-dupes': 0,
  },
};
