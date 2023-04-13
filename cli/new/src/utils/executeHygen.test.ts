import { jest } from '@jest/globals';
import { stringifyCliOptions } from '@repodog/cli-utils';

jest.unstable_mockModule('@repodog/cli-utils', () => ({
  asyncExec: jest.fn(),
  stringifyCliOptions,
  verboseLog: jest.fn(),
}));

describe('executeHygen', () => {
  let mockedAsyncExec: jest.MockedFunction<(cmd: string) => Promise<string>>;

  beforeEach(async () => {
    const { asyncExec } = await import('@repodog/cli-utils');
    mockedAsyncExec = jest.mocked(asyncExec);
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

    expect(mockedAsyncExec).toHaveBeenCalledWith(
      'HYGEN_TMPLS=root/_templates root/node_modules/bin/hygen new pkg --alpha "foxtrot" --charlie "23" --delta --foxtrot "golf" --hotel'
    );
  });
});
