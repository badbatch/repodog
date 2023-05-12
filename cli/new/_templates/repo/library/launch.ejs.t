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
      // "runtimeVersion": "18.13.0",
      "args": [
        "${relativeFile}"
      ],
      "env": {
        "DEBUG": "true",
        "NODE_OPTIONS": "--experimental-vm-modules"
      },
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
