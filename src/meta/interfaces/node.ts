import { AnyTextContainer } from '../../text/textContainer';
import { ArmGeneratorI, ArmWidthGeneratorI } from './arm/armGenerator';


export interface MetaNodeI {
  readonly rules: strictUnicodeRulesT;
  readonly leaf: AnyTextContainer;
  readonly children: MetaNodeI[];
  readonly armGenerator: ArmGeneratorI<MetaNodeI>;
  readonly armWidthGenerator: ArmWidthGeneratorI<MetaNodeI>;
}
