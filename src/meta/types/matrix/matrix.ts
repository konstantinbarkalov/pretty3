export interface KnotMatrixI<T> {
  firstLine: T;
  otherLine: T;
  lastLine: T;
}

export interface MatrixI<T> {
  leaf: KnotMatrixI<T>;
  firstChild: KnotMatrixI<T>;
  otherChild: KnotMatrixI<T>;
  lastChild: KnotMatrixI<T>;
}