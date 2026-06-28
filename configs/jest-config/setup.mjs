import { beforeAll, jest } from '@jest/globals';

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    throw new Error(`Unexpected console.error: ${args.join(' ')}`);
  });

  jest.spyOn(console, 'warn').mockImplementation((...args) => {
    throw new Error(`Unexpected console.warn: ${args.join(' ')}`);
  });

  jest.spyOn(console, 'info').mockImplementation((...args) => {
    throw new Error(`Unexpected console.info: ${args.join(' ')}`);
  });

  jest.spyOn(console, 'debug').mockImplementation((...args) => {
    throw new Error(`Unexpected console.debug: ${args.join(' ')}`);
  });

  jest.spyOn(console, 'log').mockImplementation((...args) => {
    throw new Error(`Unexpected console.log: ${args.join(' ')}`);
  });
});
