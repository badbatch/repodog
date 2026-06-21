import { jest } from '@jest/globals';

export type ShellMockResult = {
  echo: jest.Mock;
  exec: jest.Mock;
  exit: jest.Mock;
};

export const shelljsMock = (): { default: ShellMockResult } => ({
  default: {
    echo: jest.fn(),
    exec: jest.fn(),
    exit: jest.fn(),
  },
});
