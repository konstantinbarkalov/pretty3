import { armWidthT } from '../arm';
import { KnotMatrixI, MatrixI } from './matrix';

export interface ArmPatternKnotMatrixI extends KnotMatrixI<armWidthT> {
  firstLine: armWidthT;
  otherLine: armWidthT;
  lastLine: armWidthT;
}

export interface ArmPatternMatrixI extends MatrixI<armWidthT> {
  leaf: ArmPatternKnotMatrixI;
  firstChild: ArmPatternKnotMatrixI;
  otherChild: ArmPatternKnotMatrixI;
  lastChild: ArmPatternKnotMatrixI;
}
