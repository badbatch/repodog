import { jest } from '@jest/globals';

export const shelljsMock = () => ({
  echo: jest.fn(),
  exec: jest.fn(),
  exit: jest.fn(),
});
