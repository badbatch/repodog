---
to: .storybook/preview.ts
---
import { preview as repodogPreview } from '@repodog/storybook-config/preview';
import { type Preview } from '@storybook/react';
import '../tailwind.css';

const preview: Preview = {
  ...repodogPreview,
};

// Storybook requires this to be default export.
// eslint-disable-next-line import/no-default-export
export default preview;
