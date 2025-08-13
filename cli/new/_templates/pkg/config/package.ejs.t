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
  "type": "module",
  "main": "index.mjs",
  "publishConfig": {
    "access": "public"
  },
  "peerDependencies": {}
}
