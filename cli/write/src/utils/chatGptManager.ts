import { resolveAbsolutePath, verboseLog } from '@repodog/cli-utils';
import dotenv from 'dotenv';
import OpenAIApi from 'openai';
import { type ChatCompletionMessageParam } from 'openai/resources/index.mjs';

export const createChatCompletion = async (
  messages: ChatCompletionMessageParam[],
  environmentVariablesPath: string,
): Promise<string> => {
  const path = resolveAbsolutePath(environmentVariablesPath);
  verboseLog(`Loading environment variables from: ${path}`);
  dotenv.config({ path });

  const openai = new OpenAIApi({
    apiKey: process.env.OPENAI_API_KEY,
  });

  verboseLog('Chat completion requested');

  const response = await openai.chat.completions.create({
    messages,
    model: 'gpt-4o-mini',
    temperature: 0.2,
  });

  verboseLog('Chat completion received');

  if (!response.choices[0]?.message.content) {
    throw new Error(`Create chat completion request did not return any content`);
  }

  return response.choices[0].message.content;
};
