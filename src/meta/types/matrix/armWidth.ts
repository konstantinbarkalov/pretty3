import { armWidthT } from '../armWidth';
import { KnotMatrixI, MatrixI } from './matrix';

export interface ArmWidthKnotMatrixI extends KnotMatrixI<armWidthT> {
  firstLine: armWidthT;
  otherLine: armWidthT;
  lastLine: armWidthT;
}

export interface ArmWidthMatrixI extends MatrixI<armWidthT> {
  infertileLeaf: ArmWidthKnotMatrixI;
  fertileLeaf: ArmWidthKnotMatrixI;
  firstChild: ArmWidthKnotMatrixI;
  otherChild: ArmWidthKnotMatrixI;
  lastChild: ArmWidthKnotMatrixI;
}
