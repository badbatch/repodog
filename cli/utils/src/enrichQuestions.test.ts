const baseQuestions = [
  {
    message: 'What is the name of your org?',
    name: 'org',
    required: true,
    type: 'input',
  },
  {
    message: 'What is the name of your package?',
    name: 'name',
    required: true,
    type: 'input',
  },
  {
    message: 'What is the description of your package?',
    name: 'desc',
    required: true,
    type: 'input',
  },
  {
    message: 'What is the path to your package from the project root? i.e. packages/foo',
    name: 'path',
    required: true,
    type: 'input',
  },
  {
    message: 'What is the name of the package author?',
    name: 'author',
    required: true,
    type: 'input',
  },
  {
    message: "What is the url for the package's repository?",
    name: 'homepage',
    required: true,
    type: 'input',
  },
  {
    initial: 'main',
    message: 'What is the name of the main file for the package?',
    name: 'mainFilename',
    required: true,
    type: 'input',
  },
];

describe('enrichQuestions', () => {
  it('should return the correct output', async () => {
    const { enrichQuestions } = await import('./enrichQuestions.ts');

    const answers = {
      author: 'Alpha Bravo',
      homepage: 'https://github.com/alphabravo/repodog',
      org: 'repodog',
    };

    expect(enrichQuestions(baseQuestions, answers)).toEqual([
      {
        initial: 'repodog',
        message: 'What is the name of your org?',
        name: 'org',
        required: true,
        type: 'input',
      },
      {
        message: 'What is the name of your package?',
        name: 'name',
        required: true,
        type: 'input',
      },
      {
        message: 'What is the description of your package?',
        name: 'desc',
        required: true,
        type: 'input',
      },
      {
        message: 'What is the path to your package from the project root? i.e. packages/foo',
        name: 'path',
        required: true,
        type: 'input',
      },
      {
        initial: 'Alpha Bravo',
        message: 'What is the name of the package author?',
        name: 'author',
        required: true,
        type: 'input',
      },
      {
        initial: 'https://github.com/alphabravo/repodog',
        message: "What is the url for the package's repository?",
        name: 'homepage',
        required: true,
        type: 'input',
      },
      {
        initial: 'main',
        message: 'What is the name of the main file for the package?',
        name: 'mainFilename',
        required: true,
        type: 'input',
      },
    ]);
  });
});
