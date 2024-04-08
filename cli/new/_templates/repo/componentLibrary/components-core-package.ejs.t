---
to: <%= packagesDirName %>/core/package.json
---
{
  "name": "@<%= name %>/core",
  "description": "All React components in the library.",
  "version": "0.0.1",
  "homepage": "<%= homepage %>",
  "repository": {
    "directory": "<%= packagesDirName %>/core",
    "type": "git",
    "url": "<%= homepage %>/<%= packagesDirName %>/core"
  },
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
    },
    "./styles.css": "./dist/styles/index.css",
    "./tailwind.config.cjs": "./tailwind.config.cjs"
  },
  "publishConfig": {
    "access": "public"
  },
  "scripts": {
    "build": "pnpm run clean:dist && pnpm run compileCoreDependencies && pnpm install && pnpm run compile",
    "clean:deps": "del-cli ./node_modules",
    "clean:dist": "del-cli ./dist",
    "compile": "pnpm run /^compile:.*/",
    "compile:cjs": "MODULE_SYSTEM=cjs rollup -c ../../rollup.config.cjs",
    "compile:esm": "rollup -c ../../rollup.config.cjs",
    "compile:types": "tsc --project ./tsconfig.build.json && cts-types build dist/types/esm dist/types/cjs",
    "compileCoreDependencies": "node ../../scripts/compileCoreDependencies.mjs"
  },
  "dependencies": {},
  "peerDependencies": {
    "core-js": "<4",
    "react": "<19",
    "react-dom": "<19"
  },
  "devDependencies": {
    "@types/react": "^18.2.31",
    "@types/react-dom": "^18.2.14",
    "cts-types": "^0.0.6",
    "del-cli": "^5.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
