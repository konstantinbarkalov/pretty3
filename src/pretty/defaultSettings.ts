
import { AutodetectRenderer } from '../text/renderer/implementation';
import { oneshotPrintTreeSettingsT } from './interfaces/general';
import { defaultTheme } from './theme/themes';
import { noSimplestIcon } from './theme/themes/mods';

/**
 * Base settings, that is used as aa fallback when assigning partial options
 * Type of settings is `oneshotPrintTreeSettingsT` beacause it's a widest case,
 * and all other `.print()` and `.stringify()` (both oneshot-static and constructed instance)
 * will consume 'oneshotPrintTreeSettingsT' as thier base level as well
 *
 * @export
 * @constant {printTreeOptionsT} defaultSettings
 */
export const defaultSettings: oneshotPrintTreeSettingsT = {
  renderer: new AutodetectRenderer(),
  logLineCallback: (line) => { console.log(line); },
  maxLevel: 6,
  maxItemsPerLevel: [30, 10],
  maxLineWidth: 80,
  themeStack: [defaultTheme, noSimplestIcon],
};