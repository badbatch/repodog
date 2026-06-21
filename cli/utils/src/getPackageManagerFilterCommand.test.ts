import { getPackageManagerFilterCommand } from '#getPackageManagerFilterCommand.ts';

describe('getPackageManagerFilterCommand', () => {
  it('returns "--workspace" for "npm"', () => {
    expect(getPackageManagerFilterCommand('npm')).toBe('--workspace');
  });

  it('returns "--filter" for "pnpm"', () => {
    expect(getPackageManagerFilterCommand('pnpm')).toBe('--filter');
  });

  it('returns "workspaces foreach --from" for "yarn"', () => {
    expect(getPackageManagerFilterCommand('yarn')).toBe('workspaces foreach --from');
  });
});
