import { asyncExec, verboseLog } from '@repodog/cli-utils';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

export const normaliseChangelog = async (devDependencies: Partial<Record<string, string>>) => {
  const cwd = process.cwd();

  if ('markdownlint-cli2' in devDependencies && existsSync(resolve(cwd, '.markdownlint.json'))) {
    verboseLog('markdownlint dependency and config found, normalising Changelog file');
    await asyncExec(`markdownlint-cli2 ./CHANGELOG.md --config .markdownlint.json --fix`);
    let changelog = readFileSync(resolve(cwd, 'CHANGELOG.md'), { encoding: 'utf8' });

    changelog = changelog
      .replace(/#### /g, '## ')
      .replace(/##### /g, '### ')
      .replace(/# Changelog\n\n/g, '## ');

    changelog = `# Changelog\n\n${changelog}`;
    writeFileSync(resolve(cwd, 'CHANGELOG.md'), changelog, { encoding: 'utf8' });
  } else {
    verboseLog('No markdownlint dependency or config found, skipping normalising Changelog file');
  }
};
