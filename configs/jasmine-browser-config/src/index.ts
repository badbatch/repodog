// jasmine requires default export
// eslint-disable-next-line import-x/no-default-export
export default {
  browser: {
    name: 'headlessChrome',
  },
  helpers: ['./node_modules/jasmine-expect/index.js'],
  specDir: 'tests/browser/dist',
  specFiles: ['index.js'],
  srcDir: 'src',
  srcFiles: [],
};
