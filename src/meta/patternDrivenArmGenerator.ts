import { ArmGeneratorI, generateFnParametersT } from './types/armGenerator';
import { ArmT } from './types/deprecated';
import { ChildDependentArmPatternI, LineDependentArmPlainLinePatternI, ArmPlainLinePatternI } from './types/pattern';
import { AtomicTextContainer } from '../text/textContainer';
import { StrictUnicodeLine } from '../text/strictUnicode';


export class PatternDrivenArmGenerator implements ArmGeneratorI {
  constructor (public pattern: ChildDependentArmPatternI) { }
  public generateArm(parameters: generateFnParametersT): ArmT {
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
    const generatedArmPlainLine = plainPattern.generateArmPlainLine(parameters.node.armWidth);
    const generatedArm = new AtomicTextContainer<StrictUnicodeLine>(generatedArmPlainLine, this.pattern.style);
    return generatedArm;
  }
}


