---
to: scripts/generateReadme.mjs
---
import { camelCase } from 'lodash-es';
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parse } from 'react-docgen-typescript';
import { markdownRender } from 'react-docgen-typescript-markdown-render';
import shelljs from 'shelljs';

const cwd = process.cwd();
const packageJson = JSON.parse(readFileSync(resolve(cwd, 'package.json'), { encoding: 'utf8' }));
const srcDir = resolve(cwd, 'src');
const dirents = readdirSync(srcDir, { withFileTypes: true });

const files = dirents
  .filter(dirent => dirent.isFile() && dirent.name.endsWith('.tsx') && !dirent.name.endsWith('stories.tsx'))
  .map(dirent => dirent.name);

const propFilter = prop => {
  if (prop.declarations !== undefined && prop.declarations.length > 0) {
    const hasPropAdditionalDescription = prop.declarations.find(declaration => {
      return !declaration.fileName.includes('node_modules');
    });

    return Boolean(hasPropAdditionalDescription);
  }

  return true;
};

const componentDocs = files.reduce((acc, file) => {
  const output = parse(resolve(srcDir, file), { propFilter });

  if (Array.isArray(output) && output.length > 0) {
    acc = [...acc, output];
  }

  return acc;
}, []);

const name = cwd.split('/').at(-1);
const mainComponentName = name.charAt(0).toUpperCase() + camelCase(name).slice(1);
const content = componentDocs.map(docs => markdownRender(docs));

const defaultInstallationContent = `
Most of the time you should install and use \`${mainComponentName}\` from \`@<%= name %>/core\`.

\`\`\`shell
# terminal
pnpm add @<%= name %>/core
\`\`\`

\`\`\`typescript
import { ${mainComponentName} } from '@<%= name %>/core';
// Do something with it...
\`\`\`

The only time you should install a component directly is if you need to use a version other than the latest version shipped with core.

\`\`\`shell
# terminal
pnpm add @<%= name %>/${name}
\`\`\`

\`\`\`typescript
import { ${mainComponentName} } from '@<%= name %>/${name}';
// Do something with it...
\`\`\`
`;

const installationDocsPath = resolve(cwd, 'docs', 'installation.md');

const installation = existsSync(installationDocsPath)
  ? readFileSync(installationDocsPath, { encoding: 'utf8' })
  : defaultInstallationContent.trim();

const defaultUsageContent = `
The usage instructions and props for each component exported by ${packageJson.name} are detailed below.
`;

const usageDocsPath = resolve(cwd, 'docs', 'usage.md');

const usage = existsSync(usageDocsPath)
  ? readFileSync(usageDocsPath, { encoding: 'utf8' })
  : defaultUsageContent.trim();

const readme = `
# ${packageJson.name}

${packageJson.description}

## Installation

${installation}

## Usage

${usage}

${content.join('\n')}

## Changelog

Check out the [features, fixes and more](../../CHANGELOG.md) that go into each major, minor and patch version.
`;

writeFileSync(resolve(cwd, 'README.md'), readme.trimStart(), {
  encoding: 'utf8',
});

shelljs.exec(`markdownlint-cli2 ./README.md --config ../../.markdownlint.json --fix`);
