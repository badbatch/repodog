import { describe, expect, it } from '@jest/globals';
import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { generateAppOrThrow } from './helpers/generateAppOrThrow.ts';
import { validateNextjsAppOrThrow } from './helpers/validateNextjsAppOrThrow.ts';
import { withAppTestWorkspace } from './helpers/withAppTestWorkspace.ts';

describe('standalone Next.js generation', () => {
  it('When the built CLI generates a standalone Next.js app, then it passes its own validation without paired tooling', async () => {
    await withAppTestWorkspace(async workspace => {
      // Arrange / Act
      const app = await generateAppOrThrow(workspace, 'nextjs', 'generated-web');
      await validateNextjsAppOrThrow(app);

      // Assert
      const workflow = await readFile(resolve(app, '.github/workflows/validate.yml'), 'utf8');
      const packageJson: unknown = JSON.parse(await readFile(resolve(app, 'package.json'), 'utf8'));

      expect(packageJson).toMatchObject({
        name: 'generated-web',
        repository: { url: 'https://github.com/repodog-e2e/generated-web.git' },
      });

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
      await expect(access(resolve(app, 'compose.e2e.yaml'))).rejects.toThrow();
    });
  });
});
