---
to: tailwind.config.components.cjs
---
const baseConfig = require('./tailwind.config.base.cjs');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: ['./src/*.tsx', '!./src/*.stories.tsx'],
  corePlugins: {
    preflight: false,
  },
};
