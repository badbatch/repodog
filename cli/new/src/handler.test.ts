import { jest } from '@jest/globals';
import { shelljsMock } from '@repodog/cli-test-utils';
import {
  Language,
  NewType,
  type PromptOption,
  type QuestionOverride,
  type QuestionOverrides,
  flattenTemplateVariables,
  getPackageManagerFilterCmd,
  getPackageManagerTemporaryCmd,
  typeToSubTypeMap,
} from '@repodog/cli-utils';

const repodogConfig = {
  questionOverrides: {
    new: {
      pkg: {
        library: {
          cli: {
            add: [
              {
                message: 'Is this a good mock?',
                name: 'mock',
                type: 'input',
              },
            ],
          },
        },
      },
    },
  },
  templateVariables: {
    '*': {
      author: 'miami-man',
      homepage: 'https://github.com/badbatch/repodog',
      org: 'repodog',
    },
    new: {
      pkg: {
        library: {
          cli: {
            mainFilename: 'handler',
          },
        },
      },
    },
  },
};

jest.unstable_mockModule('@repodog/cli-postinstall', () => ({
  handler: jest.fn(),
}));

jest.unstable_mockModule('@repodog/cli-setup', () => ({
  handleGlobalConfigSetup: jest.fn(),
}));

jest.unstable_mockModule('@repodog/cli-utils', () => ({
  Language,
  NewType,
  calculateDuration: jest.fn().mockReturnValue('1'),
  enrichQuestions: jest.fn().mockImplementation(value => value),
  flattenTemplateVariables,
  getPackageManager: jest.fn().mockReturnValue('pnpm'),
  getPackageManagerFilterCmd,
  getPackageManagerTemporaryCmd,
  hasGlobalRepodogConfig: jest.fn().mockReturnValue(false),
  isRunWithinProject: jest.fn().mockReturnValue(true),
  isValidNewSubType: jest.fn().mockReturnValue(true),
  isValidNewType: jest.fn().mockReturnValue(true),
  loadRepodogConfig: jest.fn().mockReturnValue(repodogConfig),
  removeEmptyAnswers: jest.fn().mockImplementation(value => value),
  resolveAbsolutePath: jest.fn().mockImplementation(value => `/root/${String(value)}`),
  setVerbose: jest.fn(),
  typeToSubTypeMap,
  verboseLog: jest.fn(),
}));

jest.unstable_mockModule('enquirer', () => ({
  default: {
    // @ts-expect-error PromptOption[] is valid argument, but is being flagged as invalid
    prompt: jest.fn<(typeof import('enquirer'))['prompt']>().mockImplementation((questions: PromptOption[]) => {
      const answers: Record<string, string | number | boolean> = {};

      for (const question of questions) {
        answers[question.name] = `answer to ${question.name}`;
      }

      return Promise.resolve(answers);
    }),
  },
}));

jest.unstable_mockModule('node:fs', () => ({
  existsSync: jest.fn().mockReturnValue(true),
}));

jest.unstable_mockModule('node:path', () => ({
  dirname: jest.fn().mockReturnValue('/root'),
  resolve: jest
    .fn<(typeof import('node:path'))['resolve']>()
    .mockImplementation((...paths) => `${paths[0]!}/${paths[1]!.replaceAll(new RegExp(String.raw`\.\.\/`, 'g'), '')}`),
  sep: jest.fn().mockReturnValue('/'),
}));

jest.unstable_mockModule('shelljs', shelljsMock);

jest.unstable_mockModule('./utils/compileAdditionalTemplateOverrides.ts', () => ({
  compileAdditionalTemplateOverrides: jest.fn(),
}));

jest.unstable_mockModule('./utils/conditionallyChangeCwd.ts', () => ({
  conditionallyChangeCwd: jest.fn(),
}));

jest.unstable_mockModule('./utils/executeHygen.ts', () => ({
  executeHygen: jest.fn(),
}));

jest.unstable_mockModule('./utils/getLeafAdditionalTemplatesPath.ts', () => ({
  // eslint-disable-next-line unicorn/no-useless-undefined
  getLeafAdditionalTemplatesPath: jest.fn().mockReturnValue(undefined),
}));

jest.unstable_mockModule('./utils/loadQuestions.ts', () => ({
  loadQuestions: jest
    .fn<(typeof import('./utils/loadQuestions.ts'))['loadQuestions']>()
    .mockImplementation((_internalTypePath, _configTypePath, questionOverrides) => [
      {
        message: 'What is question 1',
        name: 'question1',
        type: 'input',
      },
      {
        message: 'What is question 2',
        name: 'question2',
        type: 'input',
      },
      {
        message: 'What is question 3',
        name: 'question3',
        type: 'input',
      },
      ...(((questionOverrides!.new!.pkg as QuestionOverrides).library as QuestionOverrides).cli as QuestionOverride)
        .add!,
    ]),
}));

const { handler: postinstallHandler } = jest.mocked(await import('@repodog/cli-postinstall'));
const { handleGlobalConfigSetup } = jest.mocked(await import('@repodog/cli-setup'));

const { getPackageManager, isRunWithinProject, isValidNewSubType, isValidNewType, loadRepodogConfig } = jest.mocked(
  await import('@repodog/cli-utils'),
);

const shelljs = jest.mocked(await import('shelljs')).default;
const { loadQuestions } = jest.mocked(await import('./utils/loadQuestions.ts'));
const { executeHygen } = jest.mocked(await import('./utils/executeHygen.ts'));
const { getLeafAdditionalTemplatesPath } = jest.mocked(await import('./utils/getLeafAdditionalTemplatesPath.ts'));
const { handler } = await import('./handler.ts');

describe('handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when isRunWithinProject is false and hasGlobalRepodogConfig is false', () => {
    beforeEach(() => {
      isRunWithinProject.mockReturnValueOnce(false);
    });

    it('should execute handleGlobalConfigSetup', async () => {
      await handler({ subtype: 'bravo', type: 'alpha' });
      expect(handleGlobalConfigSetup).toHaveBeenCalledWith();
    });
  });

  describe('when given invalid type', () => {
    beforeEach(() => {
      isValidNewType.mockReturnValueOnce(false);
    });

    it('should throw an error', async () => {
      await handler({ subtype: 'library', type: 'blah' });
      expect(shelljs.echo).toHaveBeenCalledWith(expect.stringContaining('Expected type to be a valid new type'));
    });

    it('should exit with a code of 1', async () => {
      await handler({ subtype: 'library', type: 'blah' });
      expect(shelljs.exit).toHaveBeenCalledWith(1);
    });
  });

  describe('when given invalid subtype', () => {
    beforeEach(() => {
      isValidNewSubType.mockReturnValueOnce(false);
    });

    it('should throw an error', async () => {
      await handler({ subtype: 'blah', type: 'pkg' });

      expect(shelljs.echo).toHaveBeenCalledWith(
        expect.stringContaining('Error: Expected subtype to be a valid new subtype: component, config, library'),
      );
    });

    it('should exit with a code of 1', async () => {
      await handler({ subtype: 'blah', type: 'pkg' });
      expect(shelljs.exit).toHaveBeenCalledWith(1);
    });
  });

  describe('when given valid arguments', () => {
    describe('when the package manager can be derived', () => {
      it('should load the questions for the specified new type and customTypePath', async () => {
        await handler({ 'custom-type-path': 'cli', subtype: 'library', type: 'pkg' });

        expect(loadQuestions).toHaveBeenCalledWith(
          ['pkg', 'library'],
          ['new', 'pkg', 'library', 'cli'],
          repodogConfig.questionOverrides,
        );
      });

      it('should execute hygen with the specified options and base type path', async () => {
        await handler({ 'custom-type-path': 'cli', subtype: 'library', type: 'pkg' });

        expect(executeHygen).toHaveBeenCalledWith(
          '/root/_templates',
          '/root/node_modules/.bin/hygen',
          ['pkg', 'library'],
          {
            author: 'miami-man',
            excludeTypesFile: false,
            homepage: 'https://github.com/badbatch/repodog',
            language: 'javascript',
            mainFilename: 'handler',
            mock: 'answer to mock',
            newSubType: 'library',
            newType: 'pkg',
            org: 'repodog',
            packageManager: 'pnpm',
            packageManagerFilterCmd: '--filter',
            packageManagerTemporaryCmd: 'pnpm dlx',
            question1: 'answer to question1',
            question2: 'answer to question2',
            question3: 'answer to question3',
          },
        );
      });

      it('should execute postinstall handler with the correct arguments', async () => {
        await handler({ 'custom-type-path': 'cli', subtype: 'library', type: 'repo' });
        expect(postinstallHandler).toHaveBeenCalledWith({ subtype: 'library', type: 'repo', verbose: false });
      });

      it('should exit with a code of 0', async () => {
        await handler({ subtype: 'library', type: 'pkg' });
        expect(shelljs.exit).toHaveBeenCalledWith(0);
      });

      describe('when there are template overrides for the specified new type', () => {
        beforeEach(() => {
          loadRepodogConfig.mockReturnValueOnce({
            ...repodogConfig,
            additionalTemplatesPath: '../overrides/_templates',
          });

          getLeafAdditionalTemplatesPath.mockReturnValueOnce('leaf/template/path');
        });

        it('should execute hygen again with the template overrides path and specified options and base type path', async () => {
          await handler({ 'custom-type-path': 'cli', subtype: 'library', type: 'pkg' });

          expect(executeHygen.mock.calls[1]).toEqual([
            '../overrides/_templates',
            '/root/node_modules/.bin/hygen',
            ['new', 'pkg', 'library', 'cli'],
            {
              author: 'miami-man',
              excludeTypesFile: false,
              homepage: 'https://github.com/badbatch/repodog',
              language: 'javascript',
              mainFilename: 'handler',
              mock: 'answer to mock',
              newSubType: 'library',
              newType: 'pkg',
              org: 'repodog',
              packageManager: 'pnpm',
              packageManagerFilterCmd: '--filter',
              packageManagerTemporaryCmd: 'pnpm dlx',
              question1: 'answer to question1',
              question2: 'answer to question2',
              question3: 'answer to question3',
            },
          ]);
        });

        describe('when exclude-builtin-templates is true', () => {
          it('should not execute hygen the first time', async () => {
            await handler({
              'custom-type-path': 'cli',
              'exclude-builtin-templates': true,
              subtype: 'library',
              type: 'pkg',
            });

            expect(executeHygen.mock.calls[0]).toEqual([
              '../overrides/_templates',
              '/root/node_modules/.bin/hygen',
              ['new', 'pkg', 'library', 'cli'],
              {
                author: 'miami-man',
                excludeTypesFile: false,
                homepage: 'https://github.com/badbatch/repodog',
                language: 'javascript',
                mainFilename: 'handler',
                mock: 'answer to mock',
                newSubType: 'library',
                newType: 'pkg',
                org: 'repodog',
                packageManager: 'pnpm',
                packageManagerFilterCmd: '--filter',
                packageManagerTemporaryCmd: 'pnpm dlx',
                question1: 'answer to question1',
                question2: 'answer to question2',
                question3: 'answer to question3',
              },
            ]);
          });
        });
      });
    });

    describe('when the package manager cannot be derived', () => {
      beforeEach(() => {
        getPackageManager.mockReturnValueOnce(undefined); // eslint-disable-line unicorn/no-useless-undefined
      });

      it('should throw an error', async () => {
        await handler({ subtype: 'library', type: 'pkg' });

        expect(shelljs.echo).toHaveBeenCalledWith(
          expect.stringContaining('Error: Could not derive the package manager'),
        );
      });

      it('should exit with a code of 1', async () => {
        await handler({ subtype: 'library', type: 'pkg' });
        expect(shelljs.exit).toHaveBeenCalledWith(1);
      });
    });
  });
});
