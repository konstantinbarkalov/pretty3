import { ArmGeneratorI, generateFnParametersT, ArmWidthGeneratorI } from '../types/arm/armGenerator';
import { ArmT } from '../types/arm/arm';
import { armWidthT } from '../types/arm/armWidth';
import { MatrixPicker } from './matrixPicker';
import { ArmPatternI } from '../types/matrix/armPattern';


export class MatrixDrivenArmGenerator extends MatrixPicker<ArmPatternI> implements ArmGeneratorI {
  public generateArm(parameters: generateFnParametersT, armWidth: armWidthT): ArmT {
    const pattern = this.pickFromMatrix(parameters);
    return pattern.generateArm(armWidth);
  }
}

export class MatrixDrivenArmWidthGenerator extends MatrixPicker<armWidthT> implements ArmWidthGeneratorI {
  public generateArmWidth(parameters: generateFnParametersT): armWidthT {
    const armWidth = this.pickFromMatrix(parameters);
    return armWidth;
  }
}


