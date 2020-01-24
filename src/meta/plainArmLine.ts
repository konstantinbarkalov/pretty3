// deprecated
import { LineDependentArmsI, ArmT, LineDependentPlainArmLineI, ChildDependentPlainArmLineI } from './types/deprecated';
import { PlainArmLineT } from './types/plainArmLine';



export class LineDependentArms implements LineDependentArmsI {
  constructor(public firstLine: ArmT[], public otherLine: ArmT[], public lastLine: ArmT[]) { }
}
export class LineDependentPlainArmLine implements LineDependentPlainArmLineI {
  constructor(public firstLine: PlainArmLineT, public otherLine: PlainArmLineT, public lastLine: PlainArmLineT) { }
}
export class ChildDependentPlainArmLine implements ChildDependentPlainArmLineI {
  constructor(public leaf: LineDependentPlainArmLineI, public firstChild: LineDependentPlainArmLineI, public otherChild: LineDependentPlainArmLineI, public lastChild: LineDependentPlainArmLineI) { }
}
