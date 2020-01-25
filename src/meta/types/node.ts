import { AnyTextContainer } from '../../text/textContainer';
import { ArmGeneratorI, ArmWidthGeneratorI } from './arm/armGenerator';


export interface MetaNodeI {
  leaf: AnyTextContainer;
  children: MetaNodeI[];
  armGenerator: ArmGeneratorI<MetaNodeI>;
  armWidthGenerator: ArmWidthGeneratorI<MetaNodeI>;
}
