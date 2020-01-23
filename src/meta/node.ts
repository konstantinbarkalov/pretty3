
import { MetaNodeI, ChildDependentArmPatternI } from './types';
import { AnyTextContainer, AtomicTextContainer } from '../text/textContainer';

import { StrictUnicodeLine } from '../text/strictUnicode';
import { ChildDependentArmPattern } from './arm';



export class MetaNode implements MetaNodeI {
  public children: MetaNodeI[] = [];
  constructor(public leaf: AnyTextContainer, public pattern: ChildDependentArmPatternI, public armWidth: number) { }
}


export function easyCreateNode(text: string, nodePattern: ChildDependentArmPattern, armWidth: number): MetaNode {
  const leaf = new AtomicTextContainer(new StrictUnicodeLine(text));
  const metaNode = new MetaNode(leaf, nodePattern, armWidth);
  return metaNode;
}
