describe('removeEmptyAnswers', () => {
  it('should remove empty string values from the answers object', async () => {
    const answers = {
      age: 30,
      email: '',
      name: 'John',
      subscribed: true,
    };

    const expected = {
      age: 30,
      name: 'John',
      subscribed: true,
    };

    const { removeEmptyAnswers } = await import('./removeEmptyAnswers.ts');
    expect(removeEmptyAnswers(answers)).toEqual(expected);
  });

  it('should not remove non-empty string or non-string values from the answers object', async () => {
    const answers = {
      age: 30,
      email: 'john@example.com',
      name: 'John',
      subscribed: true,
    };

    const { removeEmptyAnswers } = await import('./removeEmptyAnswers.ts');
    expect(removeEmptyAnswers(answers)).toEqual(answers);
  });
});
