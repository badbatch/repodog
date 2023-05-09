---
to: babel.config.cjs
---
const config = require('@repodog/babel-config');

module.exports = api => ({ ...config(api) });
