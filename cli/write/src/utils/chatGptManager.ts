import { resolveAbsolutePath, verboseLog } from '@repodog/cli-utils';
import dotenv from 'dotenv';
import { type ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';

export const createChatCompletion = async (
  messages: ChatCompletionRequestMessage[],
  environmentVariablesPath: string
) => {
  const path = resolveAbsolutePath(environmentVariablesPath);
  verboseLog(`Loading environment variables from: ${path}`);
  dotenv.config({ path });

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  verboseLog('Chat completion requested');

  const response = await openai.createChatCompletion({
    messages,
    model: 'gpt-3.5-turbo',
    temperature: 0.2,
  });

  verboseLog('Chat completion received');

  if (response.status !== 200) {
    throw new Error(`Create chat completion request failed with a ${response.status} status: ${response.statusText}`);
  }

  if (!response.data.choices[0]?.message?.content) {
    throw new Error(`Create chat completion request did not return any content`);
  }

  return response.data.choices[0].message.content;
};
