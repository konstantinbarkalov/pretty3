import { StrictUnicodeLine, StrictUnicodeChar } from '../text/strictUnicode';
import { AnyTextContainer, AtomicTextContainer } from '../text/textContainer';

export interface MetaNodeI {
  children: MetaNodeI[];
  pattern: ChildDependentArmPatternI;
  leaf: AnyTextContainer;
}

export type armT = StrictUnicodeLine;

export interface LineDependentArmI {
  firstLine: armT;
  otherLine: armT;
  lastLine: armT;
}

export interface ChildDependentArmI {
  firstChild: LineDependentArmI;
  otherChild: LineDependentArmI;
  lastChild: LineDependentArmI;
}

export type styledArmT = AtomicTextContainer<StrictUnicodeLine>;

export interface LineDependentStyledArmI {
  firstLine: styledArmT;
  otherLine: styledArmT;
  lastLine: styledArmT;
}

export interface LineDependentStyledArmsI {
  firstLine: styledArmT[];
  otherLine: styledArmT[];
  lastLine: styledArmT[];
}

export interface ArmPatternI {
  firstChar: StrictUnicodeChar;
  otherChar: StrictUnicodeChar;
  lastChar: StrictUnicodeChar;
  generateArm(armWidth: number): armT;
}

export interface LineDependentArmPatternI {
  firstLine: ArmPatternI;
  otherLine: ArmPatternI;
  lastLine: ArmPatternI;
  generateLineDependentArm(armWidth: number): LineDependentArmI;
}

export interface ChildDependentArmPatternI {
  firstChild: LineDependentArmPatternI;
  otherChild: LineDependentArmPatternI;
  lastChild: LineDependentArmPatternI;
  generateChildDependentArm(armWidth: number): ChildDependentArmI;
}