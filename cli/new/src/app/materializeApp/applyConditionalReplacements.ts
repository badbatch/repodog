import { type BootstrapOmission } from '../types.ts';
import { applyReplacementsToFileOrThrow } from './applyReplacementsToFileOrThrow.ts';

export const applyConditionalReplacements = async (
  staged: string,
  omissions: BootstrapOmission[],
  variables: Record<string, string>,
): Promise<void> => {
  for (const omission of omissions) {
    for (const replacement of omission.fileReplacements) {
      await applyReplacementsToFileOrThrow(staged, replacement.file, [replacement], variables);
    }
  }
};
