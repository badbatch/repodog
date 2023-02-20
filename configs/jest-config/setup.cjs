const { DEBUG } = process.env;

if (DEBUG) {
  // eslint-disable-next-line no-undef
  jest.setTimeout(Number.POSITIVE_INFINITY);
}
