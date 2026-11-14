import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { isArray, isObjectType, isString } from 'remeda';
import { type BootstrapManifest, type BootstrapOmission, type BootstrapReplacement } from '../types.ts';

const areBootstrapReplacements = (value: unknown): value is BootstrapReplacement[] =>
  isArray(value) &&
  value.every(
    (entry: unknown) =>
      isObjectType(entry) &&
      'from' in entry &&
      isString(entry.from) &&
      entry.from.length > 0 &&
      'to' in entry &&
      isString(entry.to),
  );

const isStringArray = (value: unknown): value is string[] => isArray(value) && value.every(isString);

const isBootstrapOmissionMap = (value: unknown): value is Record<string, BootstrapOmission> =>
  isObjectType(value) &&
  Object.values(value).every((entry: unknown) => {
    if (
      !isObjectType(entry) ||
      !('exclude' in entry) ||
      !isStringArray(entry.exclude) ||
      !('fileReplacements' in entry) ||
      !areBootstrapReplacements(entry.fileReplacements)
    ) {
      return false;
    }

    return entry.fileReplacements.every(replacement => 'file' in replacement && isString(replacement.file));
  });

const getValidBootstrapManifestOrThrow = (value: unknown): BootstrapManifest => {
  if (
    !isObjectType(value) ||
    !('version' in value) ||
    value.version !== 1 ||
    !('files' in value) ||
    !isStringArray(value.files) ||
    !('exclude' in value) ||
    !isStringArray(value.exclude) ||
    !('replacements' in value) ||
    !areBootstrapReplacements(value.replacements) ||
    !('renamePaths' in value) ||
    !areBootstrapReplacements(value.renamePaths) ||
    ('whenMissing' in value && !isBootstrapOmissionMap(value.whenMissing))
  ) {
    throw new Error('Expected a version 1 .repodog-bootstrap.json manifest.');
  }

  return {
    exclude: value.exclude,
    files: value.files,
    renamePaths: value.renamePaths,
    replacements: value.replacements,
    version: 1,
    ...('whenMissing' in value && isBootstrapOmissionMap(value.whenMissing) && { whenMissing: value.whenMissing }),
  };
};

export const loadValidBootstrapManifestOrThrow = async (source: string): Promise<BootstrapManifest> => {
  const manifestText = await readFile(resolve(source, '.repodog-bootstrap.json'), 'utf8');
  return getValidBootstrapManifestOrThrow(JSON.parse(manifestText));
};
