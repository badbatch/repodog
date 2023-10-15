import fetch, { Headers, Request, Response } from 'node-fetch';

const { DEBUG } = process.env;

if (DEBUG) {
  // eslint-disable-next-line no-undef
  jest.setTimeout(999_999);
}

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
  globalThis.Headers = Headers;
  globalThis.Request = Request;
  globalThis.Response = Response;
}
