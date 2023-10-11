module.exports = {
  browser: {
    name: 'headlessChrome',
  },
  helpers: ['./node_modules/jasmine-expect/index.js'],
  specDir: 'tests/browser/dist',
  specFiles: ['index.js'],
  srcDir: 'src',
  srcFiles: ['**/*.{ts,tsx}'],
};
