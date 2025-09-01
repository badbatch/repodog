import {
  PRE_RELEASE_TYPES,
  type ReleaseTag,
  VALID_RELEASE_TAGS,
  VALID_RELEASE_TYPES,
  addCommitPushRelease,
  asyncExec,
  calculateDuration,
  clearDryRunFlag,
  formatListLogMessage,
  getChangedFiles,
  getLastReleaseTag,
  getNewVersion,
  getPackageManager,
  hasDryRunFlag,
  haveFilesChanged,
  isPreRelease,
  isProjectMonorepo,
  isValidReleaseTag,
  isValidReleaseType,
  loadPackageJson,
  setDryRunFlag,
  setVerbose,
  verboseLog,
} from '@repodog/cli-utils';
import colors from 'ansi-colors';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { performance } from 'node:perf_hooks';
import shelljs from 'shelljs';
import { type CutHandlerArguments } from './types.ts';
import { normaliseChangelog } from './utils/normaliseChangelog.ts';
import { versionMonorepoPackages } from './utils/versionMonorepoPackages.ts';
import { versionPackage } from './utils/versionPackage.ts';

export const handler = async (argv: CutHandlerArguments): Promise<void> => {
  const startTime = performance.now();
  const dryRun = argv['dry-run'] ?? false;
  const filter = argv.filter;
  const force = argv.force ?? false;
  const skipPosthook = argv['skip-posthook'] ?? false;
  const skipPrehook = argv['skip-prehook'] ?? false;
  const verbose = argv.verbose ?? false;

  setVerbose(verbose);
  verboseLog('>>>> USER CONFIG START <<<<');
  verboseLog(`dryRun: ${String(dryRun)}`);
  verboseLog(`filter: ${filter ?? 'none'}`);
  verboseLog(`force: ${String(force)}`);
  verboseLog(`skipPosthook: ${String(skipPosthook)}`);
  verboseLog(`skipPrehook: ${String(skipPrehook)}`);
  verboseLog(`tag: ${argv.tag ?? 'undefined'}`);
  verboseLog(`type: ${argv.type}`);
  verboseLog('>>>> USER CONFIG END <<<<\n');

  const cwd = process.cwd();
  verboseLog(`cwd: ${cwd}`);

  try {
    const packageJsonPath = resolve(cwd, 'package.json');
    const packageJson = loadPackageJson(packageJsonPath);

    if (hasDryRunFlag()) {
      verboseLog('__activeDryRun flag found in .repodogrc');

      if (argv.type !== 'dry-run') {
        throw new Error(`Expected type to be dry-run as __activeDryRun is set to true in .repodogrc. Cut a release from
          the existing dry-run output by re-running the cut command with a type of "dry-run" or delete the output and
          re-run the cut command with another type
        `);
      }

      verboseLog(`Adding, committing and pushing new version: ${packageJson.version}`);
      clearDryRunFlag();
      await addCommitPushRelease(packageJson.version);
      verboseLog('>>>> PROJECT ROOT END <<<<\n');
      return shelljs.exit(0);
    }

    if (!isValidReleaseType(argv.type)) {
      throw new Error(`Expected type to be a valid release type: ${VALID_RELEASE_TYPES.join(', ')}`);
    }

    if (argv.tag) {
      if (!isValidReleaseTag(argv.tag)) {
        throw new Error(`Expected tag to be a valid release tag: ${VALID_RELEASE_TAGS.join(', ')}`);
      }

      if (!isPreRelease(argv.type)) {
        throw new Error(`Expected type to be pre release type: ${PRE_RELEASE_TYPES.join(', ')}`);
      }
    }

    const preid = argv.preid;
    // yargs types tag as a string, but it has to be a ReleaseTag or undefined.
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
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

    if (lastReleaseTag && !force && !filesChanged) {
      throw new Error(`No files have changed since the last release tag: ${lastReleaseTag}`);
    }

    verboseLog(`Have files changed: ${String(filesChanged)}`);
    verboseLog('>>>> DERIVED VALUES END <<<<\n');
    verboseLog('>>>> PROJECT ROOT START <<<<');
    const { devDependencies = {}, scripts = {}, version } = packageJson;

    if (!skipPrehook && scripts['cut:pre-version']) {
      verboseLog(`Running cut:pre-version script: ${scripts['cut:pre-version']}\n`);
      await asyncExec(`${packageManager} run cut:pre-version`);
      shelljs.echo('\n');
    } else if (skipPrehook && scripts['cut:pre-version']) {
      verboseLog(`cut:pre-version script skipped, skipPrehook set to true`);
    } else {
      verboseLog(`cut:pre-version script not provided`);
    }

    if (isProjectMonorepo(packageManager)) {
      verboseLog('Project is monorepo');
      versionMonorepoPackages({ filter, force, packageManager, preid, tag, type });
      verboseLog('>>>> PROJECT ROOT STARTS <<<<\n');
    } else {
      verboseLog('Project is standard repo structure');
      const changedFiles = getChangedFiles(lastReleaseTag);
      verboseLog(formatListLogMessage('Project changed files', changedFiles));

      versionPackage(packageJson, {
        packageJsonPath,
        preid,
        tag,
        type,
      });
    }

    if (!skipPosthook && scripts['cut:post-version']) {
      verboseLog(`Running cut:post-version script: ${scripts['cut:post-version']}\n`);
      await asyncExec(`${packageManager} run cut:post-version`);
      shelljs.echo('\n');
    } else if (skipPosthook && scripts['cut:post-version']) {
      verboseLog(`cut:post-version skipped, skipPosthook set to true`);
    } else {
      verboseLog(`cut:post-version script not provided`);
    }

    const newVersion = getNewVersion(version, type, tag, preid);

    if (!newVersion) {
      throw new Error(`The new project verison for a ${type} increment on ${version} is invalid`);
    }

    verboseLog(`Release new version: ${newVersion}`);

    if (isProjectMonorepo(packageManager)) {
      try {
        verboseLog(`Outputting project packageJson with new version: ${newVersion}`);
        writeFileSync(packageJsonPath, JSON.stringify({ ...packageJson, version: newVersion }, undefined, 2));
      } catch (error: unknown) {
        // catch arg has to be of type unknown, but in this context it will
        // always be of type Error.
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        verboseLog(`Package.json output error: ${(error as Error).name}, ${(error as Error).message}`);
        throw new Error(`Could not write the package.json to: ${packageJsonPath}`);
      }
    }

    if (scripts['cut:changelog']) {
      verboseLog(`Generating changelog for ${type} release`);
      await asyncExec(`${packageManager} run cut:changelog -- --${type} --version ${newVersion}`);
      await normaliseChangelog(devDependencies);
    }

    if (dryRun) {
      verboseLog('Exiting process as dry-run set to true');
      verboseLog(`Handler duration: ${String(calculateDuration(startTime))}sec`);
      verboseLog('>>>> PROJECT ROOT END <<<<\n');
      setDryRunFlag();
      return shelljs.exit(0);
    }

    verboseLog(`Adding, committing and pushing new version: ${newVersion}`);
    await addCommitPushRelease(newVersion);
    verboseLog(`Handler duration: ${String(calculateDuration(startTime))}sec`);
    verboseLog('>>>> PROJECT ROOT END <<<<\n');
    return shelljs.exit(0);
  } catch (error: unknown) {
    shelljs.echo(
      // catch arg has to be of type unknown, but in this context it will
      // always be of type Error.
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      `${colors.magenta('Repodog')} ${colors.dim('=>')} ${colors.red(`Error: ${(error as Error).message}`)}`,
    );

    verboseLog(`Handler duration: ${String(calculateDuration(startTime))}sec`);
    verboseLog('>>>> PROJECT ROOT END <<<<\n');
    return shelljs.exit(1);
  }
};
