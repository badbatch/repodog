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
  "main": "./dist/cjs/index.cjs",
  "module": "./dist/esm/index.mjs",
  "types": "./dist/types/cjs/index.d.cts",
  "exports": {
    ".": {
      "types": {
        "import": "./dist/types/esm/index.d.ts",
        "require": "./dist/types/cjs/index.d.cts"
      },
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
    "compile:cjs": "MODULE_SYSTEM=cjs rollup -c ../../rollup.config.cjs",
    "compile:esm": "rollup -c ../../rollup.config.cjs",
    "compile:types": "tsc --project ./tsconfig.build.json && cts-types build dist/types/esm dist/types/cjs"
  },
  "dependencies": {},
  "peerDependencies": {
    "core-js": "<4"
  },
  "devDependencies": {
    "@jest/globals": "^29.3.1",
    "cts-types": "^0.0.6",
    "del-cli": "^5.1.0"
  }
}
