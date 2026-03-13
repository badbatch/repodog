import { type Jsonifiable } from 'type-fest';

const jasmineEnv = globalThis.jasmine.getEnv();

jasmineEnv.addReporter({
  jasmineDone: async () => {
    // @ts-expect-error Type inference not working
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const coverage: Jsonifiable = globalThis.__coverage__;

    if (!coverage) {
      return;
    }

    await fetch('/__coverage__', {
      body: JSON.stringify(coverage),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
  },
});
