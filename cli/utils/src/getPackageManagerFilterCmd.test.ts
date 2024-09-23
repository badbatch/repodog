import { getPackageManagerFilterCmd } from './getPackageManagerFilterCmd.ts';
import { PackageManager } from './types.ts';

describe('getPackageManagerFilterCmd', () => {
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
