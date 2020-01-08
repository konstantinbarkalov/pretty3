import { EOL } from 'os';
import { printTreeSettingsT} from './types/general';


export const defaultSettings: printTreeSettingsT = {
  maxLevel: 6,
  maxItemsAtLevel: 10,
  maxLineWidth: 80,
  arrayItemTextPattern: {other: {first: ' ┝', other: ' │', width: 2}, last: {first: ' ┕', other: '  ', width: 2}},
  objectItemTextPattern: {other: {first: ' ├', other: ' │', width: 2}, last: {first: ' ╰', other: '  ', width: 2}},
  logLineCallback: (line: string) => {
    console.log(line)
  },
  tabSize: 4,
  eol: EOL
};
