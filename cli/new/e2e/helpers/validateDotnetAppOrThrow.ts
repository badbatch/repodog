import { runCommandOrThrow } from './runCommandOrThrow.ts';

export const validateDotnetAppOrThrow = async (app: string): Promise<void> => {
  await runCommandOrThrow(app, 'dotnet', ['tool', 'restore']);
  await runCommandOrThrow(app, 'dotnet', ['restore', 'GeneratedApi.sln']);
  await runCommandOrThrow(app, 'dotnet', ['csharpier', 'check', '.']);

  await runCommandOrThrow(app, 'dotnet', [
    'build',
    'GeneratedApi.sln',
    '--configuration',
    'Release',
    '--no-restore',
    '--warnaserror',
  ]);

  await runCommandOrThrow(app, 'dotnet', [
    'test',
    'GeneratedApi.sln',
    '--configuration',
    'Release',
    '--no-build',
    '--settings',
    'Coverage.runsettings',
  ]);
};
