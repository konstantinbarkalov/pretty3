import { StrictUnicodeChar } from '../../text/strictUnicode';
import { ArmT } from './arm';
import { LineDependentArmI, ChildDependentArmI } from './deprecated';


export interface ArmPatternI {
  firstChar: StrictUnicodeChar;
  otherChar: StrictUnicodeChar;
  lastChar: StrictUnicodeChar;
  generateArm(armWidth: number): ArmT;
}

export interface LineDependentArmPatternI {
  firstLine: ArmPatternI;
  otherLine: ArmPatternI;
  lastLine: ArmPatternI;
  generateLineDependentArm(armWidth: number): LineDependentArmI;
}

export interface ChildDependentArmPatternI {
  leaf: LineDependentArmPatternI;
  firstChild: LineDependentArmPatternI;
  otherChild: LineDependentArmPatternI;
  lastChild: LineDependentArmPatternI;
  generateChildDependentArm(armWidth: number): ChildDependentArmI;
}

