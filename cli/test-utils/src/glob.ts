import { jest } from '@jest/globals';

export type GlobMockResult = {
  glob: {
    sync: jest.Mock;
  };
};

export const globMock = (): GlobMockResult => ({
  glob: {
    sync: jest.fn(),
  },
});
