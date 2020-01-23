import { AnyTextContainer, AtomicTextContainer } from '../text/textContainer';
import { StrictUnicodeLine } from '../text/strictUnicode';
import { MetaNodeI } from './types/node';
import { ArmGeneratorI } from './types/armGenerator';



export class MetaNode implements MetaNodeI {
  public children: MetaNodeI[] = [];
  constructor(public leaf: AnyTextContainer, public armGenerator: ArmGeneratorI<MetaNode>, public armWidth: number) { }
}


export function easyCreateNode(text: string, armGenerator: ArmGeneratorI<MetaNode>, armWidth: number): MetaNode {
  const leaf = new AtomicTextContainer(new StrictUnicodeLine(text));
  const metaNode = new MetaNode(leaf, armGenerator, armWidth);
  return metaNode;
}
