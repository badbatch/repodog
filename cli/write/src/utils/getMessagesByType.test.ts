import { Language } from '@repodog/cli-utils';
import { WriteType } from '../types.js';

describe('getMessagesByType', () => {
  it('should return initial messages for test type', async () => {
    const { getMessagesByType } = await import('./getMessagesByType.js');
    const fileName = 'example.ts';
    const fileContents = 'console.log("Hello, world!");';

    const expectedMessages = [
      {
        content: `Write Jest unit tests for the ${Language.JAVASCRIPT} file \`./${fileName}\`:\n\`\`\`\n${fileContents}\n\`\`\``,
        role: 'user',
      },
      {
        content: 'Write the tests using `describe`, `it` and `beforeEach` blocks and dynamic `import`',
        role: 'user',
      },
      {
        content: 'Mock with `jest.unstable_mockModule`',
        role: 'user',
      },
      {
        content: 'Do not use `require`',
        role: 'user',
      },
    ];

    expect(getMessagesByType(WriteType.TEST, fileName, fileContents, Language.JAVASCRIPT)).toEqual(expectedMessages);
  });
});
