import { resolve } from 'node:path';
import { loadPackageJson } from './loadPackageJson.ts';

export const isRunWithinProject = () => {
  try {
    loadPackageJson(resolve(process.cwd(), 'package.json'));
    return true;
  } catch {
    return false;
  }
};
