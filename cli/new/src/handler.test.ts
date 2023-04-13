import { jest } from '@jest/globals';
import { clearShelljsMock, shelljsMock } from '@repodog/cli-test-utils';
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

jest.unstable_mockModule('@repodog/cli-utils', () => ({
  Language,
  calculateDuration: jest.fn().mockReturnValue('1'),
  flattenTemplateVariables,
  getPackageManager: jest.fn().mockReturnValue('pnpm'),
  getPackageManagerTemporaryCmd,
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
  describe('when given valid arguments', () => {
    describe('when the package manager can be derived', () => {
      let shelljs: jest.MockedObject<typeof import('shelljs')>;
      let mockedLoadQuestions: jest.MockedFunction<typeof import('./utils/loadQuestions.ts')['loadQuestions']>;
      let mockedExecuteHygen: jest.MockedFunction<typeof import('./utils/executeHygen.ts')['executeHygen']>;

      beforeEach(async () => {
        shelljs = jest.mocked(await import('shelljs')).default;
        clearShelljsMock(shelljs);

        const { loadQuestions } = await import('./utils/loadQuestions.ts');
        mockedLoadQuestions = jest.mocked(loadQuestions);
        mockedLoadQuestions.mockClear();

        const { executeHygen } = await import('./utils/executeHygen.ts');
        mockedExecuteHygen = jest.mocked(executeHygen);
        mockedExecuteHygen.mockClear();
      });

      it('should load the questions for the specified new type and customTypePath', async () => {
        const { handler } = await import('./handler.ts');
        await handler({ customTypePath: 'cli', type: 'pkg' });
        expect(mockedLoadQuestions).toHaveBeenCalledWith(['new', 'pkg', 'cli'], repodogConfig.questionOverrides);
      });

      it('should execute hygen with the specified options and base type path', async () => {
        const { handler } = await import('./handler.ts');
        await handler({ customTypePath: 'cli', type: 'pkg' });

        expect(mockedExecuteHygen).toHaveBeenCalledWith(
          '/root/_templates',
          '/root/node_modules/.bin/hygen',
          ['new', 'pkg'],
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
          }
        );
      });

      describe('when there are template overrides for the specified new type', () => {
        beforeEach(async () => {
          const { loadRepodogConfig } = await import('@repodog/cli-utils');
          const mockedLoadRepodogConfig = jest.mocked(loadRepodogConfig);
          mockedLoadRepodogConfig.mockClear();

          mockedLoadRepodogConfig.mockReturnValueOnce({
            ...repodogConfig,
            additionalTemplatesPath: '../overrides/_templates',
          });
        });

        it('should execute hygen again with the template overrides path and specified options and base type path', async () => {
          const { handler } = await import('./handler.ts');
          await handler({ customTypePath: 'cli', type: 'pkg' });

          expect(mockedExecuteHygen.mock.calls[1]).toEqual([
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
      let shelljs: jest.MockedObject<typeof import('shelljs')>;

      beforeEach(async () => {
        shelljs = jest.mocked(await import('shelljs')).default;
        clearShelljsMock(shelljs);

        const { getPackageManager } = await import('@repodog/cli-utils');
        const mockedGetPackageManager = jest.mocked(getPackageManager);
        mockedGetPackageManager.mockClear();
        mockedGetPackageManager.mockReturnValueOnce(undefined); // eslint-disable-line unicorn/no-useless-undefined
      });

      it('should throw an error', async () => {
        const { handler } = await import('./handler.ts');
        await handler({ type: 'pkg' });

        expect(shelljs.echo).toHaveBeenCalledWith(
          expect.stringContaining(
            'Error: Could not derive the package manager from the lock file in the current working directory'
          )
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
    let shelljs: jest.MockedObject<typeof import('shelljs')>;

    beforeEach(async () => {
      shelljs = jest.mocked(await import('shelljs')).default;
      clearShelljsMock(shelljs);

      const { isValidNewSubtype } = await import('./utils/isValidNewSubtype.ts');
      const mockedIsValidNewSubtype = jest.mocked(isValidNewSubtype);
      mockedIsValidNewSubtype.mockClear();
      mockedIsValidNewSubtype.mockReturnValueOnce(false);
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
    let shelljs: jest.MockedObject<typeof import('shelljs')>;

    beforeEach(async () => {
      shelljs = jest.mocked(await import('shelljs')).default;
      clearShelljsMock(shelljs);

      const { isValidNewType } = await import('./utils/isValidNewType.ts');
      const mockedIsValidNewType = jest.mocked(isValidNewType);
      mockedIsValidNewType.mockClear();
      mockedIsValidNewType.mockReturnValueOnce(false);
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
