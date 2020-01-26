import { FlatNonatomicTextContainer } from '../text/textContainer';
import { StrictUnicodeLine } from '../text/strictUnicode';
import { Renderer } from '../text/renderer/abstract/renderer';
import { MetaNode } from '../meta/node';
import { ArmGeneratorI, ArmWidthGeneratorI } from '../meta/interfaces/arm/armGenerator';
export type lineT = Readonly<string>;
export type linesT = Readonly<lineT[]>;
export type unbreakedLinesT = Readonly<[lineT]>;
export type itemTextPatternT = {other: textPatternT; last: textPatternT}
export type textPatternStringT = string & {length: 3};
export type textPatternT = {
  first: textPatternStringT;
  other: textPatternStringT;
}

export type paddingPrefixT = {
  first: FlatNonatomicTextContainer<StrictUnicodeLine>;
  other: FlatNonatomicTextContainer<StrictUnicodeLine>;
}

export function textPatternString(text: string): textPatternStringT {
  if (guardTextPatternString(text)) {
    return text;
  } else {
    throw new Error('textPatternString must be strictly 3 chars');
  }
}

export function guardTextPatternString(text: string): text is textPatternStringT {
  return text.length === 3;
}

export type stringifyTreeSettingsOldT = {
  renderer: Renderer;
  maxLevel: number;
  maxItemsPerLevel: number[] | number;
  maxLineWidth: number;
  arrayItemTextPattern: itemTextPatternT;
  objectItemTextPattern: itemTextPatternT;
  tabSize: number;
  paddingSpace: number;
  eol: string;
}

export type stringifyTreeOptionsOldT = Partial<stringifyTreeSettingsOldT>;
export type logLineCallbackT = (line: string) => void;
export type printTreeSettingsOldT = stringifyTreeSettingsOldT & {
  logLineCallback: logLineCallbackT;
}

export type printTreeOptionsOldT = Partial<printTreeSettingsOldT>;
export type maxLineWidthT = {
  first: number;
  other: number;
}


//// new way
export type metaNodeTemplateT = {
  armGenerator: ArmGeneratorI<MetaNode>;
  armWidthGenerator: ArmWidthGeneratorI<MetaNode>;
}
export type buildMetaTreeSettingsT = {
  maxLevel: number;
  maxItemsPerLevel: number[] | number;
  maxLineWidth: number;
  arrayTemplate: metaNodeTemplateT;
  objectTemplate: metaNodeTemplateT;
}

export type buildMetaTreeOptionsT = Partial<buildMetaTreeSettingsT>;

export type printTreeSettingsT = buildMetaTreeSettingsT & {
  renderer: Renderer;
  logLineCallback: logLineCallbackT;
}
export type printTreeOptionsT = Partial<printTreeSettingsT>;