import { jest } from '@jest/globals';
import * as cliUtils from '@repodog/cli-utils';

jest.unstable_mockModule('@repodog/cli-utils', () => ({
  ...cliUtils,
  enrichQuestions: jest.fn().mockImplementation(value => value),
  readRepodogConfig: jest.fn().mockReturnValue(undefined), // eslint-disable-line unicorn/no-useless-undefined
  removeEmptyAnswers: jest.fn().mockImplementation(value => value),
  writeRepodogConfig: jest.fn(),
}));

const questions = [
  {
    message: 'Is this a good test question?',
    name: 'test',
    required: false,
    type: 'input',
  },
];

const answers = {
  test: 'the best!',
};

jest.unstable_mockModule('enquirer', () => ({
  prompt: jest.fn().mockImplementation(() => Promise.resolve(answers)),
}));

jest.unstable_mockModule('node:os', () => ({
  homedir: jest.fn().mockReturnValue('/'),
}));

jest.unstable_mockModule('../questions.json', () => ({
  default: questions,
}));

describe('handleGlobalConfigSetup', () => {
  let prompt: jest.Mocked<typeof import('enquirer')['prompt']>;
  let writeRepodogConfig: jest.Mocked<typeof import('@repodog/cli-utils')['writeRepodogConfig']>;

  beforeEach(async () => {
    jest.clearAllMocks();
    ({ prompt } = jest.mocked(await import('enquirer')));
    ({ writeRepodogConfig } = jest.mocked(await import('@repodog/cli-utils')));
  });

  describe('when there is an existing global config', () => {
    let enrichQuestions: jest.Mocked<typeof import('@repodog/cli-utils')['enrichQuestions']>;

    beforeEach(async () => {
      let readRepodogConfig: jest.Mocked<typeof import('@repodog/cli-utils')['readRepodogConfig']>;
      ({ enrichQuestions, readRepodogConfig } = jest.mocked(await import('@repodog/cli-utils')));
      readRepodogConfig.mockReturnValueOnce({ packageManager: 'npm' });
    });

    it('should load the global config and pass to enrich questions', async () => {
      const { handleGlobalConfigSetup } = await import('./handleGlobalConfigSetup.ts');
      await handleGlobalConfigSetup();
      expect(enrichQuestions).toHaveBeenCalledWith(questions, { packageManager: 'npm' });
    });
  });

  it('should pass questions to enquirer.prompt', async () => {
    const { handleGlobalConfigSetup } = await import('./handleGlobalConfigSetup.ts');
    await handleGlobalConfigSetup();
    expect(prompt).toHaveBeenCalledWith(questions);
  });

  it('should call writeRepodogConfig with the correct arguments', async () => {
    const { handleGlobalConfigSetup } = await import('./handleGlobalConfigSetup.ts');
    await handleGlobalConfigSetup();
    expect(writeRepodogConfig).toHaveBeenCalledWith('/', answers);
  });
});
