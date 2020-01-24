import { StrictUnicodeChar } from '../../text/strictUnicode';

import { Style } from '../../text/style';
import { ArmT } from './arm';
import { KnotMatrixI } from './matrix';


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

export interface ArmPatternMatrixI {
  leaf: ArmPatternKnotMatrixI;
  firstChild: ArmPatternKnotMatrixI;
  otherChild: ArmPatternKnotMatrixI;
  lastChild: ArmPatternKnotMatrixI;
}
