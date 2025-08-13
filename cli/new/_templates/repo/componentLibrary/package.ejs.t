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
    "node": "^22",
    "pnpm": "^10"
  },
  "scripts": {
    "build": "pnpm run build:rest && pnpm run build:core",
    "build-storybook": "storybook build",
    "build:core": "<%= packageManager %> <%= packageManagerFilterCmd %> \"./<%= packagesDirName %>/core\" run build",
    "build:core:prod": "NODE_ENV=production <%= packageManager %> run build:core",
    "build:rest": "<%= packageManager %> <%= packageManagerFilterCmd %> \"./components/!(core)/**\" run build",
    "build:rest:prod": "NODE_ENV=production <%= packageManager %> run build:rest",
    "clean:deps": "pnpm run -r clean:deps && del-cli ./node_modules",
    "clean:deps": "<%= packageManager %> run -r clean:deps && del-cli ./node_modules",
    "clean:dist": "<%= packageManager %> run -r clean:dist",
    "coverage-generate": "nyc report --reporter=lcov -t coverage --report-dir coverage && open ./coverage/lcov-report/index.html",
    "coverage-merge": "istanbul-merge --out coverage/coverage.json coverage/unit/coverage-final.json coverage/storybook/coverage-storybook.json",
    "cut:changelog": "changelog",
    "installActivateMise": "sh shellScripts/installActivateMise.sh",
    "lint": "<%= packageManager %> run /^lint:.*/",
    "lint:code": "eslint .",
    "lint:docs": "markdownlint-cli2 --config \".markdownlint.json\" \"**/*.md\" \"!**/node_modules/**\"",
    "new:component": "<%= packageManager %> run repodog new pkg component",
    "new:library": "<%= packageManager %> run repodog new pkg library",
    "prepare": "husky",
    "repodog": "repodog",
    "storybook": "storybook dev -p 6006",
    "syncpack": "syncpack format && syncpack list-mismatches && syncpack lint-semver-ranges",
    "test": "del-cli ./coverage && <%= packageManager %> run /^test:.*/ && <%= packageManager %> run coverage-merge && <%= packageManager %> run coverage-generate",
    "test-axe": "axe-storybook",
    "test:storybook": "concurrently --kill-others --success first \"serve ./storybook-static\" \"wait-on tcp:3000 && test-storybook --url http://localhost:3000 --coverage --coverageDirectory coverage/storybook\"",
    "test:unit": "COMPILER=swc node --require=suppress-experimental-warnings --experimental-vm-modules node_modules/jest/bin/jest.js --coverageDirectory coverage/unit",
    "type-check": "tsc --noEmit",
    "validate": "<%= packageManager %> run syncpack && <%= packageManager %> run build:rest:prod && <%= packageManager %> run build:core:prod && <%= packageManager %> run lint && <%= packageManager %> run type-check && <%= packageManager %> run build-storybook && <%= packageManager %> run test && <%= packageManager %> run test-axe"
  },
  "devDependencies": {
    "@types/node": "^24.2.1",
    "autoprefixer": "^10.4.21",
    "concurrently": "^9.2.0",
    "css": "^3.0.0",
    "del-cli": "^6.0.0",
    "generate-changelog": "^1.8.0",
    "husky": "^9.1.7",
    "istanbul-merge": "^2.0.0",
    "lodash-es": "^4.17.21",
    "nyc": "^17.1.0",
    "postcss": "^8.5.6",
    "react": "^19.1.0",
    "react-docgen-typescript": "^2.4.0",
    "react-docgen-typescript-markdown-render": "^0.2.5",
    "react-dom": "^19.1.0",
    "serve": "^14.2.4",
    "shelljs": "^0.10.0",
    "tailwindcss": "^4.1.11",
    "wait-on": "^8.0.4"
  }
}
