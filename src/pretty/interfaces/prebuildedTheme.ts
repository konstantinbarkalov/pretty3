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
  prefix?: nodePredefinableItemPrebuildedThemeT;
  content?: nodeItemPrebuildedThemeT;
  postfix?: nodePredefinableItemPrebuildedThemeT;
}

export type nodePrebuildedThemeT = {
  arm: {
    armGenerator: ArmGeneratorI;
    armWidthGenerator: ArmWidthGeneratorI;
  };
  style?: Style;
  icon?: nodePredefinableItemPrebuildedThemeT;
  keyDelimiter?: nodePredefinableItemPrebuildedThemeT;
  key?: nodeSuffixedSemipredefinableItemPrebuildedThemeT;
  valueDelimiter?: nodePredefinableItemPrebuildedThemeT;
  value?: nodeSuffixedSemipredefinableItemPrebuildedThemeT;
  infoDelimiter?: nodePredefinableItemPrebuildedThemeT;
  info?: nodeSuffixedSemipredefinableItemPrebuildedThemeT;
  remarkDelimiter?: nodePredefinableItemPrebuildedThemeT;
  remark?: nodeSuffixedSemipredefinableItemPrebuildedThemeT;
}

export type prebuildedThemeT = typeDependentDictionaryT<nodePrebuildedThemeT>;