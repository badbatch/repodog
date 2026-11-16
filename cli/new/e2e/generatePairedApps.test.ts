import { describe, expect, it } from '@jest/globals';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { generateAppOrThrow } from './helpers/generateAppOrThrow.ts';
import { runCommandOrThrow } from './helpers/runCommandOrThrow.ts';
import { validateDotnetAppOrThrow } from './helpers/validateDotnetAppOrThrow.ts';
import { validateNextjsAppOrThrow } from './helpers/validateNextjsAppOrThrow.ts';
import { withAppTestWorkspace } from './helpers/withAppTestWorkspace.ts';

describe('paired application generation', () => {
  it('When the built CLI generates paired apps, then both validate and their Docker browser tests pass', async () => {
    await withAppTestWorkspace(async workspace => {
      // Arrange
      const api = await generateAppOrThrow(workspace, 'dotnet', 'generated-api', 'generated-web');
      const app = await generateAppOrThrow(workspace, 'nextjs', 'generated-web', 'generated-api');

      // Act
      await validateDotnetAppOrThrow(api);
      await validateNextjsAppOrThrow(app);
      await runCommandOrThrow(app, 'pnpm', ['test:e2e:docker']);

      // Assert
      const workflow = await readFile(resolve(api, '.github/workflows/validate.yml'), 'utf8');
      const runner = await readFile(resolve(app, 'scripts/testE2eDocker.ts'), 'utf8');
      expect(workflow).toContain('repodog-e2e/generated-web/.github/workflows/e2e.yml@main');
      expect(runner).toContain('../generated-api');
    });
  });
});
