import { StrictUnicodeLine, StrictUnicodeChar } from '../text/strictUnicode';
import { AnyTextContainer, AtomicTextContainer } from '../text/textContainer';

export interface MetaNodeI {
  children: MetaNodeI[];
  nodePattern: UniversalArmPatternI;
  leaf: AnyTextContainer;
}

export type unstyledArmT = StrictUnicodeLine;

export interface ConditionalUnstyledArmI {
  first: unstyledArmT;
  other: unstyledArmT;
  last: unstyledArmT;
}
export interface UniversalUnstyledArmI {
  first: ConditionalUnstyledArmI;
  other: ConditionalUnstyledArmI;
  last: ConditionalUnstyledArmI;
}

export type armT = AtomicTextContainer<StrictUnicodeLine>;

export interface ConditionalArmI {
  first: armT;
  other: armT;
  last: armT;
}

export interface ConditionalArmsI {
  first: armT[];
  other: armT[];
  last: armT[];
}

export interface ArmPatternI {
  first: StrictUnicodeChar;
  other: StrictUnicodeChar;
  last: StrictUnicodeChar;
  generateUnstyledArm(armWidth: number): unstyledArmT;
}

export interface ConditionalArmPatternI {
  first: ArmPatternI;
  other: ArmPatternI;
  last: ArmPatternI;
  generateConditionalUnstyledArm(armWidth: number): ConditionalUnstyledArmI;
}

export interface UniversalArmPatternI {
  first: ConditionalArmPatternI;
  other: ConditionalArmPatternI;
  last: ConditionalArmPatternI;
  generateUniversalUnstyledArm(armWidth: number): UniversalUnstyledArmI;
}