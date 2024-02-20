import { handler as postinstallHandler } from '@repodog/cli-postinstall';
import { handleGlobalConfigSetup } from '@repodog/cli-setup';
import {
  Language,
  calculateDuration,
  enrichQuestions,
  flattenTemplateVariables,
  getPackageManager,
  getPackageManagerTemporaryCmd,
  hasGlobalRepodogConfig,
  isRunWithinProject,
  loadRepodogConfig,
  removeEmptyAnswers,
  resolveAbsolutePath,
  setVerbose,
  verboseLog,
} from '@repodog/cli-utils';
import colors from 'ansi-colors';
import enquirer from 'enquirer';
import { dirname, resolve as resolvePath, sep } from 'node:path';
import { performance } from 'node:perf_hooks';
import { fileURLToPath } from 'node:url';
import shelljs from 'shelljs';
import { type CliOptions, type NewHandlerArguments, NewSubtype, NewType } from './types.ts';
import { buildTypePaths } from './utils/buildTypePaths.ts';
import { compileAdditionalTemplateOverrides } from './utils/compileAdditionalTemplateOverrides.ts';
import { conditionallyChangeCwd } from './utils/conditionallyChangeCwd.ts';
import { executeHygen } from './utils/executeHygen.ts';
import { getLeafAdditionalTemplatesPath } from './utils/getLeafAdditionalTemplatesPath.ts';
import { isValidNewSubType } from './utils/isValidNewSubType.ts';
import { isValidNewType } from './utils/isValidNewType.ts';
import { loadQuestions } from './utils/loadQuestions.ts';

export const handler = async (argv: NewHandlerArguments) => {
  const startTime = performance.now();
  const verbose = argv.verbose ?? false;
  const customTypePath = argv['custom-type-path'] ?? undefined;
  const excludeBuiltinTemplates = argv['exclude-builtin-templates'] ?? false;

  if (!isRunWithinProject() && !hasGlobalRepodogConfig()) {
    await handleGlobalConfigSetup();
  }

  setVerbose(verbose);
  verboseLog('>>>> USER CONFIG START <<<<');
  verboseLog(`customTypePath: ${customTypePath ?? 'undefined'}`);
  verboseLog(`excludeBuiltinTemplates: ${String(excludeBuiltinTemplates)}`);
  verboseLog(`subtype: ${argv.subtype}`);
  verboseLog(`type: ${argv.type}`);
  verboseLog('>>>> USER CONFIG END <<<<\n');

  try {
    if (!isValidNewType(argv.type)) {
      throw new Error(`Expected type to be a valid new type: ${Object.values(NewType).join(', ')}`);
    }

    if (!isValidNewSubType(argv.subtype)) {
      throw new Error(`Expected subtype to be a valid new subtype: ${Object.values(NewSubtype).join(', ')}`);
    }

    const subtype = argv.subtype;
    const type = argv.type;
    const packageManager = getPackageManager();

    if (!packageManager) {
      throw new Error('Could not derive the package manager');
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
      `Question overrides:${questionOverrides ? `\n${JSON.stringify(questionOverrides, undefined, 2)}\n` : ' None'}`
    );

    verboseLog(`Template overrides path: ${additionalTemplatesPath ?? 'None'}`);

    verboseLog(
      `Template variables:${templateVariables ? `\n${JSON.stringify(templateVariables, undefined, 2)}\n` : ' None'}`
    );

    verboseLog('>>>> CONFIG VALUES ENDS <<<<');

    const { configTypePath, externalTypePath, internalTypePath } = buildTypePaths(type, subtype, customTypePath);
    verboseLog(`internalTypePath: ${internalTypePath.join('.')}`);
    verboseLog(`configTypePath: ${configTypePath.join('.')}`);
    verboseLog(`externalTypePath: ${externalTypePath.join('.')}`);
    let flattenedTemplateVariables: Record<string, string | number | boolean> = {};

    if (templateVariables) {
      flattenedTemplateVariables = flattenTemplateVariables(templateVariables, configTypePath);
      verboseLog(`Flattened template variables:\n${JSON.stringify(flattenedTemplateVariables, undefined, 2)}\n`);
    }

    const questions = await loadQuestions(internalTypePath, configTypePath, questionOverrides);
    verboseLog(`Questions:\n${JSON.stringify(questions, undefined, 2)}\n`);
    const leafAdditionalTemplatesPath = getLeafAdditionalTemplatesPath(additionalTemplatesPath, externalTypePath);

    if (leafAdditionalTemplatesPath) {
      verboseLog(`Leaf additional templates path: ${leafAdditionalTemplatesPath}`);
    }

    const cliOptions: CliOptions = {
      excludeTypesFile: false,
      ...flattenedTemplateVariables,
      ...removeEmptyAnswers(await enquirer.prompt(enrichQuestions(questions, flattenedTemplateVariables))),
      ...(leafAdditionalTemplatesPath
        ? {
            ...compileAdditionalTemplateOverrides(
              leafAdditionalTemplatesPath,
              resolveAbsolutePath([templatesPath, ...internalTypePath].join(sep))
            ),
          }
        : {}),
      language,
      newSubType: subtype,
      newType: type,
      packageManager,
      packageManagerTemporaryCmd: getPackageManagerTemporaryCmd(packageManager),
    };

    if (type === NewType.REPO) {
      conditionallyChangeCwd(cliOptions.name as string);
    }

    verboseLog(`Hygen cli options:\n${JSON.stringify(cliOptions, undefined, 2)}\n`);

    if (excludeBuiltinTemplates) {
      verboseLog('Built-in templates have been excluded from scaffolding.');
    } else {
      await executeHygen(templatesPath, hygenPath, internalTypePath, cliOptions);
    }

    if (additionalTemplatesPath && leafAdditionalTemplatesPath) {
      verboseLog('Template overrides path exists, re-running hygen with new path');
      await executeHygen(additionalTemplatesPath, hygenPath, externalTypePath, cliOptions);
    }

    if (argv.type === NewType.REPO) {
      await postinstallHandler({ subtype: argv.subtype, type: argv.type, verbose });
    }

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
