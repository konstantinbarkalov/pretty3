import { Style } from '../../text/style';
import { consumableArmCharsT } from '../../meta/interfaces/matrix/armPattern';
import { consumableLineT } from './general';
import { typeDependentPartialDictionaryT, typeDependentBroadOnlyPartialDictionaryT } from "./typeDependentDictionary";
export type nodeBasicItemThemeT = {
  visibility?: boolean;
  style?: Style;
} | undefined;

export type nodePredefinableItemThemeT = nodeBasicItemThemeT & {
  line?: consumableLineT;
} | undefined;


export type nodeSuffixedPredefinableItemThemeT = nodeBasicItemThemeT & {
  predelimiter?: nodePredefinableItemThemeT;
  prefix?: nodePredefinableItemThemeT;
  content?: nodePredefinableItemThemeT;
  postfix?: nodePredefinableItemThemeT;
  postdelimiter?: nodePredefinableItemThemeT;
} | undefined;

export type nodeSuffixedSemipredefinableItemThemeT = nodeBasicItemThemeT & {
  predelimiter?: nodePredefinableItemThemeT;
  prefix?: nodePredefinableItemThemeT;
  content?: nodeBasicItemThemeT;
  postfix?: nodePredefinableItemThemeT;
  postdelimiter?: nodePredefinableItemThemeT;
} | undefined;


export type armItemThemeT = { // no nodeBasicItemThemeT &
  width?: number;
  commonChars?: [consumableArmCharsT, consumableArmCharsT, consumableArmCharsT];
  style?: Style;
}

export type nodeThemeT = nodeBasicItemThemeT & {
  arm?: armItemThemeT;
  icon?: nodeSuffixedPredefinableItemThemeT;
  key?: nodeSuffixedSemipredefinableItemThemeT;
  value?: nodeSuffixedSemipredefinableItemThemeT;
  info?: nodeSuffixedSemipredefinableItemThemeT;
  remark?: nodeSuffixedSemipredefinableItemThemeT;
}

export type themeT = {
  global?: nodeThemeT;
  broad?: typeDependentBroadOnlyPartialDictionaryT<nodeThemeT>;
  fine?: typeDependentPartialDictionaryT<nodeThemeT>;
}