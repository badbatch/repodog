import { type Preview } from '@storybook/react-webpack5';

export const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
};
