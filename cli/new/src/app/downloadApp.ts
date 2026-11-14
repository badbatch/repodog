import { type AppBootstrapSource } from '@repodog/cli-utils';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const githubRepositoryPathPattern = /^[\w.-]+\/[\w.-]+$/u;

const execute = promisify(execFile);

export const downloadApp = async (source: AppBootstrapSource, destination: string): Promise<string> => {
  if (!githubRepositoryPathPattern.test(source.repository) || !source.ref || source.ref.startsWith('-')) {
    throw new Error('An application bootstrap needs a GitHub owner/repository and a branch, tag or commit ref.');
  }

  const git = async (...args: string[]): Promise<string> => {
    const result = await execute('git', ['-c', 'core.hooksPath=/dev/null', ...args], {
      cwd: destination,
      env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
      timeout: 120_000,
    });

    return result.stdout.trim();
  };

  await git('init', '--quiet');
  await git('remote', 'add', 'origin', `https://github.com/${source.repository}.git`);
  await git('fetch', '--quiet', '--depth=1', 'origin', source.ref);
  await git('checkout', '--quiet', '--detach', 'FETCH_HEAD');
  return git('rev-parse', 'HEAD');
};
