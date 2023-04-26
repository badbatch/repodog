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
import { VALID_NEW_SUBTYPES } from './utils/isValidNewSubtype.ts';
import { VALID_NEW_TYPES } from './utils/isValidNewType.ts';

jest.unstable_mockModule('shelljs', shelljsMock);

const repodogConfig = {
  questionOverrides: {
    new: {
      pkg: {
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
  templateVariables: {
    '*': {
      author: 'Dylan Aubrey',
      homepage: 'https://github.com/badbatch/repodog',
      org: 'repodog',
    },
    new: {
      pkg: {
        cli: {
          mainFilename: 'handler',
        },
      },
    },
  },
};

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
}));

jest.unstable_mockModule('./utils/executeHygen.ts', () => ({
  executeHygen: jest.fn(),
}));

jest.unstable_mockModule('./utils/isValidNewType.ts', () => ({
  VALID_NEW_TYPES,
  isValidNewType: jest.fn().mockReturnValue(true),
}));

jest.unstable_mockModule('./utils/isValidNewSubtype.ts', () => ({
  VALID_NEW_SUBTYPES,
  isValidNewSubtype: jest.fn().mockReturnValue(true),
}));

jest.unstable_mockModule('./utils/loadQuestions.ts', () => ({
  loadQuestions: jest
    .fn<typeof import('./utils/loadQuestions.ts')['loadQuestions']>()
    .mockImplementation((_typePath, questionOverrides) =>
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
        ...((questionOverrides?.new?.pkg as QuestionOverrides).cli as QuestionOverride).add!,
      ])
    ),
}));

process.cwd = () => '/root';

describe('handler', () => {
  describe('when isRunWithinProject is false and hasGlobalRepodogConfig is false', () => {
    let handleGlobalConfigSetup: jest.Mocked<typeof import('@repodog/cli-setup')['handleGlobalConfigSetup']>;

    beforeEach(async () => {
      jest.clearAllMocks();
      ({ handleGlobalConfigSetup } = jest.mocked(await import('@repodog/cli-setup')));
      const { isRunWithinProject } = jest.mocked(await import('@repodog/cli-utils'));
      isRunWithinProject.mockReturnValueOnce(false);
    });

    it('should execute handleGlobalConfigSetup', async () => {
      const { handler } = await import('./handler.ts');
      await handler({ type: 'blah' });
      expect(handleGlobalConfigSetup).toHaveBeenCalled();
    });
  });

  describe('when given valid arguments', () => {
    describe('when the package manager can be derived', () => {
      let shelljs: jest.Mocked<typeof import('shelljs')>;
      let loadQuestions: jest.Mocked<typeof import('./utils/loadQuestions.ts')['loadQuestions']>;
      let executeHygen: jest.Mocked<typeof import('./utils/executeHygen.ts')['executeHygen']>;

      beforeEach(async () => {
        jest.clearAllMocks();
        shelljs = jest.mocked(await import('shelljs')).default;
        ({ loadQuestions } = jest.mocked(await import('./utils/loadQuestions.ts')));
        ({ executeHygen } = jest.mocked(await import('./utils/executeHygen.ts')));
      });

      it('should load the questions for the specified new type and customTypePath', async () => {
        const { handler } = await import('./handler.ts');
        await handler({ 'custom-type-path': 'cli', type: 'pkg' });
        expect(loadQuestions).toHaveBeenCalledWith(['new', 'pkg', 'cli'], repodogConfig.questionOverrides);
      });

      it('should execute hygen with the specified options and base type path', async () => {
        const { handler } = await import('./handler.ts');
        await handler({ 'custom-type-path': 'cli', type: 'pkg' });

        expect(executeHygen).toHaveBeenCalledWith('/root/_templates', '/root/node_modules/.bin/hygen', ['new', 'pkg'], {
          author: 'Dylan Aubrey',
          homepage: 'https://github.com/badbatch/repodog',
          language: 'javascript',
          mainFilename: 'handler',
          mock: 'answer to mock',
          org: 'repodog',
          packageManager: 'pnpm',
          packageManagerTemporaryCmd: 'pnpm dlx',
          question1: 'answer to question1',
          question2: 'answer to question2',
          question3: 'answer to question3',
        });
      });

      describe('when there are template overrides for the specified new type', () => {
        beforeEach(async () => {
          jest.clearAllMocks();
          const { loadRepodogConfig } = jest.mocked(await import('@repodog/cli-utils'));

          loadRepodogConfig.mockReturnValueOnce({
            ...repodogConfig,
            additionalTemplatesPath: '../overrides/_templates',
          });
        });

        it('should execute hygen again with the template overrides path and specified options and base type path', async () => {
          const { handler } = await import('./handler.ts');
          await handler({ 'custom-type-path': 'cli', type: 'pkg' });

          expect(executeHygen.mock.calls[1]).toEqual([
            '/root/overrides/_templates',
            '/root/node_modules/.bin/hygen',
            ['new', 'pkg', 'cli'],
            {
              author: 'Dylan Aubrey',
              homepage: 'https://github.com/badbatch/repodog',
              language: 'javascript',
              mainFilename: 'handler',
              mock: 'answer to mock',
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

      it('should exit with a code of 0', async () => {
        const { handler } = await import('./handler.ts');
        await handler({ type: 'pkg' });
        expect(shelljs.exit).toHaveBeenCalledWith(0);
      });
    });

    describe('when the package manager cannot be derived', () => {
      let shelljs: jest.Mocked<typeof import('shelljs')>;

      beforeEach(async () => {
        jest.clearAllMocks();
        shelljs = jest.mocked(await import('shelljs')).default;
        const { getPackageManager } = jest.mocked(await import('@repodog/cli-utils'));
        getPackageManager.mockReturnValueOnce(undefined); // eslint-disable-line unicorn/no-useless-undefined
      });

      it('should throw an error', async () => {
        const { handler } = await import('./handler.ts');
        await handler({ type: 'pkg' });

        expect(shelljs.echo).toHaveBeenCalledWith(
          expect.stringContaining('Error: Could not derive the package manager')
        );
      });

      it('should exit with a code of 1', async () => {
        const { handler } = await import('./handler.ts');
        await handler({ type: 'pkg' });
        expect(shelljs.exit).toHaveBeenCalledWith(1);
      });
    });
  });

  describe('when given invalid type', () => {
    let shelljs: jest.Mocked<typeof import('shelljs')>;

    beforeEach(async () => {
      jest.clearAllMocks();
      shelljs = jest.mocked(await import('shelljs')).default;
      const { isValidNewSubtype } = jest.mocked(await import('./utils/isValidNewSubtype.ts'));
      isValidNewSubtype.mockReturnValueOnce(false);
    });

    it('should throw an error', async () => {
      const { handler } = await import('./handler.ts');
      await handler({ subtype: 'blah', type: 'repo' });
      expect(shelljs.echo).toHaveBeenCalledWith(expect.stringContaining('Error: Expected subtype to be a valid new'));
    });

    it('should exit with a code of 1', async () => {
      const { handler } = await import('./handler.ts');
      await handler({ subtype: 'blah', type: 'repo' });
      expect(shelljs.exit).toHaveBeenCalledWith(1);
    });
  });

  describe('when given invalid subtype', () => {
    let shelljs: jest.Mocked<typeof import('shelljs')>;

    beforeEach(async () => {
      jest.clearAllMocks();
      shelljs = jest.mocked(await import('shelljs')).default;
      const { isValidNewType } = jest.mocked(await import('./utils/isValidNewType.ts'));
      isValidNewType.mockReturnValueOnce(false);
    });

    it('should throw an error', async () => {
      const { handler } = await import('./handler.ts');
      await handler({ type: 'alpha' });

      expect(shelljs.echo).toHaveBeenCalledWith(
        expect.stringContaining('Error: Expected type to be a valid new type: pkg, repo')
      );
    });

    it('should exit with a code of 1', async () => {
      const { handler } = await import('./handler.ts');
      await handler({ type: 'alpha' });
      expect(shelljs.exit).toHaveBeenCalledWith(1);
    });
  });
});
