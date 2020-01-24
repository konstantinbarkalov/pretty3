import { StrictUnicodeLine, StrictUnicodeChar } from '../text/strictUnicode';
import { PlainArmLinePatternI, LineDependentPlainArmLinePatternI, ChildDependentPlainArmLinePatternI, ChildDependentArmPatternI } from './types/pattern';
import { Style } from '../text/style';


export class PlainArmLinePattern implements PlainArmLinePatternI {

  constructor(public firstChar: StrictUnicodeChar, public otherChar: StrictUnicodeChar, public lastChar: StrictUnicodeChar) { }
  /**
   * Generates line with drawn plainArmLine like: `╰───╸`
   * with repeating `this.other` character to fit `this.armWidth`
   *
   * @remarks
   *
   * During generation `first` have higher priority then `last`.
   * So `first` will be the only generated character if `this.armWidth = 1`.
   * Same way `other` have lowest priority. And appars only if `this.armWidth > 2`
   *
   * @param {number} armWidth
   * Width of generated plainArmLine. Measured in monospaced-character positions.
   * @returns {StrictUnicodeLine}
   * Drawn plainArmLine, wrapped in StrictUnicodeLine.
   *
   * @remarks
   *
   * Returning StrictUnicodeLine instead of raw string is to skip
   * safaty-checks in tree generator/renderer.
   *
   * @memberof BasicPattern
   */
  generatePlainArmLine(armWidth: number): StrictUnicodeLine {
    let generated = '';
    if (armWidth > 0) {
      generated += this.firstChar.toString();
    }
    if (armWidth > 2) {
      generated += this.otherChar.toString().repeat(armWidth - 2);
    }
    if (armWidth > 1) {
      generated += this.lastChar.toString();
    }
    return new StrictUnicodeLine(generated, true);
  }
  static fromString(chars: string): PlainArmLinePattern {
    const basicСhars: [StrictUnicodeChar, StrictUnicodeChar, StrictUnicodeChar] = [
      new StrictUnicodeChar(chars[0]),
      new StrictUnicodeChar(chars[1]),
      new StrictUnicodeChar(chars[2]),
    ];
    const plainArmLinePattern = new PlainArmLinePattern(...basicСhars);
    return plainArmLinePattern;
  }
}

export class LineDependentPlainArmLinePattern implements LineDependentPlainArmLinePatternI {
  constructor(public firstLine: PlainArmLinePatternI, public otherLine: PlainArmLinePatternI, public lastLine: PlainArmLinePatternI) { }
  static fromString(firstChars: string, otherChars: string, lastChars: string): LineDependentPlainArmLinePattern {
    const lineDependentPlainArmLinePattern = new LineDependentPlainArmLinePattern(
      PlainArmLinePattern.fromString(firstChars),
      PlainArmLinePattern.fromString(otherChars),
      PlainArmLinePattern.fromString(lastChars),
    );
    return lineDependentPlainArmLinePattern;
  }
}

type patternMatrixT = [
  string, string, string,
  string, string, string,
  string, string, string,
  string, string, string,
];

export class ChildDependentPlainArmLinePattern implements ChildDependentPlainArmLinePatternI {
  constructor(public leaf: LineDependentPlainArmLinePatternI, public firstChild: LineDependentPlainArmLinePatternI, public otherChild: LineDependentPlainArmLinePatternI, public lastChild: LineDependentPlainArmLinePatternI) { }
  static fromMatrix(matrix: patternMatrixT): ChildDependentPlainArmLinePattern {
    const childDependentPlainArmLinePattern = new ChildDependentPlainArmLinePattern(
      LineDependentPlainArmLinePattern.fromString(matrix[0], matrix[1], matrix[2]),
      LineDependentPlainArmLinePattern.fromString(matrix[3], matrix[4], matrix[5]),
      LineDependentPlainArmLinePattern.fromString(matrix[6], matrix[7], matrix[8]),
      LineDependentPlainArmLinePattern.fromString(matrix[9], matrix[10], matrix[11]),
    );
    return childDependentPlainArmLinePattern;
  }
  static fromString(otherChildFirstLine: string, spacer: string, lastChildFirstLine: string,): ChildDependentPlainArmLinePattern {
    const childDependentPlainArmLinePattern = ChildDependentPlainArmLinePattern.fromMatrix([
      otherChildFirstLine, spacer, spacer,
      otherChildFirstLine, spacer, spacer,
      otherChildFirstLine, spacer, spacer,
      lastChildFirstLine , '   ',  '   ',
    ]);
    return childDependentPlainArmLinePattern;
  }
}


export class ChildDependentArmPattern implements ChildDependentArmPatternI {
  constructor(public plainPattern: ChildDependentPlainArmLinePattern, public style: Style) { }
}