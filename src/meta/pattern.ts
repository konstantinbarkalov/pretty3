import { StrictUnicodeLine, StrictUnicodeChar } from '../text/strictUnicode';
import { ArmPlainLinePatternI, LineDependentArmPlainLinePatternI, ChildDependentArmPlainLinePatternI, ChildDependentArmPatternI } from './types/pattern';
import { Style } from '../text/style';


export class ArmPlainLinePattern implements ArmPlainLinePatternI {

  constructor(public firstChar: StrictUnicodeChar, public otherChar: StrictUnicodeChar, public lastChar: StrictUnicodeChar) { }
  /**
   * Generates line with drawn armPlainLine like: `╰───╸`
   * with repeating `this.other` character to fit `this.armWidth`
   *
   * @remarks
   *
   * During generation `first` have higher priority then `last`.
   * So `first` will be the only generated character if `this.armWidth = 1`.
   * Same way `other` have lowest priority. And appars only if `this.armWidth > 2`
   *
   * @param {number} armWidth
   * Width of generated armPlainLine. Measured in monospaced-character positions.
   * @returns {StrictUnicodeLine}
   * Drawn armPlainLine, wrapped in StrictUnicodeLine.
   *
   * @remarks
   *
   * Returning StrictUnicodeLine instead of raw string is to skip
   * safaty-checks in tree generator/renderer.
   *
   * @memberof BasicPattern
   */
  generateArmPlainLine(armWidth: number): StrictUnicodeLine {
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
  static fromString(chars: string): ArmPlainLinePattern {
    const basicСhars: [StrictUnicodeChar, StrictUnicodeChar, StrictUnicodeChar] = [
      new StrictUnicodeChar(chars[0]),
      new StrictUnicodeChar(chars[1]),
      new StrictUnicodeChar(chars[2]),
    ];
    const armPlainLinePattern = new ArmPlainLinePattern(...basicСhars);
    return armPlainLinePattern;
  }
}

export class LineDependentArmPlainLinePattern implements LineDependentArmPlainLinePatternI {
  constructor(public firstLine: ArmPlainLinePatternI, public otherLine: ArmPlainLinePatternI, public lastLine: ArmPlainLinePatternI) { }
  static fromString(firstChars: string, otherChars: string, lastChars: string): LineDependentArmPlainLinePattern {
    const lineDependentArmPlainLinePattern = new LineDependentArmPlainLinePattern(
      ArmPlainLinePattern.fromString(firstChars),
      ArmPlainLinePattern.fromString(otherChars),
      ArmPlainLinePattern.fromString(lastChars),
    );
    return lineDependentArmPlainLinePattern;
  }
}

type patternMatrixT = [
  string, string, string,
  string, string, string,
  string, string, string,
  string, string, string,
];

export class ChildDependentArmPlainLinePattern implements ChildDependentArmPlainLinePatternI {
  constructor(public leaf: LineDependentArmPlainLinePatternI, public firstChild: LineDependentArmPlainLinePatternI, public otherChild: LineDependentArmPlainLinePatternI, public lastChild: LineDependentArmPlainLinePatternI) { }
  static fromMatrix(matrix: patternMatrixT): ChildDependentArmPlainLinePattern {
    const childDependentArmPlainLinePattern = new ChildDependentArmPlainLinePattern(
      LineDependentArmPlainLinePattern.fromString(matrix[0], matrix[1], matrix[2]),
      LineDependentArmPlainLinePattern.fromString(matrix[3], matrix[4], matrix[5]),
      LineDependentArmPlainLinePattern.fromString(matrix[6], matrix[7], matrix[8]),
      LineDependentArmPlainLinePattern.fromString(matrix[9], matrix[10], matrix[11]),
    );
    return childDependentArmPlainLinePattern;
  }
  static fromString(otherChildFirstLine: string, spacer: string, lastChildFirstLine: string,): ChildDependentArmPlainLinePattern {
    const childDependentArmPlainLinePattern = ChildDependentArmPlainLinePattern.fromMatrix([
      otherChildFirstLine, spacer, spacer,
      otherChildFirstLine, spacer, spacer,
      otherChildFirstLine, spacer, spacer,
      lastChildFirstLine , '   ',  '   ',
    ]);
    return childDependentArmPlainLinePattern;
  }
}


export class ChildDependentArmPattern implements ChildDependentArmPatternI {
  constructor(public plainPattern: ChildDependentArmPlainLinePattern, public style: Style) { }
}