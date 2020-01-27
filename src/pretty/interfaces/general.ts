import { Renderer } from '../../text/renderer/abstract/renderer';
import { MetaNode } from '../../meta/node';
import { ArmGeneratorI, ArmWidthGeneratorI } from '../../meta/interfaces/arm/armGenerator';
import { logLineCallbackT } from '../../deprecated/generalOld';
import { fullIconsetT } from '../defaultFullIconset';
//// new way
export type metaNodeTemplateT = {
  armGenerator: ArmGeneratorI<MetaNode>;
  armWidthGenerator: ArmWidthGeneratorI<MetaNode>;
};

export type buildMetaTreeSettingsT = {
  maxLevel: number;
  maxItemsPerLevel: number[] | number;
  maxLineWidth: number;
  fullIconset: fullIconsetT;
  arrayTemplate: metaNodeTemplateT;
  objectTemplate: metaNodeTemplateT;
  otherTemplate: metaNodeTemplateT;
  // TODO: every type
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
