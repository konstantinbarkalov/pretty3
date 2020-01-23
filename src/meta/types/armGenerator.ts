
import { StyledArmT } from './deprecated';
import { ArmT } from './arm';
import { MetaNodeI } from './node';


export type generateFnParametersT<TMetaNode extends MetaNodeI = MetaNodeI> = {
  node: TMetaNode;
  childId: number | null;
  lineId: number;
  isLastLine: boolean;
}
type generateFn<TOutput, TMetaNode extends MetaNodeI = MetaNodeI> = (parameters: generateFnParametersT<TMetaNode>) => TOutput;
export type generateArmFn<TMetaNode extends MetaNodeI = MetaNodeI> = generateFn<ArmT, TMetaNode>;
export type generateStyledArmFn<TMetaNode extends MetaNodeI = MetaNodeI> = generateFn<StyledArmT, TMetaNode>;

export interface ArmGeneratorI<TMetaNode extends MetaNodeI = MetaNodeI> {
  generateArm: generateArmFn<TMetaNode>;
}

export interface StyledArmGeneratorI<TMetaNode extends MetaNodeI = MetaNodeI> {
  generateStyledArm: generateStyledArmFn<TMetaNode>;
}

export interface ArmGeneratorChainElementI<TMetaNode extends MetaNodeI = MetaNodeI> {
  generator: ArmGeneratorI<TMetaNode>;
  parameters: generateFnParametersT<TMetaNode>;
}
export type armGeneratorChainT<TMetaNode extends MetaNodeI = MetaNodeI> = ArmGeneratorChainElementI<TMetaNode>[];