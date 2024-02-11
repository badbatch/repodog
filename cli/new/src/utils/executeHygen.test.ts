import { jest } from '@jest/globals';
import { stringifyCliOptions } from '@repodog/cli-utils';

jest.unstable_mockModule('@repodog/cli-utils', () => ({
  asyncExec: jest.fn(),
  resolveAbsolutePath: (path: string) => path,
  stringifyCliOptions,
  verboseLog: jest.fn(),
}));

describe('executeHygen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when the type path has a length greater than 2', () => {
    let asyncExec: jest.Mocked<typeof import('@repodog/cli-utils')['asyncExec']>;

    beforeEach(async () => {
      ({ asyncExec } = jest.mocked(await import('@repodog/cli-utils')));
    });

    it('should call asyncExec with the correct command', async () => {
      const { executeHygen } = await import('./executeHygen.ts');

      await executeHygen('root/_templates', 'root/node_modules/bin/hygen', ['new', 'repo', 'library'], {
        alpha: 'foxtrot',
        charlie: 23,
        delta: true,
        echo: false,
        foxtrot: 'golf',
        hotel: true,
      });

      expect(asyncExec).toHaveBeenCalledWith(
        'HYGEN_TMPLS=root/_templates/new root/node_modules/bin/hygen repo library --alpha "foxtrot" --charlie "23" --delta --foxtrot "golf" --hotel'
      );
    });
  });

  describe('when the type path has a length equal to or leess than 2', () => {
    let asyncExec: jest.Mocked<typeof import('@repodog/cli-utils')['asyncExec']>;

    beforeEach(async () => {
      ({ asyncExec } = jest.mocked(await import('@repodog/cli-utils')));
    });

    it('should call asyncExec with the correct command', async () => {
      const { executeHygen } = await import('./executeHygen.ts');

      await executeHygen('root/_templates', 'root/node_modules/bin/hygen', ['new', 'pkg'], {
        alpha: 'foxtrot',
        charlie: 23,
        delta: true,
        echo: false,
        foxtrot: 'golf',
        hotel: true,
      });

      expect(asyncExec).toHaveBeenCalledWith(
        'HYGEN_TMPLS=root/_templates root/node_modules/bin/hygen new pkg --alpha "foxtrot" --charlie "23" --delta --foxtrot "golf" --hotel'
      );
    });
  });
});
