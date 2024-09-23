import { jest } from '@jest/globals';

export const shelljsMock = () => ({
  default: {
    echo: jest.fn() as jest.Mock,
    exec: jest.fn() as jest.Mock,
    exit: jest.fn() as jest.Mock,
  },
});
