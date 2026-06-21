import { isString } from 'lodash-es';
import shelljs from 'shelljs';

const isArrayOfStrings = (list: unknown[]): list is string[] => list.every(entry => isString(entry));

export const getPackageVersionsOnNpm = (name: string): string[] => {
  const output = shelljs.exec(`npm view ${name} versions --json`, { silent: true }).stdout.trim();

  if (!output) {
    return [];
  }

  // JSON.parse returns an any type
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const parsed = JSON.parse(output) as unknown;

  if (!Array.isArray(parsed)) {
    return [];
  }

  if (!isArrayOfStrings(parsed)) {
    return [];
  }

  return parsed;
};
