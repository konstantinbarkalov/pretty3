import { ArmGeneratorI, generateFnParametersT, ArmWidthGeneratorI } from './types/armGenerator';
import { ArmT } from './types/arm';
import { KnotDependentArmPatternI, LineDependentArmPlainLinePatternI, ArmPlainLinePatternI } from './types/pattern';
import { AtomicTextContainer } from '../text/textContainer';
import { StrictUnicodeLine } from '../text/strictUnicode';


export class PatternDrivenArmGenerator implements ArmGeneratorI, ArmWidthGeneratorI {
  constructor (public pattern: KnotDependentArmPatternI) { }
  public generateArmWidth(parameters: generateFnParametersT): number {
    const hasChildren = parameters.node.children.length > 0;
    const isFirstLineOfKnot = parameters.lineOfKnotNum === 0;
    const isLeaf = parameters.childNum === null;
    const armWidth =
      (isLeaf)
        ? (hasChildren)
          ? (!isFirstLineOfKnot) ? 2 : 2
          : 0
        : 4;
    return armWidth;
  }
  public generateArm(parameters: generateFnParametersT, armWidth: number): ArmT {
    const hasChildren = parameters.node.children.length > 0;
    const isFirstChild = parameters.childNum === 0;
    const isLastChild = parameters.childNum === parameters.node.children.length - 1;
    const isFirstLineOfKnot = parameters.lineOfKnotNum === 0;
    const isLastLineOfKnot = parameters.isLastLineOfKnot;
    const isLeaf = parameters.childNum === null;

    let lineDependentPlainPattern: LineDependentArmPlainLinePatternI;
    if (isLeaf) {
      lineDependentPlainPattern = this.pattern.plainPattern.leaf;
    } else if (isFirstChild) {
      lineDependentPlainPattern = this.pattern.plainPattern.firstChild;
    } else if (isLastChild) {
      lineDependentPlainPattern = this.pattern.plainPattern.lastChild;
    } else {
      lineDependentPlainPattern = this.pattern.plainPattern.otherChild;
    }

    let plainPattern: ArmPlainLinePatternI;
    if (isFirstLineOfKnot) {
      plainPattern = lineDependentPlainPattern.firstLine;
    } else if (isLastLineOfKnot) {
      if (hasChildren) {
        plainPattern = lineDependentPlainPattern.otherLine;
      } else {
        plainPattern = lineDependentPlainPattern.lastLine;
      }
    } else {
      plainPattern = lineDependentPlainPattern.otherLine;
    }
    const generatedArmPlainLine = plainPattern.generateArmPlainLine(armWidth);
    const generatedArm = new AtomicTextContainer<StrictUnicodeLine>(generatedArmPlainLine, this.pattern.style);
    return generatedArm;
  }
}


