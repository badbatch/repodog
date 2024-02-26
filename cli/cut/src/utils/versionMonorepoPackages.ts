import {
  type ReleaseMeta,
  formatListLogMessage,
  getChangedFiles,
  getInternalDependencies,
  getLastReleaseTag,
  getMonorepoPackageMeta,
  loadPackageJson,
  verboseLog,
} from '@repodog/cli-utils';
import colors from 'ansi-colors';
import { parse, sep } from 'node:path';
import shelljs from 'shelljs';
import { versionPackage } from './versionPackage.ts';

export const versionMonorepoPackages = ({
  force,
  packageManager,
  tag,
  type,
}: Pick<ReleaseMeta, 'force' | 'packageManager' | 'tag' | 'type'>) => {
  const packageMetaRecord = getMonorepoPackageMeta(packageManager);
  const lastReleaseTag = getLastReleaseTag();
  const changedFiles = getChangedFiles(lastReleaseTag);
  const cwd = process.cwd();
  verboseLog(formatListLogMessage('Project changed files', changedFiles));
  verboseLog(`Project last release tag: ${lastReleaseTag}`);
  verboseLog('Versioning monorepo packages');
  verboseLog('>>>> PROJECT ROOT END <<<<\n');
  const packageMetaKeys = Object.keys(packageMetaRecord);

  for (let index = packageMetaKeys.length - 1; index >= 0; index -= 1) {
    verboseLog('>>>> PACKAGE START <<<<');
    const packageMetaKey = packageMetaKeys[index]!;
    const packageMeta = packageMetaRecord[packageMetaKey]!;

    try {
      const packageJson = loadPackageJson(packageMeta.path);
      const { name } = packageJson;
      verboseLog(`Checking package: ${name}`);
      const internalDependencies = getInternalDependencies(packageJson, packageMetaRecord);

      if (internalDependencies.some(dep => !packageMetaRecord[dep]?.checked)) {
        verboseLog('Not all internal dependencies have been checked, pushing to back of queue\n');
        packageMetaKeys.unshift(name);
        index += 1;
        continue;
      }

      packageMeta.checked = true;
      packageMeta.force = internalDependencies.some(dep => !!packageMetaRecord[dep]?.versioned);
      const { dir } = parse(packageMeta.path);
      let relativeDirectory = dir.replace(cwd, '');

      if (relativeDirectory.startsWith(sep)) {
        relativeDirectory = relativeDirectory.slice(1);
      }

      verboseLog(`Relative dir: ${relativeDirectory}`);

      if (!changedFiles.some(file => file.includes(relativeDirectory))) {
        verboseLog(`No files have changed since the last release tag: ${lastReleaseTag}`);

        if (!force && !packageMeta.force) {
          verboseLog('>>>> PACKAGE END <<<<\n');
          continue;
        }

        if (force) {
          verboseLog('Force is set to true, proceeding regardless of file changes');
        } else if (packageMeta.force) {
          verboseLog('Package has an internal dependency with file changes');
        }
      }

      const packageChangedFiles = changedFiles.filter(file => file.includes(relativeDirectory));

      if (packageChangedFiles.length > 0) {
        verboseLog(formatListLogMessage(`Package changed files`, packageChangedFiles));
      }

      verboseLog(`Versioning package: ${name}`);

      versionPackage(packageJson, {
        packageJsonPath: packageMeta.path,
        tag,
        type,
      });

      packageMeta.versioned = true;
      verboseLog('>>>> PACKAGE END <<<<\n');
    } catch (error: unknown) {
      shelljs.echo(
        `${colors.magenta('Repodog')} ${colors.dim('=>')} ${colors.red(`Error: ${(error as Error).message}`)}`
      );

      verboseLog('>>>> PACKAGE END <<<<\n');
    } finally {
      packageMetaKeys.splice(index, 1);
    }
  }
};
