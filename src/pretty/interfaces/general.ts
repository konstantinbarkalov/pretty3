import { Renderer } from '../../text/renderer/abstract/renderer';
import { StrictUnicodeChar, StrictUnicodeLine, StrictUnicodeText } from '../../text/strictUnicode';
import { themeT } from './theme';

export type logLineCallbackT = (line: string, trailingEol: string) => void;

export type buildMetaTreeSettingsT = {
  maxLevel: number;
  maxItemsPerLevel: number[] | number;
  maxLineWidth: number;
};

export type stringifyTreeSettingsT = buildMetaTreeSettingsT & {
  renderer: Renderer;
}
export type printTreeSettingsT = stringifyTreeSettingsT & {
  logLineCallback: logLineCallbackT;
};

export type oneshotStringifyTreeSettingsT = stringifyTreeSettingsT & {
  themeStack: themeT[];
}
export type oneshotPrintTreeSettingsT = printTreeSettingsT & {
  themeStack: themeT[];
}

export type buildMetaTreeOptionsT = Partial<buildMetaTreeSettingsT>;
export type stringifyTreeOptionsT = Partial<stringifyTreeSettingsT>;
export type printTreeOptionsT = Partial<printTreeSettingsT>;
export type oneshotStringifyTreeOptionsT = Partial<oneshotStringifyTreeSettingsT>;
export type oneshotPrintTreeOptionsT = Partial<oneshotPrintTreeSettingsT>;


export  type consumableCharT = string | StrictUnicodeChar;
export  type consumableLineT = string | StrictUnicodeLine;
export  type consumableTextT = string | StrictUnicodeText;
export  type consumableIconCharsT = string | [consumableCharT, consumableCharT, consumableCharT];
