---
to: .github/workflow/build-and-publish.yml
---
name: Build and publish

on:
  push:
    branches:
      - main
    tags:
      - v**
  pull_request:
    branches:
      - main

jobs:
  build-and-publish:
    uses: badbatch/repodog/.github/workflows/master-build-and-publish.yml@main
    with:
      package-manager-version: '7.27.0'
    secrets:
      npm_auth_token: ${{ secrets.NPM_AUTH_TOKEN }}