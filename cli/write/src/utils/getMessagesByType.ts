import { type Language } from '@repodog/cli-utils';
import { type ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { WriteType } from '../types.ts';

const testInitialMessages = (
  fileName: string,
  fileContents: string,
  language: Language,
): ChatCompletionMessageParam[] => [
  {
    content: `Write Jest unit tests for the ${language} file \`./${fileName}\`:\n\`\`\`\n${fileContents}\n\`\`\``,
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

const initialMessagesTypeMapper = {
  [WriteType.TEST]: testInitialMessages,
};

export const getMessagesByType = (
  type: WriteType,
  fileName: string,
  fileContents: string,
  language: Language,
): ChatCompletionMessageParam[] => initialMessagesTypeMapper[type](fileName, fileContents, language);
