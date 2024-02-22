---
to: "<%= typeof overrideTemplate_package_ejs_t !== 'undefined' ? null : `${path}/package.json` %>"
sh: "<%= packageManager %> install"
---
{
  "name": "@<%= org %>/<%= name %>",
  "description": "<%= desc %>",
  "version": "0.0.1",
  "author": "<%= author %>",
  "license": "MIT",
  "homepage": "<%= homepage %>",
  "repository": {
    "directory": "<%= path %>",
    "type": "git",
    "url": "<%= homepage %>/<%= path %>"
  },
  "bugs": "<%= homepage %>/issues",
  "main": "index.cjs",
  "publishConfig": {
    "access": "public"
  },
  "peerDependencies": {}
}
