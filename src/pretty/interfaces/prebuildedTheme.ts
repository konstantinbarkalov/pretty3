import { ArmGeneratorI, ArmWidthGeneratorI } from '../../meta/interfaces/arm/armGenerator';
import { AnyTextContainer } from '../../text/textContainer';
import { StrictUnicodeLine } from '../../text/strictUnicode';
import { Style } from '../../text/style';

import { typeDependentDictionaryT } from '../typeDependentDictionary';
export type nodeItemPrebuildedThemeT = {
  style?: Style;
}

export type nodePredefinableItemPrebuildedThemeT = {
  container?: AnyTextContainer<StrictUnicodeLine>;
}

export type nodeSuffixedSemipredefinableItemPrebuildedThemeT = {
  style?: Style;
  predelimiter?: nodePredefinableItemPrebuildedThemeT;
  prefix?: nodePredefinableItemPrebuildedThemeT;
  content?: nodeItemPrebuildedThemeT;
  postfix?: nodePredefinableItemPrebuildedThemeT;
  postdelimiter?: nodePredefinableItemPrebuildedThemeT;
}

export type nodeSuffixedPredefinableItemPrebuildedThemeT = {
  style?: Style;
  predelimiter?: nodePredefinableItemPrebuildedThemeT;
  prefix?: nodePredefinableItemPrebuildedThemeT;
  content?: nodePredefinableItemPrebuildedThemeT;
  postfix?: nodePredefinableItemPrebuildedThemeT;
  postdelimiter?: nodePredefinableItemPrebuildedThemeT;
}
export type nodePrebuildedThemeT = {
  arm: {
    armGenerator: ArmGeneratorI;
    armWidthGenerator: ArmWidthGeneratorI;
  };
  style?: Style;
  icon?: nodeSuffixedPredefinableItemPrebuildedThemeT;
  key?: nodeSuffixedSemipredefinableItemPrebuildedThemeT;
  value?: nodeSuffixedSemipredefinableItemPrebuildedThemeT;
  info?: nodeSuffixedSemipredefinableItemPrebuildedThemeT;
  remark?: nodeSuffixedSemipredefinableItemPrebuildedThemeT;
}

export type prebuildedThemeT = typeDependentDictionaryT<nodePrebuildedThemeT>;