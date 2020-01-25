import { ArmPatternI } from '../armPattern';
import { KnotMatrixI, MatrixI } from './matrix';

export interface ArmPatternKnotMatrixI extends KnotMatrixI<ArmPatternI> {
  firstLine: ArmPatternI;
  otherLine: ArmPatternI;
  lastLine: ArmPatternI;
}

export interface ArmPatternMatrixI extends MatrixI<ArmPatternI> {
  leaf: ArmPatternKnotMatrixI;
  firstChild: ArmPatternKnotMatrixI;
  otherChild: ArmPatternKnotMatrixI;
  lastChild: ArmPatternKnotMatrixI;
}
