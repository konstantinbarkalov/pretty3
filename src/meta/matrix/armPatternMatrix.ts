import { ArmPatternKnotMatrixI, ArmPatternMatrixI } from '../interfaces/matrix/armPatternMatrix';
import { ArmPatternI } from '../interfaces/matrix/armPattern';
import { Style } from '../../text/style';
import { ArmPattern } from './armPattern';


export class ArmPatternKnotMatrix implements ArmPatternKnotMatrixI {
  constructor(public firstLine: ArmPatternI, public otherLine: ArmPatternI, public lastLine: ArmPatternI) { }
  static fromString(firstChars: string, otherChars: string, lastChars: string, style: Style): ArmPatternKnotMatrix {
    const lineDependentArmPattern = new ArmPatternKnotMatrix(
      ArmPattern.fromString(firstChars, style),
      ArmPattern.fromString(otherChars, style),
      ArmPattern.fromString(lastChars, style),
    );
    return lineDependentArmPattern;
  }
}

type patternStringArrayT = [
  string, string, string,
  string, string, string,
  string, string, string,
  string, string, string,
  string, string, string,
];

export class ArmPatternMatrix implements ArmPatternMatrixI {
  constructor(public infertileLeaf: ArmPatternKnotMatrixI, public fertileLeaf: ArmPatternKnotMatrixI, public firstChild: ArmPatternKnotMatrixI, public otherChild: ArmPatternKnotMatrixI, public lastChild: ArmPatternKnotMatrixI) { }
  static fromArray(matrix: patternStringArrayT, style: Style): ArmPatternMatrix {
    const knotDependentArmPlainLinePattern = new ArmPatternMatrix(
      ArmPatternKnotMatrix.fromString(matrix[0], matrix[1], matrix[2], style),
      ArmPatternKnotMatrix.fromString(matrix[3], matrix[4], matrix[5], style),
      ArmPatternKnotMatrix.fromString(matrix[6], matrix[7], matrix[8], style),
      ArmPatternKnotMatrix.fromString(matrix[9], matrix[10], matrix[11], style),
      ArmPatternKnotMatrix.fromString(matrix[12], matrix[13], matrix[14], style),
    );
    return knotDependentArmPlainLinePattern;
  }
  // TODO move to easy-node
  // static fromString(otherChildFirstLine: string, spacer: string, lastChildFirstLine: string, style): ArmPatternMatrix {
  //   const knotDependentArmPlainLinePattern = ArmPatternMatrix.fromMatrix([
  //     otherChildFirstLine, spacer, spacer,
  //     otherChildFirstLine, spacer, spacer,
  //     otherChildFirstLine, spacer, spacer,
  //     lastChildFirstLine , '   ',  '   ',
  //   ]);
  //   return knotDependentArmPlainLinePattern;
  // }
}

