import {
  Language,
  calculateDuration,
  getPackageManager,
  loadRepodogConfig,
  setVerbose,
  verboseLog,
} from '@repodog/cli-utils';
import colors from 'ansi-colors';
import { readFileSync } from 'node:fs';
import { parse, resolve } from 'node:path';
import { performance } from 'node:perf_hooks';
import shelljs from 'shelljs';
import { type WriteHandlerArguments } from './types.ts';
import { createChatCompletion } from './utils/chatGptManager.ts';
import { extractCode } from './utils/extractCode.ts';
import { getMessagesByType } from './utils/getMessagesByType.ts';
import { VALID_WRITE_TYPES, isValidWriteType } from './utils/isValidWriteType.ts';
import { writeTestFile } from './utils/writeTestFile.ts';

export const handler = async (argv: WriteHandlerArguments) => {
  const startTime = performance.now();
  const skipFormat = argv['skip-format'] ?? false;
  const verbose = argv.verbose ?? false;

  setVerbose(verbose);
  verboseLog('>>>> USER CONFIG START <<<<');
  verboseLog(`filePath: ${argv['file-path']}`);
  verboseLog(`skipFormat: ${String(skipFormat)}`);
  verboseLog(`type: ${argv.type}`);
  verboseLog('>>>> USER CONFIG END <<<<\n');

  try {
    if (!isValidWriteType(argv.type)) {
      throw new Error(`Expected type to be a valid write type: ${VALID_WRITE_TYPES.join(', ')}`);
    }

    const packageManager = getPackageManager();

    if (!packageManager) {
      throw new Error('Could not derive the package manager from the lock file in the current working directory');
    }

    const filePath = resolve(process.cwd(), argv['file-path']);

    verboseLog('>>>> DERIVED VALUES START <<<<');
    verboseLog(`Package manager: ${packageManager}`);
    verboseLog(`File path: ${filePath}`);
    verboseLog('>>>> DERIVED VALUES END <<<<\n');

    const { environmentVariablesPath = '.env', language = Language.JAVASCRIPT } = loadRepodogConfig();

    verboseLog('>>>> CONFIG VALUES START <<<<');
    verboseLog(`Environment variables path: ${environmentVariablesPath}`);
    verboseLog(`Language: ${language}`);
    verboseLog('>>>> CONFIG VALUES ENDS <<<<');

    const { base, dir, name } = parse(filePath);
    const fileContents = readFileSync(filePath, { encoding: 'utf8' });
    const messages = getMessagesByType(argv.type, base, fileContents, language);

    verboseLog(`Loaded file contents:\n${fileContents}`);
    verboseLog(`Chat messages:\n${JSON.stringify(messages, undefined, 2)}`);
    const rawAnswer = await createChatCompletion(messages, environmentVariablesPath);

    verboseLog(`Raw answer:\n${rawAnswer}`);
    const code = extractCode(rawAnswer);

    if (!code) {
      throw new Error('Code could not be extracted from raw answer.');
    }

    verboseLog(`Answer code:\n${code}`);
    await writeTestFile(dir, name, code, { language, packageManager, skipFormat });

    verboseLog(`Handler duration: ${String(calculateDuration(startTime))}sec`);
    return shelljs.exit(0);
  } catch (error: unknown) {
    shelljs.echo(
      `${colors.magenta('RepoDog')} ${colors.dim('=>')} ${colors.red(`Error: ${(error as Error).message}`)}`
    );

    verboseLog(`Handler duration: ${String(calculateDuration(startTime))}sec`);
    return shelljs.exit(1);
  }
};
