import { Language } from './types.ts';

export const getLanguageExtension = (language: Language): 'js' | 'ts' => {
  switch (language) {
    case Language.JAVASCRIPT: {
      return 'js';
    }

    case Language.TYPESCRIPT: {
      return 'ts';
    }
  }
};
