// These are test files so casting is acceptable.
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { jest } from '@jest/globals';

export type ShellMockResult = {
  echo: jest.Mock;
  exec: jest.Mock;
  exit: jest.Mock;
};

export const shelljsMock = (): { default: ShellMockResult } => ({
  default: {
    echo: jest.fn() as jest.Mock,
    exec: jest.fn() as jest.Mock,
    exit: jest.fn() as jest.Mock,
  },
});
