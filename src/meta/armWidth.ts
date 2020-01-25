import { armWidthT } from './types/armWidth';
import { ArmWidthKnotMatrixI, ArmWidthMatrixI } from './types/matrix/armWidth';


export class ArmWidthKnotMatrix implements ArmWidthKnotMatrixI {
  constructor(public firstLine: armWidthT, public otherLine: armWidthT, public lastLine: armWidthT) { }
}

type armWidthArrayT = [
  armWidthT, armWidthT, armWidthT,
  armWidthT, armWidthT, armWidthT,
  armWidthT, armWidthT, armWidthT,
  armWidthT, armWidthT, armWidthT,
];

export class ArmWidthMatrix implements ArmWidthMatrixI {
  constructor(public leaf: ArmWidthKnotMatrixI, public firstChild: ArmWidthKnotMatrixI, public otherChild: ArmWidthKnotMatrixI, public lastChild: ArmWidthKnotMatrixI) { }
  static fromArray(matrix: armWidthArrayT): ArmWidthMatrix {
    const knotDependentArmPlainLineWidth = new ArmWidthMatrix(
      new ArmWidthKnotMatrix(matrix[0], matrix[1], matrix[2]),
      new ArmWidthKnotMatrix(matrix[3], matrix[4], matrix[5]),
      new ArmWidthKnotMatrix(matrix[6], matrix[7], matrix[8]),
      new ArmWidthKnotMatrix(matrix[9], matrix[10], matrix[11]),
    );
    return knotDependentArmPlainLineWidth;
  }
}

