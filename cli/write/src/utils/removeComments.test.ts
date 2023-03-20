describe('removeComments', () => {
  it('should remove single-line comments', async () => {
    const { removeComments } = await import('./removeComments.js');

    const inputCode = `
      const a = 1; // this is a comment
      const b = 2; // this is another comment
    `;

    const expectedCode = `
      const a = 1;
      const b = 2;
    `;

    expect(removeComments(inputCode)).toEqual(expectedCode);
  });

  it('should remove multi-line comments', async () => {
    const { removeComments } = await import('./removeComments.js');

    const inputCode = `
      const a = 1; /* this is a
      multi-line comment */ const b = 2; /*
      this is another
      multi-line comment
      */
    `;

    const expectedCode = `
      const a = 1; const b = 2;
    `;

    expect(removeComments(inputCode)).toEqual(expectedCode);
  });
});
