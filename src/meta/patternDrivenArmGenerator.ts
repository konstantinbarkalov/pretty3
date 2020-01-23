import { ArmGeneratorI, generateFnParametersT } from './types/armGenerator';
import { ChildDependentArmPatternI, LineDependentArmPatternI, ArmPatternI } from './types/pattern';
import { ArmT } from './types/arm';

export class PatternDrivenArmGenerator implements ArmGeneratorI {
  constructor (public pattern: ChildDependentArmPatternI) { }
  public generateArm(parameters: generateFnParametersT): ArmT {
    const hasChildren = parameters.childrenCount > 0;
    const isFirstChild = parameters.childId === 0;
    const isLastChild = parameters.childId === parameters.childrenCount - 1;
    const isFirstLine = parameters.lineId === 0;
    const isLastLine = parameters.lineId === parameters.linesCount - 1;
    const isLeaf = parameters.childId === null;

    let lineDependentPattern: LineDependentArmPatternI;
    if (isLeaf) {
      lineDependentPattern = this.pattern.leaf;
    } else if (isFirstChild) {
      lineDependentPattern = this.pattern.firstChild;
    } else if (isLastChild) {
      lineDependentPattern = this.pattern.lastChild;
    } else {
      lineDependentPattern = this.pattern.otherChild;
    }

    let pattern: ArmPatternI;
    if (isFirstLine) {
      pattern = lineDependentPattern.firstLine;
    } else if (isLastLine) {
      if (hasChildren) {
        pattern = lineDependentPattern.otherLine;
      } else {
        pattern = lineDependentPattern.lastLine;
      }
    } else {
      pattern = lineDependentPattern.otherLine;
    }
    const generated: ArmT = pattern.generateArm(parameters.node.armWidth);
    return generated;
  }
}
