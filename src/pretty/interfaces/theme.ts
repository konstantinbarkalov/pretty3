import { Style } from '../../text/style';
import { consumableArmCharsT } from '../../meta/interfaces/matrix/armPattern';
import { consumableIconCharsT, consumableLineT } from './general';
import { typeDependentPartialDictionaryT, typeDependentBroadOnlyPartialDictionaryT } from '../typeDependentDictionary';
export type nodeBasicItemThemeT = {
  visibility?: boolean;
  style?: Style;
} | undefined;

export type nodePredefinableItemThemeT = nodeBasicItemThemeT & {
  line?: consumableLineT;
} | undefined;


export type nodeSuffixedItemThemeT = nodeBasicItemThemeT & {
  prefix?: nodeBasicItemThemeT;
  content?: nodeBasicItemThemeT;
  postfix?: nodeBasicItemThemeT;
} | undefined;

export type nodeSuffixedSemipredefinableItemThemeT = nodeBasicItemThemeT & {
  prefix?: nodePredefinableItemThemeT;
  content?: nodeBasicItemThemeT;
  postfix?: nodePredefinableItemThemeT;
} | undefined;


export type armItemThemeT = { // no nodeBasicItemThemeT &
  width?: number;
  commonChars?: [consumableArmCharsT, consumableArmCharsT, consumableArmCharsT];
  style?: Style;
}
export type iconItemThemeT = nodeSuffixedItemThemeT & {
  chars?: consumableIconCharsT;
} | undefined;

export type nodeThemeT = nodeBasicItemThemeT & {
  arm?: armItemThemeT;
  icon?: iconItemThemeT;
  keyDelimiter?: nodePredefinableItemThemeT;
  key?: nodeSuffixedSemipredefinableItemThemeT;
  valueDelimiter?: nodePredefinableItemThemeT;
  value?: nodeSuffixedSemipredefinableItemThemeT;
  infoDelimiter?: nodePredefinableItemThemeT;
  info?: nodeSuffixedSemipredefinableItemThemeT;
  remarkDelimiter?: nodePredefinableItemThemeT;
  remark?: nodeSuffixedSemipredefinableItemThemeT;
}

export type themeT = {
  global?: nodeThemeT;
  broad?: typeDependentBroadOnlyPartialDictionaryT<nodeThemeT>;
  fine?: typeDependentPartialDictionaryT<nodeThemeT>;
}