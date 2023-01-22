const path = require('node:path');

module.exports = {
  process(_source, filename) {
    return `module.exports = ${JSON.stringify(path.baseename(filename))};`;
  },
};
