
import { AnsiRenderer } from '../text/renderer/implementation';
import { template } from './defaultTemplate';
import { printTreeSettingsT } from './interfaces/general';
import { fullIconset } from './defaultFullIconset';


export const defaultSettings: printTreeSettingsT = {
  renderer: new AnsiRenderer(), // TODO: Autodetect
  logLineCallback: (line) => { console.log(line); },
  maxLevel: 6,
  maxItemsPerLevel: [30, 10],
  maxLineWidth: 40,
  arrayTemplate: template.array,
  objectTemplate: template.object,
  otherTemplate: template.other,
  fullIconset: fullIconset,
};