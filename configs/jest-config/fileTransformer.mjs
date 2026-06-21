import path from 'node:path';

// Required in this instance
// eslint-disable-next-line import-x/no-default-export
export default {
  process: (_source, filename) => {
    return `module.exports = ${JSON.stringify(path.baseename(filename))};`;
  },
};
