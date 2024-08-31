import { Language } from './types.ts';

describe('getLanguageExtension', () => {
  let getLanguageExtension: (typeof import('./getLanguageExtension.ts'))['getLanguageExtension'];

  beforeEach(async () => {
    ({ getLanguageExtension } = await import('./getLanguageExtension.ts'));
  });

  it('returns "js" for Language.JAVASCRIPT', () => {
    expect(getLanguageExtension(Language.JAVASCRIPT)).toBe('js');
  });

  it('returns "ts" for Language.TYPESCRIPT', () => {
    expect(getLanguageExtension(Language.TYPESCRIPT)).toBe('ts');
  });
});
