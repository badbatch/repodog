export const config = ({ compiler } = {}) => ({
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
    ...(compiler === 'swc'
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
});
