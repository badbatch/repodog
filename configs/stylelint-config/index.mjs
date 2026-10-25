import { fileURLToPath } from 'node:url';

const resolvePath = name => fileURLToPath(import.meta.resolve(name));

// Required by StyleLint
// eslint-disable-next-line import-x/no-default-export
export default {
  extends: [
    resolvePath('stylelint-config-standard'),
    resolvePath('stylelint-config-standard-scss'),
    resolvePath('stylelint-config-recess-order'),
    resolvePath('stylelint-config-css-modules'),
  ],
};
