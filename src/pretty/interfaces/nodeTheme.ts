import { Style } from '../../text/style';
import { consumableArmCharsT } from '../../meta/interfaces/matrix/armPattern';
import { consumableIconCharsT, consumableLineT } from './general';
export type nodeItemThemeT = {
  isHidden?: boolean;
  style?: Style;
}

export type nodePredefinableItemThemeT = nodeItemThemeT & {
  line?: consumableLineT;
}

export type nodeSuffixedItemThemeT = nodeItemThemeT & {
  prefix?: nodeItemThemeT;
  content?: nodeItemThemeT;
  postfix?: nodeItemThemeT;
}

export type nodeSuffixedSemipredefinableItemThemeT = nodeItemThemeT & {
  prefix?: nodePredefinableItemThemeT;
  content?: nodeItemThemeT;
  postfix?: nodePredefinableItemThemeT;
}

export type nodeThemeT = nodeItemThemeT & {
  arm?: {
    width?: number;
    commonChars?: [consumableArmCharsT, consumableArmCharsT, consumableArmCharsT];
    style?: Style;
  };
  icon?: nodeSuffixedItemThemeT & {
    chars?: consumableIconCharsT;
  };
  key?: nodeSuffixedSemipredefinableItemThemeT;
  valueDelimiter?: nodePredefinableItemThemeT;
  value?: nodeSuffixedSemipredefinableItemThemeT;
  infoDelimiter?: nodePredefinableItemThemeT;
  info?: nodeSuffixedSemipredefinableItemThemeT;
  remarkDelimiter?: nodePredefinableItemThemeT;
  remark?: nodeSuffixedSemipredefinableItemThemeT;
}

