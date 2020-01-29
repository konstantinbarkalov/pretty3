import { armWidthT } from '../interfaces/arm/armWidth';
import { ArmWidthKnotMatrixI, ArmWidthMatrixI } from '../interfaces/matrix/armWidthMatrix';


export class ArmWidthKnotMatrix implements ArmWidthKnotMatrixI {
  constructor(public firstLine: armWidthT, public otherLine: armWidthT, public lastLine: armWidthT) { }
}

type armWidthArrayT = [
  armWidthT, armWidthT, armWidthT,
  armWidthT, armWidthT, armWidthT,
  armWidthT, armWidthT, armWidthT,
  armWidthT, armWidthT, armWidthT,
  armWidthT, armWidthT, armWidthT,
];

export class ArmWidthMatrix implements ArmWidthMatrixI {
  constructor(public infertileLeaf: ArmWidthKnotMatrixI, public fertileLeaf: ArmWidthKnotMatrixI, public firstChild: ArmWidthKnotMatrixI, public otherChild: ArmWidthKnotMatrixI, public lastChild: ArmWidthKnotMatrixI) { }
  static fromArray(array: armWidthArrayT): ArmWidthMatrix {
    const knotDependentArmWidth = new ArmWidthMatrix(
      new ArmWidthKnotMatrix(array[0], array[1], array[2]),
      new ArmWidthKnotMatrix(array[3], array[4], array[5]),
      new ArmWidthKnotMatrix(array[6], array[7], array[8]),
      new ArmWidthKnotMatrix(array[9], array[10], array[11]),
      new ArmWidthKnotMatrix(array[12], array[13], array[14]),
    );
    return knotDependentArmWidth;
  }
  static fromCommonWidth(armWidth: armWidthT, fertileLeafNonfirstLineArmWidth: armWidthT = armWidth): ArmPatternMatrix {
    const knotDependentArmWidth = new ArmWidthMatrix(
      new ArmWidthKnotMatrix(0, 0, 0),
      new ArmWidthKnotMatrix(0, fertileLeafNonfirstLineArmWidth, fertileLeafNonfirstLineArmWidth),
      new ArmWidthKnotMatrix(armWidth, armWidth, armWidth),
      new ArmWidthKnotMatrix(armWidth, armWidth, armWidth),
      new ArmWidthKnotMatrix(armWidth, armWidth, armWidth),

    );
    return knotDependentArmWidth;
  }
}

