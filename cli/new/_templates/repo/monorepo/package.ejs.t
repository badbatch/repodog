---
to: package.json
sh: "<%= packageManager %> install && <%= packageManager %> add -D @repodog/cli @repodog/commitlint-config @repodog/eslint-config @repodog/eslint-config-jest @repodog/jest-config @repodog/markdownlint-config @repodog/prettier-config @repodog/rollup-config @repodog/swc-config @repodog/syncpack-config @repodog/ts-config"
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
  "engines": {
    "node": "^22",
    "pnpm": "^10"
  },
  "scripts": {
    "build": "<%= packageManager %> run -r build",
    "clean:deps": "<%= packageManager %> run -r clean:deps && del-cli ./node_modules",
    "clean:dist": "<%= packageManager %> run -r clean:dist",
    "cut:changelog": "changelog",
    "installActivateMise": "sh shellScripts/installActivateMise.sh",
    "lint": "<%= packageManager %> run /^lint:.*/",
    "lint:code": "eslint .",
    "lint:docs": "markdownlint-cli2 --config \".markdownlint.json\" \"**/*.md\" \"!**/node_modules/**\"",
    "new:library": "<%= packageManager %> run repodog new pkg library",
    "prepare": "husky",
    "repodog": "repodog",
    "syncpack": "syncpack format && syncpack list-mismatches && syncpack lint-semver-ranges",
    "test": "COMPILER=swc node --require=suppress-experimental-warnings --experimental-vm-modules node_modules/jest/bin/jest.js",
    "type-check": "tsc --noEmit",
    "validate": "<%= packageManager %> run syncpack && <%= packageManager %> run build && <%= packageManager %> run lint && <%= packageManager %> run type-check && <%= packageManager %> run test"
  },
  "devDependencies": {
    "@types/node": "^24.2.1",
    "del-cli": "^6.0.0",
    "generate-changelog": "^1.8.0",
    "husky": "^9.1.7"
  }
}
