import { StrictUnicodeLine, StrictUnicodeChar } from '../text/strictUnicode';
import { LineDependentArmPatternI, LineDependentStyledArmsI, ArmPatternI, styledArmT, LineDependentArmI, armT, ChildDependentArmPatternI, ChildDependentArmI } from './types';


export class LineDependentStyledArms implements LineDependentStyledArmsI {
  constructor(public firstLine: styledArmT[], public otherLine: styledArmT[], public lastLine: styledArmT[]) { }
}
export class LineDependentArm implements LineDependentArmI {
  constructor(public firstLine: armT, public otherLine: armT, public lastLine: armT) { }
}
export class ChildDependentArm implements ChildDependentArmI {
  constructor(public firstChild: LineDependentArmI, public otherChild: LineDependentArmI, public lastChild: LineDependentArmI) { }
}

export class ArmPattern implements ArmPatternI {

  constructor(public firstChar: StrictUnicodeChar, public otherChar: StrictUnicodeChar, public lastChar: StrictUnicodeChar) { }
  /**
   * Generates line with drawn arm like: `╰───╸`
   * with repeating `this.other` character to fit `this.armWidth`
   *
   * @remarks
   *
   * During generation `last` have higher priority then `first`.
   * So `last` will be the only generated character if `this.armWidth = 1`.
   * Same way `other` have lowest priority. And appars only if `this.armWidth > 2`
   *
   * @param {number} armWidth
   * Width of generated arm. Measured in monospaced-character positions.
   * @returns {StrictUnicodeLine}
   * Drawn arm, wrapped in StrictUnicodeLine.
   *
   * @remarks
   *
   * Returning StrictUnicodeLine instead of raw string is to skip
   * safaty-checks in tree generator/renderer.
   *
   * @memberof BasicPattern
   */
  generateArm(armWidth: number): StrictUnicodeLine {
    let generated = '';
    if (armWidth > 1) {
      generated += this.firstChar.toString();
    }
    if (armWidth > 2) {
      generated += this.otherChar.toString().repeat(armWidth - 2);
    }
    if (armWidth > 0) {
      generated += this.lastChar.toString();
    }
    return new StrictUnicodeLine(generated, true);
  }
}

export class LineDependentArmPattern implements LineDependentArmPatternI {
  constructor(public firstLine: ArmPatternI, public otherLine: ArmPatternI, public lastLine: ArmPatternI) { }
  generateLineDependentArm(armWidth: number): LineDependentArmI {
    const lineDependentArm: LineDependentArm = new LineDependentArm (
      this.firstLine.generateArm(armWidth),
      this.otherLine.generateArm(armWidth),
      this.lastLine.generateArm(armWidth),
    );
    return lineDependentArm;
  }
}

export class ChildDependentArmPattern implements ChildDependentArmPatternI {
  constructor(public firstChild: LineDependentArmPatternI, public otherChild: LineDependentArmPatternI, public lastChild: LineDependentArmPatternI) { }
  generateChildDependentArm(armWidth: number): ChildDependentArmI {
    const childDependentArm: ChildDependentArm = new ChildDependentArm (
      this.firstChild.generateLineDependentArm(armWidth),
      this.otherChild.generateLineDependentArm(armWidth),
      this.lastChild.generateLineDependentArm(armWidth),
    );
    return childDependentArm;
  }
}
function easyCreateArmPattern(chars: string): ArmPattern {
  const basicСhars: [StrictUnicodeChar, StrictUnicodeChar, StrictUnicodeChar] = [
    new StrictUnicodeChar(chars[0]),
    new StrictUnicodeChar(chars[1]),
    new StrictUnicodeChar(chars[2]),
  ];
  const armPattern = new ArmPattern(...basicСhars);
  return armPattern;
}
function easyCreateLineDependentArmPattern(firstChars: string, otherChars: string, lastChars: string): LineDependentArmPattern {
  const lineDependentArmPattern = new LineDependentArmPattern(
    easyCreateArmPattern(firstChars),
    easyCreateArmPattern(otherChars),
    easyCreateArmPattern(lastChars),
  );
  return lineDependentArmPattern;
}
type easyCreateChildDependentArmPatternSettingsT = {
  otherChildFirstLine: string; lastChildFirstLine: string; nonlastChildotherLine: string;
};
export function easyCreateChildDependentArmPattern(settings: easyCreateChildDependentArmPatternSettingsT): ChildDependentArmPattern
export function easyCreateChildDependentArmPattern(matrix: string[]): ChildDependentArmPattern
export function easyCreateChildDependentArmPattern(input: string[] | easyCreateChildDependentArmPatternSettingsT): ChildDependentArmPattern {
  if (Array.isArray(input)) {
    const childDependentArmPattern = new ChildDependentArmPattern(
      easyCreateLineDependentArmPattern(input[0], input[1], input[2]),
      easyCreateLineDependentArmPattern(input[3], input[4], input[5]),
      easyCreateLineDependentArmPattern(input[6], input[7], input[8]),
    );
    return childDependentArmPattern;
  } else {
    const childDependentArmPattern = new ChildDependentArmPattern(
      easyCreateLineDependentArmPattern(input.otherChildFirstLine, input.nonlastChildotherLine, input.nonlastChildotherLine),
      easyCreateLineDependentArmPattern(input.otherChildFirstLine, input.nonlastChildotherLine, input.nonlastChildotherLine),
      easyCreateLineDependentArmPattern(input.lastChildFirstLine, '   ', '   '),
    );
    return childDependentArmPattern;
  }

}

