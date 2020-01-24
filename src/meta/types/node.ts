import { AnyTextContainer } from '../../text/textContainer';
import { ArmGeneratorI, ArmWidthGeneratorI } from './armGenerator';


export interface MetaNodeI {
  leaf: AnyTextContainer;
  children: MetaNodeI[];
  armGenerator: ArmGeneratorI<MetaNodeI>;
  armWidthGenerator: ArmWidthGeneratorI<MetaNodeI>;
}
