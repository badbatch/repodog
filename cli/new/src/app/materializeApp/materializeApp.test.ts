import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { access, mkdir, mkdtemp, readFile, readdir, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { type BootstrapManifest } from '../types.ts';
import { materializeApp } from './materializeApp.ts';

const origin = { commit: 'abc123', ref: 'v1.0.0', repository: 'owner/starter' };
let root: string;
let source: string;
let destination: string;
let manifest: BootstrapManifest;

const saveManifest = async (): Promise<void> => {
  await writeFile(resolve(source, '.repodog-bootstrap.json'), JSON.stringify(manifest));
};

describe('materializeApp', () => {
  beforeEach(async () => {
    root = await mkdtemp(resolve(tmpdir(), 'repodog-app-test-'));
    source = resolve(root, 'source');
    destination = resolve(root, 'application');
    await mkdir(source);
    await writeFile(resolve(source, 'Starter.txt'), 'Hello Starter');

    manifest = {
      exclude: [],
      files: ['Starter.txt'],
      renamePaths: [{ from: 'Starter.txt', to: '{{name}}.txt' }],
      replacements: [{ from: 'Starter', to: '{{name}}' }],
      version: 1,
    };

    await saveManifest();
  });

  afterEach(async () => {
    await rm(root, { force: true, recursive: true });
  });

  it('When an app is generated, then files are renamed, values stay literal and the source revision is recorded', async () => {
    // Arrange
    await mkdir(resolve(source, '.git'));
    await writeFile(resolve(source, '.git/config'), 'source history');
    const binary = Buffer.from([0, 255, 128]);
    await writeFile(resolve(source, 'asset.bin'), binary);

    // Act
    await materializeApp(source, destination, { name: '$&-app' }, origin);

    // Assert
    await expect(readFile(resolve(destination, '$&-app.txt'), 'utf8')).resolves.toBe('Hello $&-app');
    await expect(readFile(resolve(destination, 'asset.bin'))).resolves.toEqual(binary);
    const metadata: unknown = JSON.parse(await readFile(resolve(destination, '.repodog-origin.json'), 'utf8'));
    expect(metadata).toEqual(origin);
    await expect(access(resolve(destination, '.git'))).rejects.toThrow();
    await expect(access(resolve(destination, '.repodog-bootstrap.json'))).rejects.toThrow();
  });

  it('When a destination already exists, then its existing files are preserved', async () => {
    // Arrange
    await mkdir(destination);
    await writeFile(resolve(destination, 'keep.txt'), 'existing content');

    // Act / Assert
    await expect(materializeApp(source, destination, { name: 'new-app' }, origin)).rejects.toThrow();
    await expect(readFile(resolve(destination, 'keep.txt'), 'utf8')).resolves.toBe('existing content');
    await expect(access(resolve(destination, 'new-app.txt'))).rejects.toThrow();
  });

  it('When a manifest escapes the application directory, then generation fails without writing a destination', async () => {
    // Arrange
    manifest.renamePaths = [{ from: 'Starter.txt', to: '../escaped.txt' }];
    await saveManifest();

    // Act / Assert
    await expect(materializeApp(source, destination, { name: 'new-app' }, origin)).rejects.toThrow('stay inside');
    await expect(access(destination)).rejects.toThrow();
    await expect(access(resolve(root, 'escaped.txt'))).rejects.toThrow();
  });

  it('When a required variable is missing, then generation fails before creating the destination', async () => {
    // Arrange / Act / Assert
    await expect(materializeApp(source, destination, {}, origin)).rejects.toThrow('Missing bootstrap variable: name');
    await expect(access(destination)).rejects.toThrow();
  });

  it('When a manifest version is unsupported, then generation fails before creating the destination', async () => {
    // Arrange
    await writeFile(resolve(source, '.repodog-bootstrap.json'), JSON.stringify({ ...manifest, version: 2 }));

    // Act / Assert
    await expect(materializeApp(source, destination, { name: 'new-app' }, origin)).rejects.toThrow('version 1');
    await expect(access(destination)).rejects.toThrow();
  });

  it('When a manifest excludes a directory, then its files are omitted', async () => {
    // Arrange
    await mkdir(resolve(source, 'private'));
    await writeFile(resolve(source, 'private/secret.txt'), 'excluded');
    manifest.exclude = ['private'];
    await saveManifest();

    // Act
    await materializeApp(source, destination, { name: 'new-app' }, origin);

    // Assert
    await expect(access(resolve(destination, 'private'))).rejects.toThrow();
  });

  it('When a source contains a symbolic link, then generation refuses to follow it', async () => {
    // Arrange
    await symlink(resolve(source, 'Starter.txt'), resolve(source, 'link.txt'));

    // Act / Assert
    await expect(materializeApp(source, destination, { name: 'new-app' }, origin)).rejects.toThrow('symbolic links');
    await expect(access(destination)).rejects.toThrow();
  });

  it('When a JSON value includes quotes and replacement characters, then its generated value remains valid', async () => {
    // Arrange
    await writeFile(resolve(source, 'Starter.txt'), '{"description": "original"}');
    manifest.replacements = [{ from: '"original"', to: '{{description|json}}' }];
    await saveManifest();

    // Act
    await materializeApp(source, destination, { description: 'A "quoted" $& value', name: 'new-app' }, origin);

    // Assert
    const generated: unknown = JSON.parse(await readFile(resolve(destination, 'new-app.txt'), 'utf8'));
    expect(generated).toEqual({ description: 'A "quoted" $& value' });
  });

  it.each([
    { counterpart: '', expectedFiles: ['.repodog-origin.json', 'new-app.txt'], expectedText: 'Standalone new-app' },
    {
      counterpart: 'api',
      expectedFiles: ['.repodog-origin.json', 'new-app.txt', 'paired.txt'],
      expectedText: 'Hello new-app',
    },
  ])(
    'When the optional counterpart is "$counterpart", then files and configuration match that choice',
    async ({ counterpart, expectedFiles, expectedText }) => {
      // Arrange
      await writeFile(resolve(source, 'paired.txt'), 'integration');
      manifest.files.push('paired.txt');

      manifest.whenMissing = {
        counterpartRepository: {
          exclude: ['paired.txt'],
          fileReplacements: [{ file: 'Starter.txt', from: 'Hello ', to: 'Standalone ' }],
        },
      };

      await saveManifest();

      // Act
      await materializeApp(source, destination, { counterpartRepository: counterpart, name: 'new-app' }, origin);

      // Assert
      await expect(readFile(resolve(destination, 'new-app.txt'), 'utf8')).resolves.toBe(expectedText);
      const files = await readdir(destination);
      expect(files).toHaveLength(expectedFiles.length);
      expect(files).toEqual(expect.arrayContaining(expectedFiles));
    },
  );
});
