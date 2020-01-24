
import { KnotMatrixI, MatrixI } from './matrix';
import { StrictUnicodeChar } from '../../../text/strictUnicode';
import { ArmT } from '../arm';
import { Style } from '../../../text/style';


export interface ArmPatternI {
  firstChar: StrictUnicodeChar;
  otherChar: StrictUnicodeChar;
  lastChar: StrictUnicodeChar;
  generateArm(armWidth: number): ArmT;
  style: Style;
}

export interface ArmPatternKnotMatrixI extends KnotMatrixI<ArmPatternI> {
  firstLine: ArmPatternI;
  otherLine: ArmPatternI;
  lastLine: ArmPatternI;
}

export interface ArmPatternMatrixI extends MatrixI<ArmPatternI> {
  leaf: ArmPatternKnotMatrixI;
  firstChild: ArmPatternKnotMatrixI;
  otherChild: ArmPatternKnotMatrixI;
  lastChild: ArmPatternKnotMatrixI;
}
