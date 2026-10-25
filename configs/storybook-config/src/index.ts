import { type StorybookConfig } from '@storybook/react-webpack5';
import { globSync } from 'glob';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const resolvePath = (name: string): string => fileURLToPath(import.meta.resolve(name));

const resolveAddOnPath = (packageName: string): string =>
  dirname(fileURLToPath(import.meta.resolve(`${packageName}/package.json`)));

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
      resolveAddOnPath('@storybook/addon-docs'),
      resolveAddOnPath('@storybook/addon-a11y'),
      ...(isCompilerBabel
        ? [
            resolveAddOnPath('@storybook/addon-webpack5-compiler-babel'),
            {
              name: resolveAddOnPath('@storybook/addon-coverage'),
              options: {
                istanbul: {
                  exclude: ['.storybook/**', '**/dist/**', '**/node_modules/**'],
                },
              },
            },
          ]
        : []),
      ...(isCompilerSwc ? [resolveAddOnPath('@storybook/addon-webpack5-compiler-swc')] : []),
      {
        name: resolveAddOnPath('@storybook/addon-styling-webpack'),
        options: {
          rules: [
            {
              test: /\.module\.css$/,
              use: [
                resolvePath('style-loader'),
                {
                  loader: resolvePath('css-loader'),
                  options: {
                    importLoaders: 1,
                    modules: true,
                  },
                },
                {
                  loader: resolvePath('postcss-loader'),
                },
              ],
            },
            {
              exclude: /\.module\.css$/,
              test: /\.css$/,
              use: [
                resolvePath('style-loader'),
                {
                  loader: resolvePath('css-loader'),
                  options: {
                    importLoaders: 1,
                  },
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
      name: resolveAddOnPath('@storybook/react-webpack5'),
      options: {},
    },
    stories: globSync([`../components/**/*.stories.@(js|jsx|ts|tsx)`, '!../**/node_modules/**/*', '!../**/dist/**/*'], {
      cwd: './.storybook',
    }),
    ...(isCompilerBabel && { babel: () => ({ ...options, configFile: false }) }),
    ...(isCompilerSwc && { swc: () => options }),
  };
};
