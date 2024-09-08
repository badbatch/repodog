import { type PluginItem } from '@babel/core';

type BabelPreset = {
  comments: boolean;
  plugins?: PluginItem[] | null | undefined;
  presets?: PluginItem[] | null | undefined;
}

declare const config: () => BabelPreset;
export = config;
