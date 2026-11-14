import { isAbsolute, relative, resolve, sep } from 'node:path';

export const getValidBootstrapPathOrThrow = (root: string, path: string): string => {
  const target = resolve(root, path);
  const child = relative(root, target);

  if (!child || child === '..' || child.startsWith(`..${sep}`) || isAbsolute(child)) {
    throw new Error(`Bootstrap path must stay inside its application: ${path}`);
  }

  return target;
};
