export type linesT = string[];

export type itemTextPatternT = {other: textPatternT, last:textPatternT}

export type textPatternT = {
  first: string,
  other: string,
  width: number,
}
export type stringifyTreeSettingsT = {
  maxLevel: number,
  maxItemsAtLevel: number,
  maxLineWidth: number,
  arrayItemTextPattern: itemTextPatternT,
  objectItemTextPattern: itemTextPatternT,
  tabSize: number,
  eol: string,
}
export type stringifyTreeOptionsT = Partial<stringifyTreeSettingsT>;

export type logLineCallbackT = (line:string) => void;
export type printTreeSettingsT = stringifyTreeSettingsT & {
  logLineCallback: logLineCallbackT,
}
export type printTreeOptionsT = Partial<printTreeSettingsT>;

