import { ArmPlainLineT } from './armPlainLine';
import { AtomicTextContainer } from '../../text/textContainer';
import { StrictUnicodeLine } from '../../text/strictUnicode';


export interface LineDependentArmPlainLineI {
  firstLine: ArmPlainLineT;
  otherLine: ArmPlainLineT;
  lastLine: ArmPlainLineT;
}

export interface ChildDependentArmPlainLineI {
  leaf: LineDependentArmPlainLineI;
  firstChild: LineDependentArmPlainLineI;
  otherChild: LineDependentArmPlainLineI;
  lastChild: LineDependentArmPlainLineI;
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

