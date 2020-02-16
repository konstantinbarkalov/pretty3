export interface KnotMatrixI<T> {
  readonly firstLine: T;
  readonly otherLine: T;
  readonly lastLine: T;
}

export interface MatrixI<T> {
  readonly infertileLeaf: KnotMatrixI<T>;
  readonly fertileLeaf: KnotMatrixI<T>;
  readonly firstChild: KnotMatrixI<T>;
  readonly otherChild: KnotMatrixI<T>;
  readonly lastChild: KnotMatrixI<T>;
}

export interface KnotMatrixWithRulesI<T> {
  readonly rules: strictUnicodeRulesT;
  readonly firstLine: T;
  readonly otherLine: T;
  readonly lastLine: T;
}

export interface MatrixWithRulesI<T> {
  readonly rules: strictUnicodeRulesT;
  readonly infertileLeaf: KnotMatrixWithRulesI<T>;
  readonly fertileLeaf: KnotMatrixWithRulesI<T>;
  readonly firstChild: KnotMatrixWithRulesI<T>;
  readonly otherChild: KnotMatrixWithRulesI<T>;
  readonly lastChild: KnotMatrixWithRulesI<T>;
}