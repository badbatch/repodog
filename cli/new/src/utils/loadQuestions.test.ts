import { jest } from '@jest/globals';
import type { QuestionOverrides } from '@repodog/cli-utils';

jest.unstable_mockModule('../questions/pkg.json', () => ({
  default: [{ name: 'question1' }, { name: 'question2' }],
}));

describe('loadQuestions', () => {
  it('should load questions when no question overrides are provided', async () => {
    const internalTypePath = ['pkg'];
    const configTypePath = ['new', 'pkg'];
    const { loadQuestions } = await import('./loadQuestions.ts');
    const result = await loadQuestions(internalTypePath, configTypePath);
    expect(result).toEqual([{ name: 'question1' }, { name: 'question2' }]);
  });

  it('should apply remove question overrides', async () => {
    const internalTypePath = ['pkg'];
    const configTypePath = ['new', 'pkg'];

    const questionOverrides: Record<string, QuestionOverrides> = {
      new: {
        pkg: {
          override: {
            remove: ['question2'],
          },
        },
      },
    };

    const { loadQuestions } = await import('./loadQuestions.ts');
    const result = await loadQuestions(internalTypePath, configTypePath, questionOverrides);
    expect(result).toEqual([{ name: 'question1' }]);
  });

  it('should apply add question overrides', async () => {
    const internalTypePath = ['pkg'];
    const configTypePath = ['new', 'pkg'];

    const questionOverrides: Record<string, QuestionOverrides> = {
      new: {
        pkg: {
          override: {
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

    const { loadQuestions } = await import('./loadQuestions.ts');
    const result = await loadQuestions(internalTypePath, configTypePath, questionOverrides);

    expect(result).toEqual([
      { name: 'question1' },
      { name: 'question2' },
      { message: 'What is question 3?', name: 'question3', type: 'input' },
    ]);
  });

  it('should apply replace question overrides', async () => {
    const internalTypePath = ['pkg'];
    const configTypePath = ['new', 'pkg'];

    const questionOverrides: Record<string, QuestionOverrides> = {
      new: {
        pkg: {
          override: {
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

    const { loadQuestions } = await import('./loadQuestions.ts');
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
