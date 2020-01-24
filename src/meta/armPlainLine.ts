// deprecated
import { LineDependentArmsI, ArmT, LineDependentArmPlainLineI, ChildDependentArmPlainLineI } from './types/deprecated';
import { ArmPlainLineT } from './types/armPlainLine';



export class LineDependentArms implements LineDependentArmsI {
  constructor(public firstLine: ArmT[], public otherLine: ArmT[], public lastLine: ArmT[]) { }
}
export class LineDependentArmPlainLine implements LineDependentArmPlainLineI {
  constructor(public firstLine: ArmPlainLineT, public otherLine: ArmPlainLineT, public lastLine: ArmPlainLineT) { }
}
export class ChildDependentArmPlainLine implements ChildDependentArmPlainLineI {
  constructor(public leaf: LineDependentArmPlainLineI, public firstChild: LineDependentArmPlainLineI, public otherChild: LineDependentArmPlainLineI, public lastChild: LineDependentArmPlainLineI) { }
}
