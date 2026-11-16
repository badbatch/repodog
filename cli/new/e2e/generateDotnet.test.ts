import { describe, expect, it } from '@jest/globals';
import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { generateAppOrThrow } from './helpers/generateAppOrThrow.ts';
import { validateDotnetAppOrThrow } from './helpers/validateDotnetAppOrThrow.ts';
import { withAppTestWorkspace } from './helpers/withAppTestWorkspace.ts';

describe('standalone .NET generation', () => {
  it('When the built CLI generates a standalone .NET app, then it passes its own validation without paired tooling', async () => {
    await withAppTestWorkspace(async workspace => {
      // Arrange / Act
      const app = await generateAppOrThrow(workspace, 'dotnet', 'generated-api');
      await validateDotnetAppOrThrow(app);

      // Assert
      const workflow = await readFile(resolve(app, '.github/workflows/validate.yml'), 'utf8');
      const origin: unknown = JSON.parse(await readFile(resolve(app, '.repodog-origin.json'), 'utf8'));
      expect(workflow).not.toContain('CROSS_REPO_READ_TOKEN');
      expect(workflow).not.toContain('  e2e:');

      expect(origin).toEqual(
        expect.objectContaining({
          commit: expect.any(String),
          ref: expect.any(String),
          repository: expect.any(String),
        }),
      );

      await expect(access(resolve(app, '.repodog-bootstrap.json'))).rejects.toThrow();
      await expect(access(resolve(app, '.git'))).rejects.toThrow();
    });
  });
});
