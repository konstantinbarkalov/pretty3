import { AnyTextContainer, AtomicTextContainer } from '../text/textContainer';
import { StrictUnicodeLine } from '../text/strictUnicode';
import { MetaNodeI } from './types/node';
import { ArmGeneratorI, ArmWidthGeneratorI } from './types/armGenerator';



export class MetaNode implements MetaNodeI {
  public children: MetaNodeI[] = [];
  constructor(public leaf: AnyTextContainer, public armGenerator: ArmGeneratorI<MetaNode>, public armWidthGenerator: ArmWidthGeneratorI<MetaNode>) { }
  static fromString(text: string, armGenerator: ArmGeneratorI<MetaNode>, armWidthGenerator: ArmWidthGeneratorI<MetaNode>): MetaNode {
    const leaf = new AtomicTextContainer(new StrictUnicodeLine(text));
    const metaNode = new MetaNode(leaf, armGenerator, armWidthGenerator);
    return metaNode;
  }
}


