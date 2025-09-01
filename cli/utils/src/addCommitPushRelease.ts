import { asyncExec } from './asyncExec.ts';

export const addCommitPushRelease = async (version: string): Promise<void> => {
  await asyncExec('git add --all');
  await asyncExec(`git commit --no-verify -m "Release version ${version}."`);
  await asyncExec('git push --no-verify');
  await asyncExec(`git tag -a v${version} -m "Release version ${version}."`);
  await asyncExec(`git push origin v${version} --no-verify`);
};
