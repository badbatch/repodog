import { packageManager } from '#constants.ts';
import { getPackageManagerTemporaryCommand } from '#getPackageManagerTemporaryCommand.ts';

describe('getPackageManagerTemporaryCmd', () => {
  it('returns "npx" for PackageManager.NPM', () => {
    expect(getPackageManagerTemporaryCommand(packageManager.NPM)).toBe('npx');
  });

  it('returns "pnpm dlx" for PackageManager.PNPM', () => {
    expect(getPackageManagerTemporaryCommand(packageManager.PNPM)).toBe('pnpm dlx');
  });

  it('returns "yarn dlx" for PackageManager.YARN', () => {
    expect(getPackageManagerTemporaryCommand(packageManager.YARN)).toBe('yarn dlx');
  });
});
