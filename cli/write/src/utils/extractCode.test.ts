describe('extractCode', () => {
  it('should extract code from raw answer', async () => {
    const { extractCode } = await import('./extractCode.js');
    const rawAnswer = 'Lorem ipsum\n```javascript\nconsole.log("Hello, world!");\n```\ndolor sit amet';
    const expectedCode = 'console.log("Hello, world!");\n';
    expect(extractCode(rawAnswer)).toEqual(expectedCode);
  });

  it('should return undefined if code is not found', async () => {
    const { extractCode } = await import('./extractCode.js');
    const rawAnswer = 'Lorem ipsum dolor sit amet';
    expect(extractCode(rawAnswer)).toBeUndefined();
  });
});
