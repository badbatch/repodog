import { type PromptOption, type QuestionOverride, type QuestionOverrides, verboseLog } from '@repodog/cli-utils';
import get from 'lodash/get.js';
import { sep } from 'node:path';

export const loadQuestions = async (typePath: string[], questionOverrides?: Record<string, QuestionOverrides>) => {
  const { default: baseQuestions } = (await import(`../questions/${typePath.join(sep)}.json`, {
    assert: { type: 'json' },
  })) as {
    default: PromptOption[];
  };

  verboseLog(`Loaded base questions:\n${JSON.stringify(baseQuestions, undefined, 2)}\n`);

  if (!questionOverrides) {
    verboseLog('No question overrides, returning base questions');
    return baseQuestions;
  }

  let finalQuestions = [...baseQuestions];
  const override = get(questionOverrides, `${typePath.join('.')}.override`) as unknown as QuestionOverride | undefined;

  if (!override) {
    verboseLog(`No question override found for path "${typePath.join('.')}", returning base questions`);
    return baseQuestions;
  }

  if (Array.isArray(override.remove)) {
    verboseLog(`Remove question override: ${override.remove.join(', ')}`);
    finalQuestions = finalQuestions.filter(question => !override.remove!.includes(question.name));
  }

  if (Array.isArray(override.add)) {
    verboseLog(`Add question override:\n${JSON.stringify(override.add, undefined, 2)}\n`);
    finalQuestions = [...finalQuestions, ...override.add];
  }

  if (Array.isArray(override.replace)) {
    verboseLog(`Replace question override:\n${JSON.stringify(override.replace, undefined, 2)}\n`);

    finalQuestions = finalQuestions.map(question => {
      const questionToReplace = override.replace!.find(replaceQuestion => replaceQuestion.name === question.name);
      return questionToReplace ?? question;
    });
  }

  return finalQuestions;
};
