import { type StorybookConfig } from '@storybook/react-webpack5';
import { globSync } from 'glob';
import { fileURLToPath } from 'node:url';

const resolvePath = (name: string): string => fileURLToPath(import.meta.resolve(name));

export type ConfigParams = {
  compiler?: string | [name: string, options: object];
};

export const config = ({ compiler }: ConfigParams = {}): StorybookConfig => {
  const [name = 'babel', options = {}] = Array.isArray(compiler) ? compiler : [compiler];
  const isCompilerBabel = name === 'babel';
  const isCompilerSwc = name === 'swc';
  console.log(`> Using ${name} compiler`);

  return {
    addons: [
      resolvePath('@storybook/addon-docs'),
      resolvePath('@storybook/addon-a11y'),
      ...(isCompilerBabel
        ? [
            resolvePath('@storybook/addon-webpack5-compiler-babel'),
            {
              name: resolvePath('@storybook/addon-coverage'),
              options: {
                istanbul: {
                  exclude: ['.storybook/**', '**/dist/**', '**/node_modules/**'],
                },
              },
            },
          ]
        : []),
      ...(isCompilerSwc ? [resolvePath('@storybook/addon-webpack5-compiler-swc')] : []),
      {
        name: resolvePath('@storybook/addon-styling-webpack'),
        options: {
          rules: [
            {
              test: /\.css$/,
              use: [
                resolvePath('style-loader'),
                {
                  loader: resolvePath('css-loader'),
                  options: { importLoaders: 1 },
                },
                {
                  loader: resolvePath('postcss-loader'),
                },
              ],
            },
          ],
        },
      },
    ],
    core: {
      disableTelemetry: true,
      disableWhatsNewNotifications: true,
      enableCrashReports: false,
    },
    framework: {
      name: resolvePath('@storybook/react-webpack5'),
      options: {},
    },
    stories: globSync([`../components/**/*.stories.@(js|jsx|ts|tsx)`, '!../**/node_modules/**/*', '!../**/dist/**/*'], {
      cwd: './.storybook',
    }),
    ...(isCompilerBabel && { babel: () => ({ ...options, configFile: false }) }),
    ...(isCompilerSwc && { swc: () => options }),
  };
};
