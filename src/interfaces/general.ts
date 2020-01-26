import { Renderer } from '../text/renderer/abstract/renderer';
import { MetaNode } from '../meta/node';
import { ArmGeneratorI, ArmWidthGeneratorI } from '../meta/interfaces/arm/armGenerator';
import { logLineCallbackT } from './generalOld';
//// new way
export type metaNodeTemplateT = {
  armGenerator: ArmGeneratorI<MetaNode>;
  armWidthGenerator: ArmWidthGeneratorI<MetaNode>;
};

export type buildMetaTreeSettingsT = {
  maxLevel: number;
  maxItemsPerLevel: number[] | number;
  maxLineWidth: number;
  arrayTemplate: metaNodeTemplateT;
  objectTemplate: metaNodeTemplateT;
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

