const config = require('@repodog/rollup-config');

module.exports = {
  ...config({
    copy: {
      targets: [{ dest: 'dist/questions', src: 'src/questions/*' }],
    },
  }),
};
