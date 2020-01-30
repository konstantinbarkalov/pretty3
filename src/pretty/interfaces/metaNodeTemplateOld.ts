import { ArmGeneratorI, ArmWidthGeneratorI } from '../../meta/interfaces/arm/armGenerator';

import { MetaNode } from '../../meta/node';

export type metaNodeTemplateT = {
  armGenerator: ArmGeneratorI<MetaNode>;
  armWidthGenerator: ArmWidthGeneratorI<MetaNode>;
};
