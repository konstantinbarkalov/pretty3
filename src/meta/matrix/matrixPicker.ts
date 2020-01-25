import { MatrixI, KnotMatrixI } from '../types/matrix/matrix';
import { generateFnParametersT } from '../types/arm/armGenerator';


export abstract class MatrixPicker<T> {
  constructor (public matrix: MatrixI<T>) { }
  public pickFromMatrix(parameters: generateFnParametersT): T {
    const hasChildren = parameters.node.children.length > 0;
    const isFirstChild = parameters.childNum === 0;
    const isLastChild = parameters.childNum === parameters.node.children.length - 1;
    const isFirstLineOfKnot = parameters.lineOfKnotNum === 0;
    const isLastLineOfKnot = parameters.isLastLineOfKnot;
    const isLeaf = parameters.childNum === null;

    let knotMatrix: KnotMatrixI<T>;
    if (isLeaf) {
      if (hasChildren) {
        knotMatrix = this.matrix.fertileLeaf;
      } else {
        knotMatrix = this.matrix.infertileLeaf;
      }
    } else if (isFirstChild) {
      knotMatrix = this.matrix.firstChild;
    } else if (isLastChild) {
      knotMatrix = this.matrix.lastChild;
    } else {
      knotMatrix = this.matrix.otherChild;
    }

    let value: T;
    if (isFirstLineOfKnot) {
      value = knotMatrix.firstLine;
    } else if (isLastLineOfKnot) {
      if (hasChildren) {
        value = knotMatrix.otherLine;
      } else {
        value = knotMatrix.lastLine;
      }
    } else {
      value = knotMatrix.otherLine;
    }
    return value;
  }
}


