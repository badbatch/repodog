---
to: package.json
sh: "<%= packageManager %> install && <%= packageManager %> add -D @repodog/cli @repodog/babel-config @repodog/commitlint-config @repodog/eslint-config @repodog/eslint-config-jest @repodog/jest-config @repodog/markdownlint-config @repodog/prettier-config @repodog/rollup-config @repodog/syncpack-config @repodog/ts-config && <%= packageManager %> run repodog postinstall <%= newType %> <%= newSubType %>"
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
    "build": "pnpm run clean:dist && pnpm run compile",
    "clean:deps": "del-cli ./node_modules",
    "clean:dist": "del-cli ./dist",
    "commit": "commit",
    "compile": "pnpm run /^compile:.*/",
    "compile:cjs": "MODULE_SYSTEM=cjs rollup -c ./rollup.config.cjs",
    "compile:esm": "rollup -c ./rollup.config.cjs",
    "compile:types": "tsc --project ./tsconfig.build.json",
    "cut:changelog": "changelog",
    "cut:post-version": "pnpm run build",
    "lint": "eslint . --ext .ts,.cjs",
    "repodog": "repodog",
    "syncpack": "syncpack format && syncpack list-mismatches && syncpack lint-semver-ranges",
    "test": "node --require=suppress-experimental-warnings --experimental-vm-modules node_modules/jest/bin/jest.js",
    "type-check": "tsc --noEmit",
    "validate": "npm run syncpack && pnpm run build && pnpm run lint && pnpm run type-check && pnpm run test"
  },
  "dependencies": {},
  "peerDependencies": {
    "@babel/runtime": "<8",
    "core-js": "<4",
    "lodash-es": "<5"
  },
  "devDependencies": {
    "@types/lodash-es": "^4.14.191",
    "@types/node": "^18.11.18",
    "core-js": "^3.27.2",
    "del-cli": "^3.0.0",
    "generate-changelog": "^1.8.0",
    "lodash-es": "^4.17.21"
  }
}
