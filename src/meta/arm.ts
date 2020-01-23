// deprecated
import { LineDependentStyledArmsI, StyledArmT, LineDependentArmI, ChildDependentArmI } from './types/deprecated';
import { ArmT } from './types/arm';


export class LineDependentStyledArms implements LineDependentStyledArmsI {
  constructor(public firstLine: StyledArmT[], public otherLine: StyledArmT[], public lastLine: StyledArmT[]) { }
}
export class LineDependentArm implements LineDependentArmI {
  constructor(public firstLine: ArmT, public otherLine: ArmT, public lastLine: ArmT) { }
}
export class ChildDependentArm implements ChildDependentArmI {
  constructor(public leaf: LineDependentArmI, public firstChild: LineDependentArmI, public otherChild: LineDependentArmI, public lastChild: LineDependentArmI) { }
}
