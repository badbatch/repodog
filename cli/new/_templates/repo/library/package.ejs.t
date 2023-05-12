---
to: package.json
sh: "<%= packageManager %> install && <%= packageManager %> add -D @repodog/cli @repodog/babel-config @repodog/commitlint-config @repodog/eslint-config @repodog/jest-config @repodog/markdownlint-config @repodog/prettier-config @repodog/rollup-config @repodog/syncpack-config @repodog/ts-config && <%= packageManager %> run repodog -- postinstall <%= newType %> <%= newSubType %>"
---
{
  "name": "<%= name %>",
  "description": "<%= desc %>",
  "version": "0.0.1",
  "author": "<%= author %>",
  "license": "MIT",
  "homepage": "<%= homepage %>",
  "repository": {
    "type": "git",
    "url": "<%= homepage %>"
  },
  "bugs": "<%= homepage %>/issues",
  "type": "module",
  "main": "./dist/main/index.mjs",
  "types": "./dist/types/index.d.ts",
  "publishConfig": {
    "access": "public"
  },
  "scripts": {
    "build": "pnpm run clean:dist && pnpm run compile",
    "clean:deps": "del-cli ./node_modules",
    "clean:dist": "del-cli ./dist",
    "commit": "commit",
    "compile": "pnpm run /^compile:.*/",
    "compile:main": "rollup -c ./rollup.config.cjs",
    "compile:types": "tsc --project ./tsconfig.json",
    "cut:changelog": "changelog",
    "cut:post-version": "pnpm run build",
    "lint": "eslint . --ext .ts,.cjs",
    "repodog": "repodog",
    "syncpack": "syncpack",
    "test": "node --require=suppress-experimental-warnings --experimental-vm-modules node_modules/jest/bin/jest.js",
    "type-check": "tsc --noEmit",
    "validate": "syncpack format && syncpack lint-semver-ranges && pnpm run build && pnpm run lint && pnpm run type-check && pnpm run test"
  },
  "dependencies": {},
  "peerDependencies": {
    "@babel/runtime": "<8",
    "core-js": "<4"
  },
  "devDependencies": {
    "@types/node": "^18.11.18",
    "del-cli": "^3.0.0"
  }
}
