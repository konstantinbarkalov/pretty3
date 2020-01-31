
import { AutodetectRenderer } from '../text/renderer/implementation';
import { oneshotPrintTreeSettingsT } from './interfaces/general';
import { defaultTheme } from './theme/themes';
import { noSimplestIcon } from './theme/themes/mods';

export const defaultSettings: oneshotPrintTreeSettingsT = {
  renderer: new AutodetectRenderer(),
  logLineCallback: (line) => { console.log(line); },
  maxLevel: 6,
  maxItemsPerLevel: [30, 10],
  maxLineWidth: 80,
  themeStack: [defaultTheme, noSimplestIcon],
};