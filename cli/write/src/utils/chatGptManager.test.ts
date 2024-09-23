import { jest } from '@jest/globals';
import type OpenAIApi from 'openai';
import { type ChatCompletionMessageParam } from 'openai/resources/index.mjs';

const mockCreateChatCompletion = jest.fn<InstanceType<typeof OpenAIApi>['chat']['completions']['create']>();

jest.unstable_mockModule('openai', () => ({
  default: jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: mockCreateChatCompletion,
      },
    },
  })),
}));

process.env.OPENAI_API_KEY = 'test-api-key';

const { createChatCompletion } = await import('./chatGptManager.ts');

const messages: ChatCompletionMessageParam[] = [
  { content: 'Hello', role: 'user' },
  { content: 'How are you?', role: 'user' },
];

const environmentVariablesPath = '.env';

describe('createChatCompletion', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls openai.createChatCompletion with the correct arguments', async () => {
    const mockResponse = {
      choices: [
        {
          message: {
            content: 'I am great!',
            role: 'assistant',
          },
        },
      ],
    };

    mockCreateChatCompletion.mockResolvedValueOnce(
      mockResponse as unknown as OpenAIApi.Chat.Completions.ChatCompletion,
    );

    await createChatCompletion(messages, environmentVariablesPath);

    expect(mockCreateChatCompletion).toHaveBeenCalledWith({
      messages,
      model: 'gpt-4o-mini',
      temperature: 0.2,
    });
  });

  it('returns a string with chat completion', async () => {
    const mockResponse = {
      choices: [
        {
          message: {
            content: 'I am great!',
            role: 'assistant',
          },
        },
      ],
    };

    mockCreateChatCompletion.mockResolvedValueOnce(
      mockResponse as unknown as OpenAIApi.Chat.Completions.ChatCompletion,
    );

    const result = await createChatCompletion(messages, environmentVariablesPath);
    expect(result).toBe('I am great!');
  });

  it('throws an error if response data does not contain any content', async () => {
    const mockResponse = {
      choices: [
        {
          message: {},
        },
      ],
    };

    mockCreateChatCompletion.mockResolvedValueOnce(
      mockResponse as unknown as OpenAIApi.Chat.Completions.ChatCompletion,
    );

    await expect(createChatCompletion(messages, environmentVariablesPath)).rejects.toThrow(
      'Create chat completion request did not return any content',
    );
  });
});
