import {
  enrichQuestions,
  flattenTemplateVariables,
  loadRepodogConfig,
  removeEmptyAnswers,
  verboseLog,
} from '@repodog/cli-utils';
import enquirer from 'enquirer';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { type NewHandlerArguments } from '../types.ts';
import { buildTypePaths } from '../utils/buildTypePaths.ts';
import { loadQuestions } from '../utils/loadQuestions.ts';
import { downloadApp } from './downloadApp.ts';
import { getValidAppVariablesOrThrow } from './getValidAppVariablesOrThrow.ts';
import { materializeApp } from './materializeApp/materializeApp.ts';

const sources = {
  dotnet: { ref: 'main', repository: 'badbatch/repodog-dotnet-kickstarter' },
  nextjs: { ref: 'main', repository: 'badbatch/repodog-nextjs-kickstarter' },
};

export const generateApp = async (argv: NewHandlerArguments): Promise<void> => {
  if (argv.subtype !== 'nextjs' && argv.subtype !== 'dotnet') {
    throw new Error('Expected application subtype: nextjs | dotnet');
  }

  if (argv['exclude-builtin-templates']) {
    throw new Error('--exclude-builtin-templates only applies to repo/pkg scaffolding.');
  }

  const config = loadRepodogConfig();
  const { configTypePath, internalTypePath } = buildTypePaths('app', argv.subtype, argv['custom-type-path']);
  const defaults = config.templateVariables ? flattenTemplateVariables(config.templateVariables, configTypePath) : {};
  const questions = loadQuestions(internalTypePath, configTypePath, config.questionOverrides);

  const answers = {
    ...defaults,
    ...removeEmptyAnswers(await enquirer.prompt(enrichQuestions(questions, defaults))),
  };

  const variables = getValidAppVariablesOrThrow(answers);
  const { counterpartRepository, name } = variables;

  const source = config.appBootstraps?.[argv.subtype] ?? sources[argv.subtype];
  const temporary = await mkdtemp(resolve(tmpdir(), 'repodog-source-'));

  try {
    const commit = await downloadApp(source, temporary);
    await materializeApp(temporary, resolve(name), variables, { ...source, commit });
    verboseLog(`Created ${name} from ${source.repository}@${commit}.`);

    verboseLog(
      argv.subtype === 'nextjs'
        ? `Next: cd ${name}, then pnpm install and pnpm validate.`
        : `Next: cd ${name}, then dotnet tool restore, dotnet restore and dotnet build.`,
    );

    if (counterpartRepository) {
      verboseLog('Configure CROSS_REPO_READ_TOKEN and reusable-workflow access after publishing the repositories.');
    }
  } finally {
    await rm(temporary, { force: true, recursive: true });
  }
};
