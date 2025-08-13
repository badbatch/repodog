---
to: scripts/stripBaseTailwindCss.mjs
---
import css from 'css';
import { isEqual } from 'lodash-es';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const cwd = process.cwd();
const cssFile = resolve(cwd, 'dist', 'styles', 'index.css');
const content = readFileSync(cssFile, { encoding: 'utf8' });
const parsed = css.parse(content);
const selectorGroupsToRemove = [['*', '::before', '::after'], ['::backdrop']];

parsed.stylesheet.rules = parsed.stylesheet.rules.reduce((acc, rule) => {
  if (selectorGroupsToRemove.some(selectorGroup => isEqual(selectorGroup, rule.selectors))) {
    return acc;
  }

  return [...acc, rule];
}, []);

writeFileSync(cssFile, css.stringify(parsed) + '\n', {
  encoding: 'utf8',
});
