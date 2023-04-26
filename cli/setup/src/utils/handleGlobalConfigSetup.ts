import {
  type GlobalRepodogConfig,
  enrichQuestions,
  readRepodogConfig,
  verboseLog,
  writeRepodogConfig,
} from '@repodog/cli-utils';
import enquirer from 'enquirer';
import { homedir } from 'node:os';
import questions from '../questions.json';

export const handleGlobalConfigSetup = async () => {
  const config = readRepodogConfig<GlobalRepodogConfig>(homedir());

  if (config) {
    verboseLog(`Existing global config:\n${JSON.stringify(config, undefined, 2)}\n`);
  }

  verboseLog(`Global config questions:\n${JSON.stringify(questions, undefined, 2)}\n`);
  const answers = await enquirer.prompt(enrichQuestions(questions, (config ?? {}) as Record<string, string>));
  verboseLog(`Global config answers:\n${JSON.stringify(answers, undefined, 2)}\n`);
  writeRepodogConfig(homedir(), answers);
};
