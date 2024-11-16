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
    },
    "./styles.css": "./dist/styles/index.css"
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
    "compile:docs": "node ../../scripts/generateReadme.mjs",
    "compile:esm": "rollup -c ../../rollup.config.cjs",
    "compile:styles": "tailwindcss -o ./dist/styles/index.css -c ../../tailwind.config.components.cjs && node ../../scripts/stripBaseTailwindCss.mjs",
    "compile:types": "tsc --project ./tsconfig.build.json && cts-types build dist/types/esm dist/types/cjs"
  },
  "dependencies": {
    "classnames": "^2.5.1"
  },
  "peerDependencies": {
    "react": "<19",
    "react-dom": "<19"
  },
  "devDependencies": {
    "@jest/globals": "^29.7.0",
    "@types/react": "^18.3.9",
    "@types/react-dom": "^18.3.0",
    "cts-types": "^0.0.6",
    "del-cli": "^5.1.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  }
}
