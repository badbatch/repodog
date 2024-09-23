import { PackageManager } from '@repodog/cli-utils';
import { getPublishCmd } from './getPublishCmd.ts';

describe('getPublishCmd', () => {
  describe('when package manager is npm', () => {
    it('should return the correct command', () => {
      expect(getPublishCmd(PackageManager.NPM, '1.1.0')).toBe('npm publish');
    });
  });

  describe('when package manager is yarn', () => {
    it('should return the correct command', () => {
      expect(getPublishCmd(PackageManager.YARN, '1.1.0')).toBe('yarn publish --new-version 1.1.0');
    });
  });

  describe('when package manager is pnpm', () => {
    it('should return the correct command', () => {
      expect(getPublishCmd(PackageManager.PNPM, '1.1.0')).toBe('pnpm publish --no-git-checks');
    });
  });

  describe('when publish command includes tag', () => {
    it('should return the correct command', () => {
      expect(getPublishCmd(PackageManager.NPM, '1.1.0', 'alpha')).toBe('npm publish --tag alpha');
    });
  });
});
