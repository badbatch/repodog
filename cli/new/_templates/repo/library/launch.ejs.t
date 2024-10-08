---
to: .vscode/launch.json
---
{
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Jest - current file",
      "program": "${workspaceFolder}/node_modules/jest/bin/jest",
      "runtimeVersion": "20.17.0",
      "args": [
        "${relativeFile}"
      ],
      "env": {
        "COMPILER": "swc",
        "DEBUG": "true",
        "NODE_OPTIONS": "--experimental-vm-modules"
      },
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
