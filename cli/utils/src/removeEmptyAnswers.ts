import omitBy from 'lodash/omitBy.js';

export const removeEmptyAnswers = (answers: Record<string, string | number | boolean>) =>
  omitBy(answers, value => value === '');
