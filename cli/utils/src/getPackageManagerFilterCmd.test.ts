import { PackageManager } from './types.ts';

describe('getPackageManagerFilterCmd', () => {
  let getPackageManagerFilterCmd: typeof import('./getPackageManagerFilterCmd.ts')['getPackageManagerFilterCmd'];

  beforeEach(async () => {
    ({ getPackageManagerFilterCmd } = await import('./getPackageManagerFilterCmd.ts'));
  });

  it('returns "--workspace" for PackageManager.NPM', () => {
    expect(getPackageManagerFilterCmd(PackageManager.NPM)).toBe('--workspace');
  });

  it('returns "--filter" for PackageManager.PNPM', () => {
    expect(getPackageManagerFilterCmd(PackageManager.PNPM)).toBe('--filter');
  });

  it('returns "workspaces foreach --from" for PackageManager.YARN', () => {
    expect(getPackageManagerFilterCmd(PackageManager.YARN)).toBe('workspaces foreach --from');
  });
});
