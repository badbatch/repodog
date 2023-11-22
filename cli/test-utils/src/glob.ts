import { jest } from '@jest/globals';

export const globMock = () => ({
  glob: {
    sync: jest.fn(),
  },
});
