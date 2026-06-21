import { type PromptOption } from '#types.ts';

export const enrichQuestions = (
  questions: PromptOption[],
  answers: Record<string, string | number | boolean>,
): PromptOption[] => {
  for (const question of questions) {
    if (Object.hasOwn(answers, question.name)) {
      question.initial = answers[question.name];
    }
  }

  return questions;
};
