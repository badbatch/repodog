import { PackageManager } from './types.ts';

describe('getPackageManagerTemporaryCmd', () => {
  let getPackageManagerTemporaryCmd: (typeof import('./getPackageManagerTemporaryCmd.ts'))['getPackageManagerTemporaryCmd'];

  beforeEach(async () => {
    ({ getPackageManagerTemporaryCmd } = await import('./getPackageManagerTemporaryCmd.ts'));
  });

  it('returns "npx" for PackageManager.NPM', () => {
    expect(getPackageManagerTemporaryCmd(PackageManager.NPM)).toBe('npx');
  });

  it('returns "pnpm dlx" for PackageManager.PNPM', () => {
    expect(getPackageManagerTemporaryCmd(PackageManager.PNPM)).toBe('pnpm dlx');
  });

  it('returns "yarn dlx" for PackageManager.YARN', () => {
    expect(getPackageManagerTemporaryCmd(PackageManager.YARN)).toBe('yarn dlx');
  });
});
