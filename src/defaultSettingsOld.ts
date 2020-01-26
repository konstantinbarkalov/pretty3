import { EOL } from 'os';
import { AutodetectRenderer } from './text/renderer/implementation';
import { printTreeSettingsOldT, textPatternString } from './interfaces/general';

export const defaultSettings: printTreeSettingsOldT = {
  renderer: new AutodetectRenderer(),
  maxLevel: 6,
  maxItemsPerLevel: [30, 10],
  maxLineWidth: 80,
  arrayItemTextPattern: {
    other: {
      first: textPatternString('├─╸'),
      other: textPatternString('│  ') },
    last: {
      first: textPatternString('└─╸'),
      other: textPatternString('   ') }
  },
  objectItemTextPattern: {
    other: {
      first: textPatternString('├─╴'),
      other: textPatternString('│  ') },
    last: {
      first: textPatternString('╰─╴'),
      other: textPatternString('   ') }
  },
  logLineCallback: (line: string) => {
    console.log(line);
  },
  tabSize: 4,
  paddingSpace: 0,
  eol: EOL
};

export default defaultSettings;