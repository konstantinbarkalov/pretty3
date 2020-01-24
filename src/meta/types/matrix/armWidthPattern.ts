import { KnotMatrixI, MatrixI } from './matrix';

export interface ArmPatternKnotMatrixI extends KnotMatrixI<number> {
  firstLine: number;
  otherLine: number;
  lastLine: number;
}

export interface ArmPatternMatrixI extends MatrixI<number> {
  leaf: ArmPatternKnotMatrixI;
  firstChild: ArmPatternKnotMatrixI;
  otherChild: ArmPatternKnotMatrixI;
  lastChild: ArmPatternKnotMatrixI;
}
