import { jest } from '@jest/globals';
import { type QuestionOverrides } from '@repodog/cli-utils';

jest.unstable_mockModule('../questions/pkg/library.json', () => ({
  default: [{ name: 'question1' }, { name: 'question2' }],
}));

const { loadQuestions } = await import('./loadQuestions.ts');

describe('loadQuestions', () => {
  it('should return base questions when no question overrides are provided', async () => {
    const internalTypePath = ['pkg', 'library'];
    const configTypePath = ['new', 'pkg', 'library'];
    const result = await loadQuestions(internalTypePath, configTypePath);
    expect(result).toEqual([{ name: 'question1' }, { name: 'question2' }]);
  });

  it('should return base questions when no applicable question overrides are provided', async () => {
    const internalTypePath = ['pkg', 'library'];
    const configTypePath = ['new', 'pkg', 'library'];

    const questionOverrides: Record<string, QuestionOverrides> = {
      new: {
        pkg: {
          alpha: {
            add: [
              {
                message: 'What is question 3?',
                name: 'question3',
                type: 'input',
              },
            ],
          },
        },
      },
    };

    const result = await loadQuestions(internalTypePath, configTypePath, questionOverrides);
    expect(result).toEqual([{ name: 'question1' }, { name: 'question2' }]);
  });

  it('should apply remove question overrides', async () => {
    const internalTypePath = ['pkg', 'library'];
    const configTypePath = ['new', 'pkg', 'library'];

    const questionOverrides: Record<string, QuestionOverrides> = {
      new: {
        pkg: {
          library: {
            remove: ['question2'],
          },
        },
      },
    };

    const result = await loadQuestions(internalTypePath, configTypePath, questionOverrides);
    expect(result).toEqual([{ name: 'question1' }]);
  });

  it('should apply add question overrides', async () => {
    const internalTypePath = ['pkg', 'library'];
    const configTypePath = ['new', 'pkg', 'library'];

    const questionOverrides: Record<string, QuestionOverrides> = {
      new: {
        pkg: {
          library: {
            add: [
              {
                message: 'What is question 3?',
                name: 'question3',
                type: 'input',
              },
            ],
          },
        },
      },
    };

    const result = await loadQuestions(internalTypePath, configTypePath, questionOverrides);

    expect(result).toEqual([
      { name: 'question1' },
      { name: 'question2' },
      { message: 'What is question 3?', name: 'question3', type: 'input' },
    ]);
  });

  it('should apply replace question overrides', async () => {
    const internalTypePath = ['pkg', 'library'];
    const configTypePath = ['new', 'pkg', 'library'];

    const questionOverrides: Record<string, QuestionOverrides> = {
      new: {
        pkg: {
          library: {
            replace: [
              {
                message: 'New message for question 1',
                name: 'question1',
                type: 'input',
              },
            ],
          },
        },
      },
    };

    const result = await loadQuestions(internalTypePath, configTypePath, questionOverrides);

    expect(result).toEqual([
      {
        message: 'New message for question 1',
        name: 'question1',
        type: 'input',
      },
      {
        name: 'question2',
      },
    ]);
  });
});
