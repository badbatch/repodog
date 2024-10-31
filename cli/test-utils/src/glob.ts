// This is a test file so casting is acceptable.
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { jest } from '@jest/globals';

export const globMock = () => ({
  glob: {
    sync: jest.fn() as jest.Mock,
  },
});
