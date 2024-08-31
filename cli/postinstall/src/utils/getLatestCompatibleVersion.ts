import { asyncExec } from '@repodog/cli-utils';
import { isString } from 'lodash-es';

const getRange = (semver: string) => {
  const max = Number(semver.slice(1));
  return max === 1 ? `<${String(max)}` : `${String(max - 1)}.x.x`;
};

export const getLatestCompatibleVersion = async (name: string, semver: string) => {
  try {
    const output = JSON.parse(await asyncExec(`npm view ${name}@"${getRange(semver)}" version --json`)) as
      | string[]
      | string;

    return isString(output) ? output : output.at(-1);
  } catch {
    return;
  }
};
