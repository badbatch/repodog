import { jest } from '@jest/globals';
import { stringifyCliOptions } from '@repodog/cli-utils';

jest.unstable_mockModule('@repodog/cli-utils', () => ({
  asyncExec: jest.fn(),
  stringifyCliOptions,
  verboseLog: jest.fn(),
}));

describe('executeHygen', () => {
  let asyncExec: jest.Mocked<typeof import('@repodog/cli-utils')['asyncExec']>;

  beforeEach(async () => {
    jest.resetAllMocks();
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
