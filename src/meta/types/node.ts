import { AnyTextContainer } from '../../text/textContainer';
import { ArmGeneratorI } from './armGenerator';

export interface MetaNodeI {
  children: MetaNodeI[];
  armGenerator: ArmGeneratorI<MetaNodeI>;
  leaf: AnyTextContainer;
  armWidth: number;
}
