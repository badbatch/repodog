import { omitBy } from 'lodash-es';

export const removeEmptyAnswers = (
  answers: Record<string, string | number | boolean>,
): Record<string, string | number | boolean> => omitBy(answers, value => value === '');
