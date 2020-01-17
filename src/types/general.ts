import { FlatNonatomicTextContainer } from '../text/textContainer';
import { StrictUnicodeLine } from '../text/strictUnicode';
import { Renderer } from '../text/renderer/abstract/renderer';
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

export type stringifyTreeSettingsT = {
  renderer: Renderer;
  maxLevel: number;
  maxItemsPerLevel: number[] | number;
  maxLineWidth: number;
  arrayItemTextPattern: itemTextPatternT;
  objectItemTextPattern: itemTextPatternT;
  tabSize: number;
  paddingSpace: number;
  eol: string;
  maxStringWrapSteps: number;
}

export type stringifyTreeOptionsT = Partial<stringifyTreeSettingsT>;
export type logLineCallbackT = (line: string) => void;
export type printTreeSettingsT = stringifyTreeSettingsT & {
  logLineCallback: logLineCallbackT;
}

export type printTreeOptionsT = Partial<printTreeSettingsT>;
export type maxLineWidthT = {
  first: number;
  other: number;
}