
import { AnsiRenderer } from '../text/renderer/implementation';
import { template } from './defaultTemplate';
import { printTreeSettingsT } from "../interfaces/general";


export const defaultSettings: printTreeSettingsT = {
  renderer: new AnsiRenderer(), // TODO: Autodetect
  logLineCallback: (line) => { console.log(line); },
  maxLevel: 6,
  maxItemsPerLevel: [30, 10],
  maxLineWidth: 80,
  arrayTemplate: template.array,
  objectTemplate: template.object,
};