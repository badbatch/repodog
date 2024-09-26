---
to: "<%= platform === 'azureDevops' ? 'pipelines/azure-pipeline.yml' : null %>"
---
trigger:
  branches:
    include:
      - main
  tags:
    include:
      - v**

pr:
  - main

resources:
  repositories:
  - repository: repodog
    type: github
    name: badbatch/repodog
    ref: main

jobs:
- template: pipelines/azure-pipeline-template.yml@repodog
  parameters:
    package-manager-version: '9.11.0'
