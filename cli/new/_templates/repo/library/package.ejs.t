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
  "main": "./dist/cjs/index.cjs",
  "module": "./dist/esm/index.mjs",
  "types": "./dist/types/cjs/index.d.cts",
  "imports": {
    "#*": "./src/*"
  },
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
    "compile:cjs": "MODULE_SYSTEM=cjs rollup -c ./rollup.config.mjs",
    "compile:esm": "rollup -c ./rollup.config.mjs",
    "compile:types": "tsc --project ./tsconfig.build.json && cts-types build dist/types/esm dist/types/cjs",
    "coverage-generate": "nyc report --reporter=lcov -t coverage --report-dir coverage",
    "coverage-open": "open-cli ./coverage/lcov-report/index.html",
    "cut:changelog": "changelog",
    "installActivateMise": "sh shellScripts/installActivateMise.sh",
    "jest": "COMPILER=swc node --require=suppress-experimental-warnings --experimental-vm-modules node_modules/jest/bin/jest.js",
    "lint": "<%= packageManager %> run /^lint:.*/",
    "lint:code": "eslint . --ext .ts,.cjs",
    "lint:docs": "markdownlint-cli2 --config \".markdownlint.json\" \"**/*.md\" \"!**/node_modules/**\"",
    "prepare": "husky",
    "repodog": "repodog",
    "syncpack": "syncpack format && syncpack list-mismatches && syncpack lint-semver-ranges",
    "test": "del-cli ./coverage && <%= packageManager %> run jest && <%= packageManager %> run coverage-generate",
    "type-check": "tsc --noEmit",
    "validate": "<%= packageManager %> run syncpack && <%= packageManager %> run build && <%= packageManager %> run lint && <%= packageManager %> run type-check && <%= packageManager %> run test"
  },
  "dependencies": {},
  "peerDependencies": {},
  "devDependencies": {
    "@types/node": "^24.2.1",
    "cts-types": "^0.0.10",
    "del-cli": "^6.0.0",
    "generate-changelog": "^1.8.0",
    "husky": "^9.1.7",
    "nyc": "^17.1.0",
    "open-cli": "^8.0.0"
  }
}
