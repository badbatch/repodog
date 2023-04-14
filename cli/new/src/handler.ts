import {
  Language,
  calculateDuration,
  flattenTemplateVariables,
  getPackageManager,
  getPackageManagerTemporaryCmd,
  loadRepodogConfig,
  setVerbose,
  verboseLog,
} from '@repodog/cli-utils';
import colors from 'ansi-colors';
import enquirer from 'enquirer';
import { existsSync } from 'node:fs';
import { dirname, resolve as resolvePath } from 'node:path';
import { performance } from 'node:perf_hooks';
import { fileURLToPath } from 'node:url';
import shelljs from 'shelljs';
import { type NewHandlerArguments, NewType } from './types.ts';
import { enrichQuestions } from './utils/enrichQuestions.ts';
import { executeHygen } from './utils/executeHygen.ts';
import { VALID_NEW_SUBTYPES, isValidNewSubtype } from './utils/isValidNewSubtype.ts';
import { VALID_NEW_TYPES, isValidNewType } from './utils/isValidNewType.ts';
import { loadQuestions } from './utils/loadQuestions.ts';

export const handler = async (argv: NewHandlerArguments) => {
  const startTime = performance.now();
  const verbose = argv.verbose ?? false;
  const customTypePath = argv['custom-type-path'] ?? '';

  setVerbose(verbose);
  verboseLog('>>>> USER CONFIG START <<<<');
  verboseLog(`customTypePath: ${customTypePath || 'undefined'}`);
  verboseLog(`subtype: ${argv.subtype ?? 'undefined'}`);
  verboseLog(`type: ${argv.type}`);
  verboseLog('>>>> USER CONFIG END <<<<\n');

  try {
    if (!isValidNewType(argv.type)) {
      throw new Error(`Expected type to be a valid new type: ${VALID_NEW_TYPES.join(', ')}`);
    }

    if (argv.type === NewType.REPO && !isValidNewSubtype(argv.type, argv.subtype)) {
      throw new Error(
        `Expected subtype to be a valid new ${argv.type} subtype: ${VALID_NEW_SUBTYPES[argv.type].join(', ')}`
      );
    }

    const subtype = argv.subtype ?? '';
    const type = argv.type;
    const packageManager = getPackageManager();

    if (!packageManager) {
      throw new Error('Could not derive the package manager from the lock file in the current working directory');
    }

    const directoryPath = dirname(fileURLToPath(import.meta.url));
    const hygenPath = resolvePath(directoryPath, '../../node_modules/.bin/hygen');
    const templatesPath = resolvePath(directoryPath, '../../_templates');

    verboseLog('>>>> DERIVED VALUES START <<<<');
    verboseLog(`Package manager: ${packageManager}`);
    verboseLog(`Directory path: ${directoryPath}`);
    verboseLog(`Hygen path: ${hygenPath}`);
    verboseLog(`Default templates path: ${templatesPath}`);
    verboseLog('>>>> DERIVED VALUES END <<<<\n');

    const {
      additionalTemplatesPath,
      language = Language.JAVASCRIPT,
      questionOverrides,
      templateVariables,
    } = loadRepodogConfig();

    verboseLog('>>>> CONFIG VALUES START <<<<');

    verboseLog(
      `Question overrides:${questionOverrides ? `\n${JSON.stringify(questionOverrides, undefined, 2)}\n` : 'None'}`
    );

    verboseLog(`Template overrides path: ${additionalTemplatesPath ?? 'None'}`);

    verboseLog(
      `Template variables:${templateVariables ? `\n${JSON.stringify(templateVariables, undefined, 2)}\n` : 'None'}`
    );

    verboseLog('>>>> CONFIG VALUES ENDS <<<<');

    const baseTypePath = subtype ? ['new', type, subtype] : ['new', type];
    const typePath = [...baseTypePath, ...customTypePath.split('.')];
    let flattenedTemplateVariables: Record<string, string | number | boolean> = {};

    if (templateVariables) {
      flattenedTemplateVariables = flattenTemplateVariables(templateVariables, typePath);
      verboseLog(`Flattened template variables:\n${JSON.stringify(flattenedTemplateVariables, undefined, 2)}\n`);
    }

    const questions = await loadQuestions(typePath, questionOverrides);
    verboseLog(`Questions:\n${JSON.stringify(questions, undefined, 2)}\n`);

    const cliOptions: Record<string, boolean | number | string> = {
      ...flattenedTemplateVariables,
      ...(await enquirer.prompt(enrichQuestions(questions, flattenedTemplateVariables))),
      language,
      packageManager,
      packageManagerTemporaryCmd: getPackageManagerTemporaryCmd(packageManager),
    };

    verboseLog(`Hygen cli options:\n${JSON.stringify(cliOptions, undefined, 2)}\n`);
    await executeHygen(templatesPath, hygenPath, baseTypePath, cliOptions);

    if (
      additionalTemplatesPath &&
      existsSync(resolvePath(process.cwd(), [additionalTemplatesPath, ...typePath].join('/')))
    ) {
      verboseLog('Template overrides path exists, re-running hygen with new path');
      await executeHygen(resolvePath(process.cwd(), additionalTemplatesPath), hygenPath, typePath, cliOptions);
    }

    verboseLog(`Handler duration: ${String(calculateDuration(startTime))}sec`);
    return shelljs.exit(0);
  } catch (error: unknown) {
    shelljs.echo(`${colors.magenta('Cutoff')} ${colors.dim('=>')} ${colors.red(`Error: ${(error as Error).message}`)}`);
    verboseLog(`Handler duration: ${String(calculateDuration(startTime))}sec`);
    return shelljs.exit(1);
  }
};
