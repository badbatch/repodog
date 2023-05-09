import { isAbsolute, resolve } from 'node:path';

export const resolveAbsolutePath = (path: string) => (isAbsolute(path) ? path : resolve(process.cwd(), path));
