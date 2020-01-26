import { AnyTextContainer, AtomicTextContainer } from '../text/textContainer';
import { StrictUnicodeText } from '../text/strictUnicode';
import { MetaNodeI } from './interfaces/node';
import { ArmGeneratorI, ArmWidthGeneratorI } from './interfaces/arm/armGenerator';



export class MetaNode implements MetaNodeI {
  public children: MetaNodeI[] = [];
  constructor(public leaf: AnyTextContainer, public armGenerator: ArmGeneratorI<MetaNode>, public armWidthGenerator: ArmWidthGeneratorI<MetaNode>) { }
  static fromString(text: string, armGenerator: ArmGeneratorI<MetaNode>, armWidthGenerator: ArmWidthGeneratorI<MetaNode>): MetaNode {
    const leaf = new AtomicTextContainer(new StrictUnicodeText(text));
    const metaNode = new MetaNode(leaf, armGenerator, armWidthGenerator);
    return metaNode;
  }
}


