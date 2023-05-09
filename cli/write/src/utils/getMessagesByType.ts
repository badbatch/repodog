import type { Language } from '@repodog/cli-utils';
import { ChatCompletionRequestMessageRoleEnum } from 'openai';
import { WriteType } from '../types.ts';

const testInitialMessages = (fileName: string, fileContents: string, language: Language) => [
  {
    content: `Write Jest unit tests for the ${language} file \`./${fileName}\`:\n\`\`\`\n${fileContents}\n\`\`\``,
    role: ChatCompletionRequestMessageRoleEnum.User,
  },
  {
    content: 'Write the tests using `describe`, `it` and `beforeEach` blocks and dynamic `import`',
    role: ChatCompletionRequestMessageRoleEnum.User,
  },
  {
    content: 'Mock with `jest.unstable_mockModule`',
    role: ChatCompletionRequestMessageRoleEnum.User,
  },
  {
    content: 'Do not use `require`',
    role: ChatCompletionRequestMessageRoleEnum.User,
  },
];

const initialMessagesTypeMapper = {
  [WriteType.TEST]: testInitialMessages,
};

export const getMessagesByType = (type: WriteType, fileName: string, fileContents: string, language: Language) =>
  initialMessagesTypeMapper[type](fileName, fileContents, language);
