import { PlainArmLineT } from './plainArmLine';
import { AtomicTextContainer } from '../../text/textContainer';
import { StrictUnicodeLine } from '../../text/strictUnicode';


export interface LineDependentPlainArmLineI {
  firstLine: PlainArmLineT;
  otherLine: PlainArmLineT;
  lastLine: PlainArmLineT;
}

export interface ChildDependentPlainArmLineI {
  leaf: LineDependentPlainArmLineI;
  firstChild: LineDependentPlainArmLineI;
  otherChild: LineDependentPlainArmLineI;
  lastChild: LineDependentPlainArmLineI;
}

export type ArmT = AtomicTextContainer<StrictUnicodeLine>;

export interface LineDependentArmI {
  firstLine: ArmT;
  otherLine: ArmT;
  lastLine: ArmT;
}

export interface LineDependentArmsI {
  firstLine: ArmT[];
  otherLine: ArmT[];
  lastLine: ArmT[];
}

