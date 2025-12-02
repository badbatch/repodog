import shelljs from 'shelljs';

export const getPackageVersionsOnNpm = (name: string): string[] => {
  const output = shelljs.exec(`npm view ${name} versions --json`, { silent: true }).stdout.trim();

  if (!output) {
    return [];
  }

  // JSON.parse returns an any type
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return JSON.parse(output) as string[];
};
