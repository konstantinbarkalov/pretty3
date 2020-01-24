
import { ArmT } from './deprecated';
import { MetaNodeI } from './node';


export type generateFnParametersT<TMetaNode extends MetaNodeI = MetaNodeI> = {
  node: TMetaNode;
  childId: number | null;
  lineId: number;
  isLastLine: boolean;
}

export type generateArmFn<TMetaNode extends MetaNodeI = MetaNodeI> = (parameters: generateFnParametersT<TMetaNode>) => ArmT;

export interface ArmGeneratorI<TMetaNode extends MetaNodeI = MetaNodeI> {
  generateArm: generateArmFn<TMetaNode>;
}

export interface ArmGeneratorChainElementI<TMetaNode extends MetaNodeI = MetaNodeI> {
  generator: ArmGeneratorI<TMetaNode>;
  parameters: generateFnParametersT<TMetaNode>;
}
export type armGeneratorChainT<TMetaNode extends MetaNodeI = MetaNodeI> = ArmGeneratorChainElementI<TMetaNode>[];