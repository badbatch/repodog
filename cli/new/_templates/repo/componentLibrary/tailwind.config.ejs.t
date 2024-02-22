---
to: tailwind.config.cjs
---
const baseConfig = require('./tailwind.config.base.cjs');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: ['./<%= packagesDirName %>/**/*.tsx'],
};
