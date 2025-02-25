import { type PromptOption, type QuestionOverride, type QuestionOverrides, verboseLog } from '@repodog/cli-utils';
import { get } from 'lodash-es';
import { sep } from 'node:path';

export const loadQuestions = async (
  internalTypePath: string[],
  configTypePath: string[],
  questionOverrides?: Record<string, QuestionOverrides>,
) => {
  // The import is a json file, which is not typed literally.
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const { default: baseQuestions } = (await import(`../questions/${internalTypePath.join(sep)}.json`, {
    with: { type: 'json' },
  })) as {
    default: PromptOption[];
  };

  verboseLog(`Loaded base questions:\n${JSON.stringify(baseQuestions, undefined, 2)}\n`);

  if (!questionOverrides) {
    verboseLog('No question overrides, returning base questions');
    return baseQuestions;
  }

  let finalQuestions = [...baseQuestions];
  // Difficult to type in with the get generic arguments.
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const override = get(questionOverrides, configTypePath.join('.')) as unknown as QuestionOverride | undefined;

  if (!override) {
    verboseLog(`No question override found for path "${configTypePath.join('.')}", returning base questions`);
    return baseQuestions;
  }

  if (Array.isArray(override.remove)) {
    verboseLog(`Remove question override: ${override.remove.join(', ')}`);
    finalQuestions = finalQuestions.filter(question => !override.remove?.includes(question.name));
  }

  if (Array.isArray(override.add)) {
    verboseLog(`Add question override:\n${JSON.stringify(override.add, undefined, 2)}\n`);
    finalQuestions = [...finalQuestions, ...override.add];
  }

  if (Array.isArray(override.replace)) {
    verboseLog(`Replace question override:\n${JSON.stringify(override.replace, undefined, 2)}\n`);

    finalQuestions = finalQuestions.map(question => {
      const questionToReplace = override.replace?.find(replaceQuestion => replaceQuestion.name === question.name);
      return questionToReplace ?? question;
    });
  }

  return finalQuestions;
};
