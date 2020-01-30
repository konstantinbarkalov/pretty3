import { Renderer } from '../../text/renderer/abstract/renderer';
import { logLineCallbackT } from '../../deprecated/generalOld';
import { StrictUnicodeChar, StrictUnicodeLine, StrictUnicodeText } from '../../text/strictUnicode';

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

export type buildMetaTreeOptionsT = Partial<buildMetaTreeSettingsT>;
export type stringifyTreeOptionsT = Partial<stringifyTreeSettingsT>;
export type printTreeOptionsT = Partial<printTreeSettingsT>;


export  type consumableCharT = string | StrictUnicodeChar;
export  type consumableLineT = string | StrictUnicodeLine;
export  type consumableTextT = string | StrictUnicodeText;
export  type consumableIconCharsT = string | [consumableCharT, consumableCharT, consumableCharT];
