describe('getInternalDependencies', () => {
  const packageJson = {
    dependencies: {
      alpha: '1.0.0',
      delta: '1.0.0',
    },
    devDependencies: {
      echo: '1.0.0',
    },
    peerDependencies: {
      charlie: '< 2',
      foxtrot: '< 2',
    },
  };

  const packageMetaRecord = {
    alpha: {
      force: false,
      name: 'alpha',
      path: '/path/to/alpha',
      versioned: false,
    },
    bravo: {
      force: false,
      name: 'bravo',
      path: '/path/to/bravo',
      versioned: false,
    },
    charlie: {
      force: false,
      name: 'charlie',
      path: '/path/to/charlie',
      versioned: false,
    },
  };

  it('should return the correct package meta', async () => {
    const { getInternalDependencies } = await import('./getInternalDependencies.js');
    expect(getInternalDependencies(packageJson, packageMetaRecord)).toEqual(['alpha', 'charlie']);
  });
});
