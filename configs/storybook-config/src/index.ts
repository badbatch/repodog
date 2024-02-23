import { type Options as SWCOptions } from '@swc/core';
import { globbySync } from 'globby';

export type ConfigParams = {
  compiler?: string | [name: string, options: SWCOptions];
};

export const config = ({ compiler }: ConfigParams = {}) => {
  const [name, options = {}] = Array.isArray(compiler) ? compiler : [compiler];
  const isCompilerSwc = name === 'swc';

  return {
    addons: [
      '@storybook/addon-links',
      '@storybook/addon-essentials',
      '@storybook/addon-a11y',
      '@storybook/addon-interactions',
    ],
    docs: {
      autodocs: 'tag' as const,
    },
    framework: {
      name: '@storybook/nextjs' as const,
      ...(isCompilerSwc
        ? {
            options: {
              builder: {
                useSWC: true,
              },
            },
          }
        : {}),
    },
    stories: globbySync(
      [`../components/**/*.stories.@(js|jsx|ts|tsx)`, '!../**/node_modules/**/*', '!../**/dist/**/*'],
      {
        cwd: './.storybook',
      }
    ),
    ...(isCompilerSwc ? { swc: () => options } : {}),
  };
};
