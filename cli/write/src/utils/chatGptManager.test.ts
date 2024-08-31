import { jest } from '@jest/globals';
import { ChatCompletionRequestMessageRoleEnum, type OpenAIApi } from 'openai';

const mockCreateChatCompletion = jest.fn<InstanceType<typeof OpenAIApi>['createChatCompletion']>();

jest.unstable_mockModule('openai', () => ({
  Configuration: jest.fn(),
  OpenAIApi: jest.fn().mockReturnValue({
    createChatCompletion: mockCreateChatCompletion,
  }),
}));

process.env.OPENAI_API_KEY = 'test-api-key';

const messages = [
  { content: 'Hello', role: ChatCompletionRequestMessageRoleEnum.User },
  { content: 'How are you?', role: ChatCompletionRequestMessageRoleEnum.User },
];

const environmentVariablesPath = '.env';

describe('createChatCompletion', () => {
  let createChatCompletion: (typeof import('./chatGptManager.ts'))['createChatCompletion'];

  beforeEach(async () => {
    jest.clearAllMocks();
    ({ createChatCompletion } = await import('./chatGptManager.ts'));
  });

  it('calls openai.createChatCompletion with the correct arguments', async () => {
    const mockResponse = {
      data: {
        choices: [
          {
            message: {
              content: 'I am great!',
              role: ChatCompletionRequestMessageRoleEnum.Assistant,
            },
          },
        ],
      },
      status: 200,
    };

    mockCreateChatCompletion.mockResolvedValueOnce(
      mockResponse as unknown as Awaited<ReturnType<InstanceType<typeof OpenAIApi>['createChatCompletion']>>,
    );

    await createChatCompletion(messages, environmentVariablesPath);

    expect(mockCreateChatCompletion).toHaveBeenCalledWith({
      messages,
      model: 'gpt-3.5-turbo',
      temperature: 0.2,
    });
  });

  it('returns a string with chat completion', async () => {
    const mockResponse = {
      data: {
        choices: [
          {
            message: {
              content: 'I am great!',
              role: ChatCompletionRequestMessageRoleEnum.Assistant,
            },
          },
        ],
      },
      status: 200,
    };

    mockCreateChatCompletion.mockResolvedValueOnce(
      mockResponse as unknown as Awaited<ReturnType<InstanceType<typeof OpenAIApi>['createChatCompletion']>>,
    );

    const result = await createChatCompletion(messages, environmentVariablesPath);
    expect(result).toBe('I am great!');
  });

  it('throws an error if response status is not 200', async () => {
    const mockResponse = { status: 400, statusText: 'Bad Request' };

    mockCreateChatCompletion.mockResolvedValueOnce(
      mockResponse as unknown as Awaited<ReturnType<InstanceType<typeof OpenAIApi>['createChatCompletion']>>,
    );

    await expect(createChatCompletion(messages, environmentVariablesPath)).rejects.toThrow(
      `Create chat completion request failed with a ${String(mockResponse.status)} status: ${mockResponse.statusText}`,
    );
  });

  it('throws an error if response data does not contain any content', async () => {
    const mockResponse = { data: { choices: [{ message: {} }] }, status: 200 };

    mockCreateChatCompletion.mockResolvedValueOnce(
      mockResponse as unknown as Awaited<ReturnType<InstanceType<typeof OpenAIApi>['createChatCompletion']>>,
    );

    await expect(createChatCompletion(messages, environmentVariablesPath)).rejects.toThrow(
      'Create chat completion request did not return any content',
    );
  });
});
