// eslint-disable-next-line import/no-extraneous-dependencies
const { jest } = require('@jest/globals');

const { DEBUG } = process.env;

if (DEBUG) {
  jest.setTimeout(999999);
}
