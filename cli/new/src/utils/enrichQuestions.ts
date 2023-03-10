import type { PromptOption } from '@repodog/cli-utils';

export const enrichQuestions = (questions: PromptOption[], answers: Record<string, string | number | boolean>) => {
  for (const question of questions) {
    if (question.name in answers) {
      question.initial = answers[question.name];
    }
  }

  return questions;
};
