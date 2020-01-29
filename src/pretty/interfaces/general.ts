import { Renderer } from '../../text/renderer/abstract/renderer';
import { MetaNode } from '../../meta/node';
import { ArmGeneratorI, ArmWidthGeneratorI } from '../../meta/interfaces/arm/armGenerator';
import { logLineCallbackT } from '../../deprecated/generalOld';
import { typeDependentBroadOnlyDictionaryT, typeDependentDictionaryT } from '../typeDependentDictionary';
import { iconT } from './icon';
import { StrictUnicodeChar, StrictUnicodeLine, StrictUnicodeText } from '../../text/strictUnicode';

export type metaNodeTemplateT = {
  armGenerator: ArmGeneratorI<MetaNode>;
  armWidthGenerator: ArmWidthGeneratorI<MetaNode>;
};

export type buildMetaTreeSettingsT = {
  maxLevel: number;
  maxItemsPerLevel: number[] | number;
  maxLineWidth: number;
  iconDictionary: typeDependentDictionaryT<iconT>;
  templateDictionary: typeDependentBroadOnlyDictionaryT<metaNodeTemplateT>;
};

export type stringifyTreeSettingsT = buildMetaTreeSettingsT & {
  renderer: Renderer;
}
export type printTreeSettingsT = stringifyTreeSettingsT & {
  logLineCallback: logLineCallbackT;
};

export type buildMetaTreeOptionsT = Partial<buildMetaTreeSettingsT>;
export type stringifyTreeOptionsT = Partial<stringifyTreeSettingsT>;
export type printTreeOptionsT = Partial<printTreeSettingsT>;


export  type consumableCharT = string | StrictUnicodeChar;
export  type consumableLineT = string | StrictUnicodeLine;
export  type consumableTextT = string | StrictUnicodeText;
export  type consumableIconCharsT = string | [consumableCharT, consumableCharT, consumableCharT];
