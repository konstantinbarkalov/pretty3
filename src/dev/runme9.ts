import { prebuildTheme } from '../pretty/nodeTheme/prebuild';
import { theme as defaultTheme } from '../pretty/nodeTheme/defaultTheme';
import { nodePrebuildedThemeT } from '../pretty/interfaces/prebuildedTheme';
import { templateDictionary } from '../pretty/defaultTemplate';
import { AtomicTextContainer } from '../text/textContainer';
import { StrictUnicodeLine } from '../text/strictUnicode';
templateDictionary.enumerable.armGenerator;
const fallback: nodePrebuildedThemeT = {
  arm: {
    armGenerator: templateDictionary.enumerable.armGenerator,
    armWidthGenerator: templateDictionary.enumerable.armWidthGenerator
  },
  info: {
    postfix :{
      container: new AtomicTextContainer(new StrictUnicodeLine('~~~')),
    }
  }
};
const prebuilded = prebuildTheme([defaultTheme], fallback);
console.log(prebuilded);