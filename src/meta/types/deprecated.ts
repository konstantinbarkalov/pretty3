import { ArmT } from './arm';
import { AtomicTextContainer } from '../../text/textContainer';
import { StrictUnicodeLine } from '../../text/strictUnicode';


export interface LineDependentArmI {
  firstLine: ArmT;
  otherLine: ArmT;
  lastLine: ArmT;
}

export interface ChildDependentArmI {
  leaf: LineDependentArmI;
  firstChild: LineDependentArmI;
  otherChild: LineDependentArmI;
  lastChild: LineDependentArmI;
}

export type StyledArmT = AtomicTextContainer<StrictUnicodeLine>;

export interface LineDependentStyledArmI {
  firstLine: StyledArmT;
  otherLine: StyledArmT;
  lastLine: StyledArmT;
}

export interface LineDependentStyledArmsI {
  firstLine: StyledArmT[];
  otherLine: StyledArmT[];
  lastLine: StyledArmT[];
}

