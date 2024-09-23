import { jest } from '@jest/globals';
import { stringifyCliOptions } from '@repodog/cli-utils';

jest.unstable_mockModule('@repodog/cli-utils', () => ({
  asyncExec: jest.fn(),
  resolveAbsolutePath: (path: string) => path,
  stringifyCliOptions,
  verboseLog: jest.fn(),
}));

const { asyncExec } = jest.mocked(await import('@repodog/cli-utils'));
const { executeHygen } = await import('./executeHygen.ts');

describe('executeHygen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when the type path has a length greater than 2', () => {
    it('should call asyncExec with the correct command', async () => {
      await executeHygen('root/_templates', 'root/node_modules/bin/hygen', ['new', 'repo', 'library'], {
        alpha: 'foxtrot',
        charlie: 23,
        delta: true,
        echo: false,
        foxtrot: 'golf',
        hotel: true,
      });

      expect(asyncExec).toHaveBeenCalledWith(
        'HYGEN_TMPLS=root/_templates/new root/node_modules/bin/hygen repo library --alpha "foxtrot" --charlie "23" --delta --foxtrot "golf" --hotel',
      );
    });
  });

  describe('when the type path has a length equal to or leess than 2', () => {
    it('should call asyncExec with the correct command', async () => {
      await executeHygen('root/_templates', 'root/node_modules/bin/hygen', ['new', 'pkg'], {
        alpha: 'foxtrot',
        charlie: 23,
        delta: true,
        echo: false,
        foxtrot: 'golf',
        hotel: true,
      });

      expect(asyncExec).toHaveBeenCalledWith(
        'HYGEN_TMPLS=root/_templates root/node_modules/bin/hygen new pkg --alpha "foxtrot" --charlie "23" --delta --foxtrot "golf" --hotel',
      );
    });
  });
});
