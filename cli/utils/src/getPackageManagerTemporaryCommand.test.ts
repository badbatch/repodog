import { getPackageManagerTemporaryCommand } from '#getPackageManagerTemporaryCommand.ts';
import { PackageManager } from '#types.ts';

describe('getPackageManagerTemporaryCmd', () => {
  it('returns "npx" for PackageManager.NPM', () => {
    expect(getPackageManagerTemporaryCommand(PackageManager.NPM)).toBe('npx');
  });

  it('returns "pnpm dlx" for PackageManager.PNPM', () => {
    expect(getPackageManagerTemporaryCommand(PackageManager.PNPM)).toBe('pnpm dlx');
  });

  it('returns "yarn dlx" for PackageManager.YARN', () => {
    expect(getPackageManagerTemporaryCommand(PackageManager.YARN)).toBe('yarn dlx');
  });
});
