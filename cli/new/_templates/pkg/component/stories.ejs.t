---
to: "<%= typeof overrideTemplate_main_ejs_t !== 'undefined' ? null : `${path}/src/${h.changeCase.pascal(name)}.stories.tsx` %>"
---
import { type Meta, type StoryObj } from '@storybook/react';
import { <%= h.changeCase.pascal(name) %> } from './<%= h.changeCase.pascal(name) %>.tsx';

const meta: Meta<typeof <%= h.changeCase.pascal(name) %>> = {
  argTypes: {},
  component: <%= h.changeCase.pascal(name) %>,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: '<%= h.changeCase.pascal(name) %>',
};

// Storybook requires this to be default export.
// eslint-disable-next-line import/no-default-export
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
