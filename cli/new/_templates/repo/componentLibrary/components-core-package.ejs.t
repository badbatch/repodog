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
    "compile:cjs": "MODULE_SYSTEM=cjs rollup -c ../../rollup.config.mjs",
    "compile:esm": "rollup -c ../../rollup.config.mjs",
    "compile:types": "tsc --project ./tsconfig.build.json && cts-types build dist/types/esm dist/types/cjs",
    "compileCoreDependencies": "node ../../scripts/compileCoreDependencies.mjs"
  },
  "dependencies": {},
  "peerDependencies": {
    "react": "<20",
    "react-dom": "<20"
  },
  "devDependencies": {
    "@types/react": "^19.1.6",
    "@types/react-dom": "^19.1.5",
    "cts-types": "^0.0.10",
    "del-cli": "^6.0.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  }
}
