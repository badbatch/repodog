describe('stringifyCliOptions', () => {
  it('should return the stringified cli options', async () => {
    const { stringifyCliOptions } = await import('./stringifyCliOptions.ts');

    expect(
      stringifyCliOptions({
        alpha: 'foxtrot',
        charlie: 23,
        delta: true,
        echo: false,
        foxtrot: 'golf',
        hotel: true,
      })
    ).toBe('--alpha "foxtrot" --charlie "23" --delta --foxtrot "golf" --hotel');
  });
});
