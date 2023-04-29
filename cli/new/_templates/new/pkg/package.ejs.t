---
to: <%= path %>/package.json
sh: "<%= packageManager %> install"
---
{
  "name": "@<%= org %>/<%= name %>",
  "type": "module",
  "version": "0.0.1",
  "description": "<%= desc %>",
  "homepage": "<%= homepage %>",
  "bugs": {
    "url": "<%= homepage %>/issues"
  },
  "repository": {
    "directory": "<%= path %>",
    "type": "git",
    "url": "<%= homepage %>/<%= path %>"
  },
  "license": "MIT",
  "author": "<%= author %>",
  "main": "./dist/main/index.mjs",
  "types": "./dist/types/index.d.ts",
  "publishConfig": {
    "access": "public"
  },
  "scripts": {
    "build": "pnpm run clean:dist && pnpm run compile",
    "clean:deps": "del-cli ./node_modules",
    "clean:dist": "del-cli ./dist",
    "compile": "pnpm run /^compile:.*/",
    "compile:main": "rollup -c ../../rollup.config.cjs",
    "compile:types": "tsc --project ./tsconfig.build.json"
  },
  "dependencies": {},
  "peerDependencies": {
    "@babel/runtime": "< 8",
    "core-js": "< 4"
  },
  "devDependencies": {
    "@jest/globals": "^29.3.1",
    "del-cli": "^3.0.0"
  }
}
