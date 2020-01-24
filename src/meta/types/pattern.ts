import { StrictUnicodeChar } from '../../text/strictUnicode';

import { Style } from '../../text/style';
import { ArmPlainLineT } from './armPlainLine';

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

export interface ChildDependentArmPlainLinePatternI {
  leaf: LineDependentArmPlainLinePatternI;
  firstChild: LineDependentArmPlainLinePatternI;
  otherChild: LineDependentArmPlainLinePatternI;
  lastChild: LineDependentArmPlainLinePatternI;
}

export interface ChildDependentArmPatternI {
  plainPattern: ChildDependentArmPlainLinePatternI;
  style: Style;
}
