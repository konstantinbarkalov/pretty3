import { ArmGeneratorI, generateFnParametersT, ArmWidthGeneratorI } from './types/armGenerator';
import { ArmT, armWidthT } from './types/arm';
import { MatrixPicker } from './matrixPicker';
import { ArmPatternI } from './types/matrix/armPattern';


export class PatternDrivenArmGenerator extends MatrixPicker<ArmPatternI> implements ArmGeneratorI {
  public generateArm(parameters: generateFnParametersT, armWidth: armWidthT): ArmT {
    const pattern = this.pickFromMatrix(parameters);
    return pattern.generateArm(armWidth);
  }
}

export class PatternDrivenArmWidthGenerator extends MatrixPicker<armWidthT> implements ArmWidthGeneratorI {
  public generateArmWidth(parameters: generateFnParametersT): armWidthT {
    const armWidth = this.pickFromMatrix(parameters);
    return armWidth;
  }
}


