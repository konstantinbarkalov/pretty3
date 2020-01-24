import { ArmGeneratorI, generateFnParametersT, ArmWidthGeneratorI } from './types/armGenerator';
import { ArmT } from './types/arm';
import { MatrixPicker } from './matrixPicker';
import { ArmPatternI, ArmPatternMatrixI, ArmPatternKnotMatrixI } from './types/matrix/armPattern';


export class PatternDrivenArmGenerator extends MatrixPicker<ArmPatternI> implements ArmGeneratorI {
  public generateArm(parameters: generateFnParametersT, armWidth: number): ArmT {
    const pattern = this.pickFromMatrix(parameters);
    return pattern.generateArm(armWidth);
  }
}

export class PatternDrivenArmWidthGenerator extends MatrixPicker<number> implements ArmWidthGeneratorI {
  public generateArmWidth(parameters: generateFnParametersT): number {
    const armWidth = this.pickFromMatrix(parameters);
    return armWidth;
  }
}

export class PatternDrivenArmGeneratorOld implements ArmGeneratorI, ArmWidthGeneratorI {
  constructor (public pattern: ArmPatternMatrixI) { }
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

    let armPatternKnotMatrix: ArmPatternKnotMatrixI;
    if (isLeaf) {
      armPatternKnotMatrix = this.pattern.leaf;
    } else if (isFirstChild) {
      armPatternKnotMatrix = this.pattern.firstChild;
    } else if (isLastChild) {
      armPatternKnotMatrix = this.pattern.lastChild;
    } else {
      armPatternKnotMatrix = this.pattern.otherChild;
    }

    let pattern: ArmPatternI;
    if (isFirstLineOfKnot) {
      pattern = armPatternKnotMatrix.firstLine;
    } else if (isLastLineOfKnot) {
      if (hasChildren) {
        pattern = armPatternKnotMatrix.otherLine;
      } else {
        pattern = armPatternKnotMatrix.lastLine;
      }
    } else {
      pattern = armPatternKnotMatrix.otherLine;
    }
    const generatedArm = pattern.generateArm(armWidth);
    return generatedArm;
  }
}


