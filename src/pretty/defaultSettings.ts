
import { AnsiRenderer } from '../text/renderer/implementation';
import { templateDictionary } from './defaultTemplate';
import { printTreeSettingsT } from './interfaces/general';
import { iconDictionary } from './defaultFullIconset';


export const defaultSettings: printTreeSettingsT = {
  renderer: new AnsiRenderer(), // TODO: Autodetect
  logLineCallback: (line) => { console.log(line); },
  maxLevel: 6,
  maxItemsPerLevel: [30, 10],
  maxLineWidth: 80,
  templateDictionary: templateDictionary,
  iconDictionary: iconDictionary,
};