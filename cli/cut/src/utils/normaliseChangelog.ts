import { asyncExec, verboseLog } from '@repodog/cli-utils';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

export const normaliseChangelog = async (devDependencies: Partial<Record<string, string>>) => {
  const cwd = process.cwd();

  if ('markdownlint-cli2' in devDependencies && existsSync(resolve(cwd, '.markdownlint.json'))) {
    verboseLog('markdownlint dependency and config found, normalising Changelog file');
    let changelog = readFileSync(resolve(cwd, 'CHANGELOG.md'), { encoding: 'utf8' });
    changelog = changelog.replaceAll('#### ', '## ').replaceAll('##### ', '### ').replaceAll('# Changelog\n\n', '');
    changelog = `# Changelog\n\n${changelog}`;
    writeFileSync(resolve(cwd, 'CHANGELOG.md'), changelog, { encoding: 'utf8' });
    await asyncExec(`markdownlint-cli2 ./CHANGELOG.md --config .markdownlint.json --fix`);
  } else {
    verboseLog('No markdownlint dependency or config found, skipping normalising Changelog file');
  }
};
