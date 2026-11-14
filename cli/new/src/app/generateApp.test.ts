import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import * as cliUtils from '@repodog/cli-utils';
import { access } from 'node:fs/promises';
import { resolve } from 'node:path';

const verboseLog = jest.fn<(message: string) => void>();
const loadConfig = jest.fn<() => Partial<cliUtils.RepodogConfig>>();
const prompt = jest.fn<() => Promise<Record<string, string>>>();
const download = jest.fn<(source: cliUtils.AppBootstrapSource, destination: string) => Promise<string>>();
const materialize = jest.fn<(...args: unknown[]) => Promise<void>>();

jest.unstable_mockModule('@repodog/cli-utils', () => ({ ...cliUtils, loadRepodogConfig: loadConfig, verboseLog }));
jest.unstable_mockModule('enquirer', () => ({ default: { prompt } }));
jest.unstable_mockModule('./downloadApp.ts', () => ({ downloadApp: download }));
jest.unstable_mockModule('./materializeApp/materializeApp.ts', () => ({ materializeApp: materialize }));

const { generateApp } = await import('./generateApp.ts');

describe('generateApp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    loadConfig.mockReturnValue({});

    prompt.mockResolvedValue({
      counterpartRepository: 'sample-api',
      description: 'Sample app',
      name: 'sample-ui',
      owner: 'example',
    });

    download.mockResolvedValue('resolved-commit');
    materialize.mockResolvedValue(undefined);
  });

  it('When an app is requested, then its source revision and derived project values reach the manifest generator', async () => {
    // Arrange / Act
    await generateApp({ subtype: 'nextjs', type: 'app' });

    // Assert
    expect(download).toHaveBeenCalledWith(
      { ref: 'main', repository: 'badbatch/repodog-nextjs-kickstarter' },
      expect.any(String),
    );

    expect(materialize).toHaveBeenCalledWith(
      expect.any(String),
      resolve('sample-ui'),
      expect.objectContaining({
        configPrefix: 'SAMPLE_UI_',
        counterpartPath: '../sample-api',
        namespace: 'SampleUi',
        repository: 'example/sample-ui',
      }),
      { commit: 'resolved-commit', ref: 'main', repository: 'badbatch/repodog-nextjs-kickstarter' },
    );

    const temporary = download.mock.calls[0]![1];
    await expect(access(temporary)).rejects.toThrow();
  });

  it('When configuration supplies a source and project defaults, then they override the built-in values', async () => {
    // Arrange
    loadConfig.mockReturnValue({
      appBootstraps: { dotnet: { ref: 'v2.0.0', repository: 'custom/api-starter' } },
      templateVariables: { new: { app: { dotnet: { configPrefix: 'CUSTOM_', namespace: 'Custom.Api' } } } },
    });

    // Act
    await generateApp({ subtype: 'dotnet', type: 'app' });

    // Assert
    expect(download).toHaveBeenCalledWith({ ref: 'v2.0.0', repository: 'custom/api-starter' }, expect.any(String));

    expect(materialize).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      expect.objectContaining({ configPrefix: 'CUSTOM_', namespace: 'Custom.Api' }),
      expect.any(Object),
    );
  });

  it.each(['', ' '.repeat(3)])(
    'When the counterpart is blank (%j), then the application is generated without pairing setup',
    async counterpartRepository => {
      // Arrange
      prompt.mockResolvedValue({
        counterpartRepository,
        description: 'Standalone',
        name: 'standalone',
        owner: 'example',
      });

      // Act
      await generateApp({ subtype: 'nextjs', type: 'app' });

      // Assert
      expect(materialize).toHaveBeenCalledWith(
        expect.any(String),
        resolve('standalone'),
        expect.objectContaining({ counterpartPath: '', counterpartRepository: '' }),
        expect.any(Object),
      );

      expect(verboseLog).not.toHaveBeenCalledWith(expect.stringContaining('CROSS_REPO_READ_TOKEN'));
    },
  );

  it('When the counterpart answer is omitted, then the application still generates', async () => {
    // Arrange
    prompt.mockResolvedValue({ description: 'Standalone', name: 'standalone', owner: 'example' });

    // Act
    await generateApp({ subtype: 'dotnet', type: 'app' });

    // Assert
    expect(materialize).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      expect.objectContaining({ counterpartRepository: '' }),
      expect.any(Object),
    );
  });

  it('When the application name escapes its destination, then no source is downloaded', async () => {
    // Arrange
    prompt.mockResolvedValue({ name: '../existing' });

    // Act / Assert
    await expect(generateApp({ subtype: 'nextjs', type: 'app' })).rejects.toThrow('Application names');
    expect(download).not.toHaveBeenCalled();
  });

  it('When downloading fails, then temporary source files are cleaned up and generation is skipped', async () => {
    // Arrange
    download.mockRejectedValue(new Error('Source unavailable'));

    // Act / Assert
    await expect(generateApp({ subtype: 'nextjs', type: 'app' })).rejects.toThrow('Source unavailable');
    expect(materialize).not.toHaveBeenCalled();
    const temporary = download.mock.calls[0]![1];
    await expect(access(temporary)).rejects.toThrow();
  });
});
