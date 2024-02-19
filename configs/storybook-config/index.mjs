export const config = ({ compiler = [] } = {}) => {
  const [name, options = {}] = Array.isArray(compiler) ? compiler : [compiler];
  const isCompilerSwc = name === 'swc';

  return {
    addons: [
      '@storybook/addon-links',
      '@storybook/addon-essentials',
      '@storybook/addon-onboarding',
      '@storybook/addon-a11y',
      '@storybook/addon-interactions',
    ],
    docs: {
      autodocs: 'tag',
    },
    framework: {
      name: '@storybook/nextjs',
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
    stories: ['../**/*.stories.*'],
    ...(isCompilerSwc ? { swc: () => options } : {}),
  };
};
