import { jest } from '@jest/globals';

export const globMock = () => ({
  sync: jest.fn(),
});
