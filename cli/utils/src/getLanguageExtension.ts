import { Language } from './types.ts';

export const getLanguageExtension = (language: Language) => {
  switch (language) {
    case Language.JAVASCRIPT: {
      return 'js';
    }

    case Language.TYPESCRIPT: {
      return 'ts';
    }
  }
};
