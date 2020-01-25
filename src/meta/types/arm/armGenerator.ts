
import { ArmT } from './arm';
import { armWidthT } from './armWidth';
import { MetaNodeI } from '../node';


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
