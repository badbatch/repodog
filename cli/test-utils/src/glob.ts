import { jest } from '@jest/globals';

export const globMock = () => ({
  default: {
    sync: jest.fn(),
  },
});
