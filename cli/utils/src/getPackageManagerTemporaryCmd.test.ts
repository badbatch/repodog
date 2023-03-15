import { PackageManager } from './types.js';

describe('getPackageManagerTemporaryCmd', () => {
  let getPackageManagerTemporaryCmd: typeof import('./getPackageManagerTemporaryCmd.js')['getPackageManagerTemporaryCmd'];

  beforeEach(async () => {
    ({ getPackageManagerTemporaryCmd } = await import('./getPackageManagerTemporaryCmd.js'));
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
