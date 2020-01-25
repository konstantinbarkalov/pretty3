
import { ArmT, armWidthT } from './arm';
import { MetaNodeI } from './node';


export type generateFnParametersT<TMetaNode extends MetaNodeI = MetaNodeI> = {
  node: TMetaNode;
  childNum: number | null;
  lineNum: number;
  isLastLine: boolean;
  lineOfKnotNum: number;
  isLastLineOfKnot: boolean;
}
export type generateArmFn<TMetaNode extends MetaNodeI = MetaNodeI> = (parameters: generateFnParametersT<TMetaNode>, armWidth: armWidthT) => ArmT;
export type generateArmWidthFn<TMetaNode extends MetaNodeI = MetaNodeI> = (parameters: generateFnParametersT<TMetaNode>) => armWidthT;

export interface ArmGeneratorI<TMetaNode extends MetaNodeI = MetaNodeI> {
  generateArm: generateArmFn<TMetaNode>;
}
export interface ArmWidthGeneratorI<TMetaNode extends MetaNodeI = MetaNodeI> {
  generateArmWidth: generateArmWidthFn<TMetaNode>;
}
export interface ArmGeneratorChainElementI<TMetaNode extends MetaNodeI = MetaNodeI> {
  armGenerator: ArmGeneratorI<TMetaNode>;
  armWidthGenerator: ArmWidthGeneratorI<TMetaNode>;
  parameters: generateFnParametersT<TMetaNode>;
  generateArm(): ArmT;
}
export interface ArmGeneratorChainI<TMetaNode extends MetaNodeI = MetaNodeI> {
  elements: ArmGeneratorChainElementI<TMetaNode>[];
  generateArms(): ArmT[];
}