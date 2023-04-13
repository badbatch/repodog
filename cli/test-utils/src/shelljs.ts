import { jest } from '@jest/globals';

export const shelljsMock = () => ({
  default: {
    echo: jest.fn(),
    exec: jest.fn(),
    exit: jest.fn(),
  },
});
