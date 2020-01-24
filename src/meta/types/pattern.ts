import { StrictUnicodeChar } from '../../text/strictUnicode';

import { Style } from '../../text/style';
import { ArmPlainLineT } from './arm';


export interface ArmPlainLinePatternI {
  firstChar: StrictUnicodeChar;
  otherChar: StrictUnicodeChar;
  lastChar: StrictUnicodeChar;
  generateArmPlainLine(armWidth: number): ArmPlainLineT;
}

export interface LineDependentArmPlainLinePatternI {
  firstLine: ArmPlainLinePatternI;
  otherLine: ArmPlainLinePatternI;
  lastLine: ArmPlainLinePatternI;
}

export interface KnotDependentArmPlainLinePatternI {
  leaf: LineDependentArmPlainLinePatternI;
  firstChild: LineDependentArmPlainLinePatternI;
  otherChild: LineDependentArmPlainLinePatternI;
  lastChild: LineDependentArmPlainLinePatternI;
}

export interface KnotDependentArmPatternI {
  plainPattern: KnotDependentArmPlainLinePatternI;
  style: Style;
}
