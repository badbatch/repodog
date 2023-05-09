import colors from 'ansi-colors';

export const formatListLogMessage = (fieldName: string, fieldValues: string[]) =>
  `${fieldName}:${
    fieldValues.length > 0
      ? `\n          ${colors.dim('>')} ${fieldValues.join(`\n          ${colors.dim('>')} `)}`
      : ' None'
  }`;
