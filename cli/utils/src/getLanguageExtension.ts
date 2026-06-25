import { type Language } from '#types.ts';

export const getLanguageExtension = (language: Language): 'js' | 'ts' => {
  switch (language) {
    case 'javascript': {
      return 'js';
    }

    case 'typescript': {
      return 'ts';
    }
  }
};
