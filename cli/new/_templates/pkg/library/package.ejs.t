---
to: <%= path %>/package.json
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
  "main": "./dist/cjs/index.cjs",
  "module": "./dist/esm/index.mjs",
  "types": "./dist/types/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/types/index.d.ts",
      "import": "./dist/esm/index.mjs",
      "require": "./dist/cjs/index.cjs"
    }
  },
  "publishConfig": {
    "access": "public"
  },
  "scripts": {
    "build": "<%= packageManager %> run clean:dist && <%= packageManager %> run compile",
    "clean:deps": "del-cli ./node_modules",
    "clean:dist": "del-cli ./dist",
    "compile": "<%= packageManager %> run /^compile:.*/",
    "compile:cjs": "MODULE_SYSTEM=cjs rollup -c ./rollup.config.cjs",
    "compile:esm": "rollup -c ./rollup.config.cjs",
    "compile:types": "tsc --project ./tsconfig.build.json"
  },
  "dependencies": {},
  "peerDependencies": {
    "@babel/runtime": "<8",
    "core-js": "<4"
  },
  "devDependencies": {
    "@jest/globals": "^29.3.1",
    "del-cli": "^5.1.0"
  }
}
