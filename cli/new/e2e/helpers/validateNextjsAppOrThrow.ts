import { runCommandOrThrow } from './runCommandOrThrow.ts';

export const validateNextjsAppOrThrow = async (app: string): Promise<void> => {
  await runCommandOrThrow(app, 'pnpm', ['install', '--frozen-lockfile']);
  await runCommandOrThrow(app, 'pnpm', ['validate']);
  await runCommandOrThrow(app, 'pnpm', ['test:integration']);
};
