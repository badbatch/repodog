---
to: scripts/stripBaseTailwindCss.mjs
---
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const cwd = process.cwd();
const cssFile = resolve(cwd, './dist/styles/index.css');
const content = readFileSync(cssFile, { encoding: 'utf8' });
const selectors = content.match(/.+{[^}]+}/gm);

if (selectors) {
  const selectorsWithoutBaseTailwind = selectors.filter(
    selector => !(selector.startsWith('*, ::before, ::after') || selector.startsWith('::backdrop'))
  );

  writeFileSync(cssFile, selectorsWithoutBaseTailwind.join('\n\n') + '\n', {
    encoding: 'utf8',
  });
}
