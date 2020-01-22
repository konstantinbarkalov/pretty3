import { StrictUnicodeLine, StrictUnicodeChar } from '../text/strictUnicode';
import { AnyTextContainer, AtomicTextContainer } from '../text/textContainer';

export interface MetaNodeI {
  children: MetaNodeI[];
  nodePattern: ChildDependedArmPatternI;
  leaf: AnyTextContainer;
}

export type armT = StrictUnicodeLine;

export interface LineDependedArmI {
  firstLine: armT;
  otherLine: armT;
  lastLine: armT;
}

export interface ChildDependedArmI {
  firstChild: LineDependedArmI;
  otherChild: LineDependedArmI;
  lastChild: LineDependedArmI;
}

export type styledArmT = AtomicTextContainer<StrictUnicodeLine>;

export interface LineDependedStyledArmI {
  firstLine: styledArmT;
  otherLine: styledArmT;
  lastLine: styledArmT;
}

export interface LineDependedStyledArmsI {
  firstLine: styledArmT[];
  otherLine: styledArmT[];
  lastLine: styledArmT[];
}

export interface ArmPatternI {
  firstChar: StrictUnicodeChar;
  otherChar: StrictUnicodeChar;
  lastChar: StrictUnicodeChar;
  generateUnstyledArm(armWidth: number): armT;
}

export interface LineDependedArmPatternI {
  firstLine: ArmPatternI;
  otherLine: ArmPatternI;
  lastLine: ArmPatternI;
  generateLineDependedUnstyledArm(armWidth: number): LineDependedArmI;
}

export interface ChildDependedArmPatternI {
  firstChild: LineDependedArmPatternI;
  otherChild: LineDependedArmPatternI;
  lastChild: LineDependedArmPatternI;
  generateChildDependedUnstyledArm(armWidth: number): ChildDependedArmI;
}