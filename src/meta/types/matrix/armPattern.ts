
import { StrictUnicodeChar } from '../../../text/strictUnicode';
import { Style } from '../../../text/style';
import { ArmT, armWidthT } from '../arm';
import { KnotMatrixI, MatrixI } from './matrix';


export interface ArmPatternI {
  firstChar: StrictUnicodeChar;
  otherChar: StrictUnicodeChar;
  lastChar: StrictUnicodeChar;
  generateArm(armWidth: armWidthT): ArmT;
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
