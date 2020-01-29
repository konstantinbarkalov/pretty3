import { ArmPatternKnotMatrixI, ArmPatternMatrixI } from '../interfaces/matrix/armPatternMatrix';
import { ArmPatternI, consumableArmCharsT } from '../interfaces/matrix/armPattern';
import { Style } from '../../text/style';
import { ArmPattern } from './armPattern';

export class ArmPatternKnotMatrix implements ArmPatternKnotMatrixI {
  constructor(public firstLine: ArmPatternI, public otherLine: ArmPatternI, public lastLine: ArmPatternI) { }
  static fromChars(firstChars: consumableArmCharsT, otherChars: consumableArmCharsT, lastChars: consumableArmCharsT, style?: Style): ArmPatternKnotMatrix {
    const lineDependentArmPattern = new ArmPatternKnotMatrix(
      ArmPattern.fromChars(firstChars, style),
      ArmPattern.fromChars(otherChars, style),
      ArmPattern.fromChars(lastChars, style),
    );
    return lineDependentArmPattern;
  }
}

type consumableArmCharsArrayT = [
  consumableArmCharsT, consumableArmCharsT, consumableArmCharsT,
  consumableArmCharsT, consumableArmCharsT, consumableArmCharsT,
  consumableArmCharsT, consumableArmCharsT, consumableArmCharsT,
  consumableArmCharsT, consumableArmCharsT, consumableArmCharsT,
  consumableArmCharsT, consumableArmCharsT, consumableArmCharsT,
];

export class ArmPatternMatrix implements ArmPatternMatrixI {
  constructor(public infertileLeaf: ArmPatternKnotMatrixI, public fertileLeaf: ArmPatternKnotMatrixI, public firstChild: ArmPatternKnotMatrixI, public otherChild: ArmPatternKnotMatrixI, public lastChild: ArmPatternKnotMatrixI) { }
  static fromArray(array: consumableArmCharsArrayT, style?: Style): ArmPatternMatrix {
    const knotDependentArmPlainLinePattern = new ArmPatternMatrix(
      ArmPatternKnotMatrix.fromChars(array[0], array[1], array[2], style),
      ArmPatternKnotMatrix.fromChars(array[3], array[4], array[5], style),
      ArmPatternKnotMatrix.fromChars(array[6], array[7], array[8], style),
      ArmPatternKnotMatrix.fromChars(array[9], array[10], array[11], style),
      ArmPatternKnotMatrix.fromChars(array[12], array[13], array[14], style),
    );
    return knotDependentArmPlainLinePattern;
  }
  static fromCommonChars(otherChildFirstLine: consumableArmCharsT, spacer: consumableArmCharsT, lastChildFirstLine: consumableArmCharsT, style?: Style): ArmPatternMatrix {
    const knotDependentArmPlainLinePattern = new ArmPatternMatrix(
      ArmPatternKnotMatrix.fromChars(otherChildFirstLine, spacer, spacer, style),
      ArmPatternKnotMatrix.fromChars(otherChildFirstLine, spacer, spacer, style),
      ArmPatternKnotMatrix.fromChars(otherChildFirstLine, spacer, spacer, style),
      ArmPatternKnotMatrix.fromChars(otherChildFirstLine, spacer, spacer, style),
      ArmPatternKnotMatrix.fromChars(lastChildFirstLine , '   ',  '   ',  style),
    );
    return knotDependentArmPlainLinePattern;
  }
}
