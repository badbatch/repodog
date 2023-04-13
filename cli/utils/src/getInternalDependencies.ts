import type { PackageJson } from 'type-fest';
import { formatListLogMessage } from './formatListLogMessage.ts';
import type { PackageMetaRecord } from './types.ts';
import { verboseLog } from './verboseLog.ts';

export const getInternalDependencies = (
  { dependencies = {}, devDependencies = {}, peerDependencies = {} }: PackageJson,
  packageMetaRecord: PackageMetaRecord
) => {
  const packageNames = Object.keys(packageMetaRecord);
  const dependencyNames = Object.keys({ ...dependencies, ...devDependencies, ...peerDependencies });
  const internalDependencies = dependencyNames.filter(name => packageNames.includes(name));
  verboseLog(formatListLogMessage(`Internal dependencies`, internalDependencies));
  return internalDependencies;
};
