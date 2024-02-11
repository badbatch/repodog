import { jest } from '@jest/globals';
import { shelljsMock } from '@repodog/cli-test-utils';
import {
  Language,
  type PromptOption,
  type QuestionOverride,
  type QuestionOverrides,
  flattenTemplateVariables,
  getPackageManagerTemporaryCmd,
} from '@repodog/cli-utils';

jest.unstable_mockModule('shelljs', shelljsMock);

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
      author: 'Dylan Aubrey',
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
  calculateDuration: jest.fn().mockReturnValue('1'),
  enrichQuestions: jest.fn().mockImplementation(value => value),
  flattenTemplateVariables,
  getPackageManager: jest.fn().mockReturnValue('pnpm'),
  getPackageManagerTemporaryCmd,
  hasGlobalRepodogConfig: jest.fn().mockReturnValue(false),
  isRunWithinProject: jest.fn().mockReturnValue(true),
  loadRepodogConfig: jest.fn().mockReturnValue(repodogConfig),
  removeEmptyAnswers: jest.fn().mockImplementation(value => value),
  resolveAbsolutePath: jest.fn().mockImplementation(value => `/root/${String(value)}`),
  setVerbose: jest.fn(),
  verboseLog: jest.fn(),
}));

jest.unstable_mockModule('enquirer', () => ({
  default: {
    // @ts-expect-error PromptOption[] is valid argument, but is being flagged as invalid
    prompt: jest.fn<typeof import('enquirer')['prompt']>().mockImplementation((questions: PromptOption[]) => {
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
    .fn<typeof import('node:path')['resolve']>()
    .mockImplementation((...paths) => `${paths[0]!}/${paths[1]!.replace(new RegExp('\\.\\.\\/', 'g'), '')}`),
  sep: jest.fn().mockReturnValue('/'),
}));

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

jest.unstable_mockModule('./utils/isValidNewType.ts', () => ({
  isValidNewType: jest.fn().mockReturnValue(true),
}));

jest.unstable_mockModule('./utils/isValidNewSubType.ts', () => ({
  isValidNewSubType: jest.fn().mockReturnValue(true),
}));

jest.unstable_mockModule('./utils/loadQuestions.ts', () => ({
  loadQuestions: jest
    .fn<typeof import('./utils/loadQuestions.ts')['loadQuestions']>()
    .mockImplementation((_internalTypePath, _configTypePath, questionOverrides) =>
      Promise.resolve([
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
      ])
    ),
}));

describe('handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when isRunWithinProject is false and hasGlobalRepodogConfig is false', () => {
    let handleGlobalConfigSetup: jest.Mocked<typeof import('@repodog/cli-setup')['handleGlobalConfigSetup']>;

    beforeEach(async () => {
      ({ handleGlobalConfigSetup } = jest.mocked(await import('@repodog/cli-setup')));
      const { isRunWithinProject } = jest.mocked(await import('@repodog/cli-utils'));
      isRunWithinProject.mockReturnValueOnce(false);
    });

    it('should execute handleGlobalConfigSetup', async () => {
      const { handler } = await import('./handler.ts');
      await handler({ subtype: 'bravo', type: 'alpha' });
      expect(handleGlobalConfigSetup).toHaveBeenCalledWith();
    });
  });

  describe('when given invalid type', () => {
    let shelljs: jest.Mocked<typeof import('shelljs')>;

    beforeEach(async () => {
      shelljs = jest.mocked(await import('shelljs')).default;
      const { isValidNewType } = jest.mocked(await import('./utils/isValidNewType.ts'));
      isValidNewType.mockReturnValueOnce(false);
    });

    it('should throw an error', async () => {
      const { handler } = await import('./handler.ts');
      await handler({ subtype: 'library', type: 'blah' });
      expect(shelljs.echo).toHaveBeenCalledWith(expect.stringContaining('Expected type to be a valid new type'));
    });

    it('should exit with a code of 1', async () => {
      const { handler } = await import('./handler.ts');
      await handler({ subtype: 'library', type: 'blah' });
      expect(shelljs.exit).toHaveBeenCalledWith(1);
    });
  });

  describe('when given invalid subtype', () => {
    let shelljs: jest.Mocked<typeof import('shelljs')>;

    beforeEach(async () => {
      shelljs = jest.mocked(await import('shelljs')).default;
      const { isValidNewSubType } = jest.mocked(await import('./utils/isValidNewSubType.ts'));
      isValidNewSubType.mockReturnValueOnce(false);
    });

    it('should throw an error', async () => {
      const { handler } = await import('./handler.ts');
      await handler({ subtype: 'blah', type: 'pkg' });

      expect(shelljs.echo).toHaveBeenCalledWith(
        expect.stringContaining('Error: Expected subtype to be a valid new subtype: library')
      );
    });

    it('should exit with a code of 1', async () => {
      const { handler } = await import('./handler.ts');
      await handler({ subtype: 'blah', type: 'pkg' });
      expect(shelljs.exit).toHaveBeenCalledWith(1);
    });
  });

  describe('when given valid arguments', () => {
    describe('when the package manager can be derived', () => {
      let shelljs: jest.Mocked<typeof import('shelljs')>;
      let loadQuestions: jest.Mocked<typeof import('./utils/loadQuestions.ts')['loadQuestions']>;
      let executeHygen: jest.Mocked<typeof import('./utils/executeHygen.ts')['executeHygen']>;
      let postinstallHandler: jest.Mocked<typeof import('@repodog/cli-postinstall')['handler']>;

      beforeEach(async () => {
        shelljs = jest.mocked(await import('shelljs')).default;
        ({ loadQuestions } = jest.mocked(await import('./utils/loadQuestions.ts')));
        ({ executeHygen } = jest.mocked(await import('./utils/executeHygen.ts')));
        ({ handler: postinstallHandler } = jest.mocked(await import('@repodog/cli-postinstall')));
      });

      it('should load the questions for the specified new type and customTypePath', async () => {
        const { handler } = await import('./handler.ts');
        await handler({ 'custom-type-path': 'cli', subtype: 'library', type: 'pkg' });

        expect(loadQuestions).toHaveBeenCalledWith(
          ['pkg', 'library'],
          ['new', 'pkg', 'library', 'cli'],
          repodogConfig.questionOverrides
        );
      });

      it('should execute hygen with the specified options and base type path', async () => {
        const { handler } = await import('./handler.ts');
        await handler({ 'custom-type-path': 'cli', subtype: 'library', type: 'pkg' });

        expect(executeHygen).toHaveBeenCalledWith(
          '/root/_templates',
          '/root/node_modules/.bin/hygen',
          ['pkg', 'library'],
          {
            author: 'Dylan Aubrey',
            excludeTypesFile: false,
            homepage: 'https://github.com/badbatch/repodog',
            language: 'javascript',
            mainFilename: 'handler',
            mock: 'answer to mock',
            newSubType: 'library',
            newType: 'pkg',
            org: 'repodog',
            packageManager: 'pnpm',
            packageManagerTemporaryCmd: 'pnpm dlx',
            question1: 'answer to question1',
            question2: 'answer to question2',
            question3: 'answer to question3',
          }
        );
      });

      it('should execute postinstall handler with the correct arguments', async () => {
        const { handler } = await import('./handler.ts');
        await handler({ 'custom-type-path': 'cli', subtype: 'library', type: 'repo' });
        expect(postinstallHandler).toHaveBeenCalledWith({ subtype: 'library', type: 'repo', verbose: false });
      });

      it('should exit with a code of 0', async () => {
        const { handler } = await import('./handler.ts');
        await handler({ subtype: 'library', type: 'pkg' });
        expect(shelljs.exit).toHaveBeenCalledWith(0);
      });

      describe('when there are template overrides for the specified new type', () => {
        beforeEach(async () => {
          const { loadRepodogConfig } = jest.mocked(await import('@repodog/cli-utils'));

          loadRepodogConfig.mockReturnValueOnce({
            ...repodogConfig,
            additionalTemplatesPath: '../overrides/_templates',
          });

          const { getLeafAdditionalTemplatesPath } = jest.mocked(
            await import('./utils/getLeafAdditionalTemplatesPath.ts')
          );

          getLeafAdditionalTemplatesPath.mockReturnValueOnce('leaf/template/path');
        });

        it('should execute hygen again with the template overrides path and specified options and base type path', async () => {
          const { handler } = await import('./handler.ts');
          await handler({ 'custom-type-path': 'cli', subtype: 'library', type: 'pkg' });

          expect(executeHygen.mock.calls[1]).toEqual([
            '../overrides/_templates',
            '/root/node_modules/.bin/hygen',
            ['new', 'pkg', 'library', 'cli'],
            {
              author: 'Dylan Aubrey',
              excludeTypesFile: false,
              homepage: 'https://github.com/badbatch/repodog',
              language: 'javascript',
              mainFilename: 'handler',
              mock: 'answer to mock',
              newSubType: 'library',
              newType: 'pkg',
              org: 'repodog',
              packageManager: 'pnpm',
              packageManagerTemporaryCmd: 'pnpm dlx',
              question1: 'answer to question1',
              question2: 'answer to question2',
              question3: 'answer to question3',
            },
          ]);
        });
      });
    });

    describe('when the package manager cannot be derived', () => {
      let shelljs: jest.Mocked<typeof import('shelljs')>;

      beforeEach(async () => {
        shelljs = jest.mocked(await import('shelljs')).default;
        const { getPackageManager } = jest.mocked(await import('@repodog/cli-utils'));
        getPackageManager.mockReturnValueOnce(undefined); // eslint-disable-line unicorn/no-useless-undefined
      });

      it('should throw an error', async () => {
        const { handler } = await import('./handler.ts');
        await handler({ subtype: 'library', type: 'pkg' });

        expect(shelljs.echo).toHaveBeenCalledWith(
          expect.stringContaining('Error: Could not derive the package manager')
        );
      });

      it('should exit with a code of 1', async () => {
        const { handler } = await import('./handler.ts');
        await handler({ subtype: 'library', type: 'pkg' });
        expect(shelljs.exit).toHaveBeenCalledWith(1);
      });
    });
  });
});
