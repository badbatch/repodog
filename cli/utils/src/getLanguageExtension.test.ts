import { Language } from './types.js';

describe('getLanguageExtension', () => {
  let getLanguageExtension: typeof import('./getLanguageExtension.js')['getLanguageExtension'];

  beforeEach(async () => {
    ({ getLanguageExtension } = await import('./getLanguageExtension.js'));
  });

  it('returns "js" for Language.JAVASCRIPT', () => {
    expect(getLanguageExtension(Language.JAVASCRIPT)).toEqual('js');
  });

  it('returns "ts" for Language.TYPESCRIPT', () => {
    expect(getLanguageExtension(Language.TYPESCRIPT)).toEqual('ts');
  });
});
