import { ArmPatternI } from './armPattern';
import { KnotMatrixWithRulesI, MatrixWithRulesI } from './matrix';



export interface ArmPatternKnotMatrixI extends KnotMatrixWithRulesI<ArmPatternI> {
  readonly rules: strictUnicodeRulesT;
  readonly firstLine: ArmPatternI;
  readonly otherLine: ArmPatternI;
  readonly lastLine: ArmPatternI;
}

export interface ArmPatternMatrixI extends MatrixWithRulesI<ArmPatternI> {
  readonly rules: strictUnicodeRulesT;
  readonly infertileLeaf: ArmPatternKnotMatrixI;
  readonly fertileLeaf: ArmPatternKnotMatrixI;
  readonly firstChild: ArmPatternKnotMatrixI;
  readonly otherChild: ArmPatternKnotMatrixI;
  readonly lastChild: ArmPatternKnotMatrixI;
}
