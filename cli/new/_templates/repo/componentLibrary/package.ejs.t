---
to: package.json
sh: "<%= packageManager %> install && <%= packageManager %> add -D @repodog/cli @repodog/commitlint-config @repodog/eslint-config @repodog/eslint-config-jest @repodog/eslint-config-react @repodog/jest-config @repodog/markdownlint-config @repodog/prettier-config @repodog/rollup-config @repodog/storybook-config @repodog/swc-config @repodog/syncpack-config @repodog/ts-config"
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
    "node": "^20.10.0",
    "pnpm": "^8.11.0"
  },
  "scripts": {
    "build": "pnpm run build:rest && pnpm run build:core",
    "build-storybook": "storybook build",
    "build:core": "<%= packageManager %> <%= packageManagerFilterCmd %> \"./<%= packagesDirName %>/core\" run build",
    "build:rest": "<%= packageManager %> <%= packageManagerFilterCmd %> \"./components/!(core)/**\" run build",
    "clean:deps": "pnpm run -r clean:deps && del-cli ./node_modules",
    "clean:deps": "<%= packageManager %> run -r clean:deps && del-cli ./node_modules",
    "clean:dist": "<%= packageManager %> run -r clean:dist",
    "commit": "commit",
    "cut:changelog": "changelog",
    "cut:post-version": "<%= packageManager %> run build",
    "lint": "pnpm run /^lint:.*/",
    "lint:code": "eslint . --ext .ts,.tsx,.cjs",
    "lint:docs": "markdownlint-cli2 --config \".markdownlint.json\" \"**/*.md\" \"!**/node_modules/**\"",
    "prepare": "husky",
    "repodog": "repodog",
    "storybook": "storybook dev -p 6006",
    "syncpack": "syncpack format && syncpack list-mismatches && syncpack lint-semver-ranges",
    "test": "COMPILER=swc node --require=suppress-experimental-warnings --experimental-vm-modules node_modules/jest/bin/jest.js",
    "type-check": "tsc --noEmit",
    "validate": "<%= packageManager %> run syncpack && <%= packageManager %> run build && <%= packageManager %> run lint && <%= packageManager %> run type-check && <%= packageManager %> run test && <%= packageManager %> run build-storybook"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "autoprefixer": "^10.4.17",
    "core-js": "^3.36.0",
    "del-cli": "^5.1.0",
    "generate-changelog": "^1.8.0",
    "husky": "^9.0.11",
    "postcss": "^8.4.35",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss": "^3.4.1"
  }
}
