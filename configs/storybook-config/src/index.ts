import { type StorybookConfig } from '@storybook/react-webpack5';
import { globbySync } from 'globby';

export type ConfigParams = {
  compiler?: string | [name: string, options: Record<string, unknown>];
};

export const config = ({ compiler }: ConfigParams = {}): StorybookConfig => {
  const [name = 'babel', options = {}] = Array.isArray(compiler) ? compiler : [compiler];
  const isCompilerBabel = name === 'babel';
  const isCompilerSwc = name === 'swc';
  console.log(`> Using ${name} compiler`);

  return {
    addons: [
      '@storybook/addon-essentials',
      '@storybook/addon-a11y',
      '@storybook/addon-interactions',
      ...(isCompilerBabel
        ? [
            '@storybook/addon-webpack5-compiler-babel',
            {
              name: '@storybook/addon-coverage',
              options: {
                istanbul: {
                  exclude: ['.storybook/**', '**/dist/**', '**/node_modules/**'],
                },
              },
            },
          ]
        : []),
      ...(isCompilerSwc ? ['@storybook/addon-webpack5-compiler-swc'] : []),
    ],
    framework: {
      name: '@storybook/react-webpack5',
      options: {},
    },
    stories: globbySync(
      [`../components/**/*.stories.@(js|jsx|ts|tsx)`, '!../**/node_modules/**/*', '!../**/dist/**/*'],
      {
        cwd: './.storybook',
      },
    ),
    ...(isCompilerBabel ? { babel: () => options } : {}),
    ...(isCompilerSwc ? { swc: () => options } : {}),
  };
};
