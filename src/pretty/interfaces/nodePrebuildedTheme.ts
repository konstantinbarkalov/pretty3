import { ArmGeneratorI, ArmWidthGeneratorI } from '../../meta/interfaces/arm/armGenerator';
import { AnyTextContainer } from '../../text/textContainer';
import { StrictUnico~deLine } from '../../text/strictUnicode';
import { Style } from '../../text/style';
export type nodeItemPrebuildedThemeT = {
  style?: Style;
}

export type nodePredefinableItemPrebuildedThemeT = {
  container?: AnyTextContainer<StrictUnicodeLine>;
}

export type nodeSuffixedSemipredefinableItemPrebuildedThemeT = {
  prefix?: nodePredefinableItemPrebuildedThemeT;
  content?: nodeItemPrebuildedThemeT;
  postfix?: nodePredefinableItemPrebuildedThemeT;
}

export type nodePrebuildedThemeT = {
  arm: {
    armGenerator: ArmGeneratorI;
    armWidthGenerator: ArmWidthGeneratorI;
  };
  icon?: nodePredefinableItemPrebuildedThemeT;
  key?: nodeSuffixedSemipredefinableItemPrebuildedThemeT;
  valueDelimiter?: nodePredefinableItemPrebuildedThemeT;
  value?: nodeSuffixedSemipredefinableItemPrebuildedThemeT;
  infoDelimiter?: nodePredefinableItemPrebuildedThemeT;
  info?: nodeSuffixedSemipredefinableItemPrebuildedThemeT;
  remarkDelimiter?: nodePredefinableItemPrebuildedThemeT;
  remark?: nodeSuffixedSemipredefinableItemPrebuildedThemeT;
}