import { StrictUnicodeChar } from '../../text/strictUnicode';
import { PlainArmLineT } from './plainArmLine';
import { Style } from '../../text/style';

export interface PlainArmLinePatternI {
  firstChar: StrictUnicodeChar;
  otherChar: StrictUnicodeChar;
  lastChar: StrictUnicodeChar;
  generatePlainArmLine(armWidth: number): PlainArmLineT;
}

export interface LineDependentPlainArmLinePatternI {
  firstLine: PlainArmLinePatternI;
  otherLine: PlainArmLinePatternI;
  lastLine: PlainArmLinePatternI;
}

export interface ChildDependentPlainArmLinePatternI {
  leaf: LineDependentPlainArmLinePatternI;
  firstChild: LineDependentPlainArmLinePatternI;
  otherChild: LineDependentPlainArmLinePatternI;
  lastChild: LineDependentPlainArmLinePatternI;
}

export interface ChildDependentArmPatternI {
  plainPattern: ChildDependentPlainArmLinePatternI;
  style: Style;
}
