import { getLanguageExtension } from './getLanguageExtension.ts';
import { Language } from './types.ts';

describe('getLanguageExtension', () => {
  it('returns "js" for Language.JAVASCRIPT', () => {
    expect(getLanguageExtension(Language.JAVASCRIPT)).toBe('js');
  });

  it('returns "ts" for Language.TYPESCRIPT', () => {
    expect(getLanguageExtension(Language.TYPESCRIPT)).toBe('ts');
  });
});
