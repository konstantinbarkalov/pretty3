import { ArmGeneratorI, generateFnParametersT } from './types/armGenerator';
import { ArmT } from './types/deprecated';
import { ChildDependentArmPatternI, LineDependentPlainArmLinePatternI, PlainArmLinePatternI } from './types/pattern';
import { AtomicTextContainer } from '../text/textContainer';
import { StrictUnicodeLine } from '../text/strictUnicode';


export class PatternDrivenArmGenerator implements ArmGeneratorI {
  constructor (public pattern: ChildDependentArmPatternI) { }
  public generateArm(parameters: generateFnParametersT): ArmT {
    const hasChildren = parameters.node.children.length > 0;
    const isFirstChild = parameters.childId === 0;
    const isLastChild = parameters.childId === parameters.node.children.length - 1;
    const isFirstLine = parameters.lineId === 0;
    const isLastLine = parameters.isLastLine;
    const isLeaf = parameters.childId === null;

    let lineDependentPlainPattern: LineDependentPlainArmLinePatternI;
    if (isLeaf) {
      lineDependentPlainPattern = this.pattern.plainPattern.leaf;
    } else if (isFirstChild) {
      lineDependentPlainPattern = this.pattern.plainPattern.firstChild;
    } else if (isLastChild) {
      lineDependentPlainPattern = this.pattern.plainPattern.lastChild;
    } else {
      lineDependentPlainPattern = this.pattern.plainPattern.otherChild;
    }

    let plainPattern: PlainArmLinePatternI;
    if (isFirstLine) {
      plainPattern = lineDependentPlainPattern.firstLine;
    } else if (isLastLine) {
      if (hasChildren) {
        plainPattern = lineDependentPlainPattern.otherLine;
      } else {
        plainPattern = lineDependentPlainPattern.lastLine;
      }
    } else {
      plainPattern = lineDependentPlainPattern.otherLine;
    }
    const generatedPlainArmLine = plainPattern.generatePlainArmLine(parameters.node.armWidth);
    const generatedArm = new AtomicTextContainer<StrictUnicodeLine>(generatedPlainArmLine, this.pattern.style);
    return generatedArm;
  }
}


