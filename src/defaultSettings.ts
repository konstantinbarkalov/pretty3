import { EOL } from 'os';
import { printTreeSettingsT, textPatternString} from './types/general';

export const defaultSettings: printTreeSettingsT = {
  maxLevel: 6,
  maxItemsAtLevel: 10,
  maxLineWidth: 80,
  arrayItemTextPattern: {other: {first: textPatternString('├─╸'), other: textPatternString('│  ')}, last: {first: textPatternString('└─╸'), other: textPatternString('   ')}},
  objectItemTextPattern: {other: {first: textPatternString('├─╴'), other: textPatternString('│  ')}, last: {first: textPatternString('╰─╴'), other: textPatternString('   ')}},
  maxStringWrapSteps: Infinity,
  logLineCallback: (line: string) => {
    console.log(line)
  },
  tabSize: 4,
  paddingSpace: 0,
  eol: EOL
};
