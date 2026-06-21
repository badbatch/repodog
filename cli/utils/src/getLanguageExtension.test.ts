import { language } from '#constants.ts';
import { getLanguageExtension } from '#getLanguageExtension.ts';

describe('getLanguageExtension', () => {
  it('returns "js" for Language.JAVASCRIPT', () => {
    expect(getLanguageExtension(language.JAVASCRIPT)).toBe('js');
  });

  it('returns "ts" for Language.TYPESCRIPT', () => {
    expect(getLanguageExtension(language.TYPESCRIPT)).toBe('ts');
  });
});
