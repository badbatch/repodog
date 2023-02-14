import {
  type ReleaseTag,
  VALID_RELEASE_TAGS,
  VALID_RELEASE_TYPES,
  addCommitPushRelease,
  calculateDuration,
  formatListLogMessage,
  getChangedFiles,
  getLastReleaseTag,
  getNewVersion,
  getPackageManager,
  haveFilesChanged,
  isProjectMonorepo,
  isValidReleaseTag,
  isValidReleaseType,
  loadPackageJson,
  setVerbose,
  verboseLog,
} from '@repodog/cli-utils';
import colors from 'ansi-colors';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { performance } from 'node:perf_hooks';
import shelljs from 'shelljs';
import type { CutReleaseArguments } from './types.js';
import { versionMonorepoPackages } from './utils/versionMonorepoPackages.js';
import { versionPackage } from './utils/versionPackage.js';

export const handler = (argv: CutReleaseArguments) => {
  const startTime = performance.now();
  const dryRun = argv['dry-run'] ?? false;
  const force = argv.force ?? false;
  const preReleaseId = argv.preid;
  const skipPosthook = argv['skip-posthook'] ?? false;
  const skipPrehook = argv['skip-prehook'] ?? false;
  const verbose = argv.verbose ?? false;

  setVerbose(verbose);
  verboseLog('>>>> USER CONFIG START <<<<');
  verboseLog(`dryRun: ${String(dryRun)}`);
  verboseLog(`force: ${String(force)}`);
  verboseLog(`preReleaseId: ${preReleaseId ?? 'undefined'}`);
  verboseLog(`skipPosthook: ${String(skipPosthook)}`);
  verboseLog(`skipPrehook: ${String(skipPrehook)}`);
  verboseLog(`tag: ${argv.tag ?? 'undefined'}`);
  verboseLog(`type: ${argv.type}`);
  verboseLog('>>>> USER CONFIG END <<<<\n');

  try {
    if (!isValidReleaseType(argv.type)) {
      throw new Error(`Expected type to be a valid release type: ${VALID_RELEASE_TYPES.join(', ')}`);
    }

    if (argv.tag && !isValidReleaseTag(argv.tag)) {
      throw new Error(`Expected tag to be a valid release tag: ${VALID_RELEASE_TAGS.join(', ')}`);
    }

    const tag = argv.tag as ReleaseTag | undefined;
    const type = argv.type;
    const packageManager = getPackageManager();

    if (!packageManager) {
      throw new Error('Could not derive the package manager from the lock file in the current working directory');
    }

    const lastReleaseTag = getLastReleaseTag();
    verboseLog('>>>> DERIVED VALUES START <<<<');
    verboseLog(`Package manager: ${packageManager}`);
    verboseLog(`Last release tag: ${lastReleaseTag}`);
    const filesChanged = haveFilesChanged(lastReleaseTag);

    if (!force && !filesChanged) {
      throw new Error(`No files have changed since the last release tag: ${lastReleaseTag}`);
    }

    verboseLog(`Have files changed: ${String(filesChanged)}`);
    verboseLog('>>>> DERIVED VALUES END <<<<\n');
    verboseLog('>>>> PROJECT ROOT START <<<<');
    const packageJsonPath = resolve(process.cwd(), 'package.json');
    const packageJson = loadPackageJson(packageJsonPath);
    const { scripts = {}, version } = packageJson;

    if (!skipPrehook && scripts['cutoff:pre-version']) {
      verboseLog(`Running cutoff:pre-version script: ${scripts['cutoff:pre-version']}\n`);
      shelljs.exec(`${packageManager} run cutoff:pre-version`);
      shelljs.echo('\n');
    } else if (skipPrehook && scripts['cutoff:pre-version']) {
      verboseLog(`cutoff:pre-version script skipped, skipPrehook set to true`);
    } else {
      verboseLog(`cutoff:pre-version script not provided`);
    }

    if (isProjectMonorepo(packageManager)) {
      verboseLog('Project is monorepo');
      versionMonorepoPackages({ force, packageManager, preReleaseId, tag, type });
      verboseLog('>>>> PROJECT ROOT STARTS <<<<\n');
    } else {
      verboseLog('Project is standard repo structure');
      const changedFiles = getChangedFiles(lastReleaseTag);
      verboseLog(formatListLogMessage('Project changed files', changedFiles));

      versionPackage(packageJson, {
        packageJsonPath,
        preReleaseId,
        tag,
        type,
      });
    }

    if (!skipPosthook && scripts['cutoff:post-version']) {
      verboseLog(`Running cutoff:post-version script: ${scripts['cutoff:post-version']}\n`);
      shelljs.exec(`${packageManager} run cutoff:post-version`);
      shelljs.echo('\n');
    } else if (skipPosthook && scripts['cutoff:post-version']) {
      verboseLog(`cutoff:post-version skipped, skipPosthook set to true`);
    } else {
      verboseLog(`cutoff:post-version script not provided`);
    }

    if (['patch', 'minor', 'major'].includes(type)) {
      verboseLog(`Generating changelog for ${type} release`);
      shelljs.exec(`${packageManager} run changelog -- --${type}`);
    }

    const newVersion = getNewVersion(version, type, tag, preReleaseId);

    if (!newVersion) {
      throw new Error(`The new project verison for a ${type} increment on ${version} is invalid`);
    }

    verboseLog(`Release new version: ${newVersion}`);

    if (isProjectMonorepo(packageManager)) {
      try {
        verboseLog(`Outputting project packageJson with new version: ${newVersion}`);
        writeFileSync(packageJsonPath, JSON.stringify({ ...packageJson, version: newVersion }, undefined, 2));
      } catch (error: unknown) {
        verboseLog(`Package.json output error: ${(error as Error).name}, ${(error as Error).message}`);
        throw new Error(`Could not write the package.json to: ${packageJsonPath}`);
      }
    }

    if (dryRun) {
      verboseLog('Exiting process as dry-run set to true');
      verboseLog(`Handler duration: ${String(calculateDuration(startTime))}sec`);
      verboseLog('>>>> PROJECT ROOT END <<<<\n');
      return shelljs.exit(0);
    }

    verboseLog(`Adding, committing and pushing new version: ${newVersion}`);
    addCommitPushRelease(newVersion);
    verboseLog(`Handler duration: ${String(calculateDuration(startTime))}sec`);
    verboseLog('>>>> PROJECT ROOT END <<<<\n');
    return shelljs.exit(0);
  } catch (error: unknown) {
    shelljs.echo(`${colors.magenta('Cutoff')} ${colors.dim('=>')} ${colors.red(`Error: ${(error as Error).message}`)}`);
    verboseLog(`Handler duration: ${String(calculateDuration(startTime))}sec`);
    verboseLog('>>>> PROJECT ROOT END <<<<\n');
    return shelljs.exit(1);
  }
};
