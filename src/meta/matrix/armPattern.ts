import { StrictUnicodeLine, StrictUnicodeChar } from '../../text/strictUnicode';
import { Style } from '../../text/style';
import { ArmT } from '../interfaces/arm/arm';
import { AtomicTextContainer } from '../../text/textContainer';
import { ArmPatternI, consumableArmCharsT } from '../interfaces/matrix/armPattern';
import { armWidthT, spacedArmWidthT } from '../interfaces/arm/armWidth';

export class ArmPattern implements ArmPatternI {
  constructor(public readonly rules: strictUnicodeRulesT, public readonly firstChar: StrictUnicodeChar, public readonly otherChar: StrictUnicodeChar, public readonly lastChar: StrictUnicodeChar, public style?: Style) { }
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
   * @param {armWidthT} armWidth
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
  protected generateArmPlainLine(armWidth: armWidthT): StrictUnicodeLine {
    const spacedArmWidth: spacedArmWidthT = (typeof armWidth === 'number')
      ? {
        preSpace: 0,
        arm: armWidth,
        postSpace: 0,
      }
      : armWidth;
    let generated = '';
    if (spacedArmWidth.preSpace > 0) {
      generated += ' '.repeat(spacedArmWidth.preSpace);
    }
    if (spacedArmWidth.arm > 0) {
      generated += this.firstChar.toString();
    }
    if (spacedArmWidth.arm > 2) {
      generated += this.otherChar.toString().repeat(spacedArmWidth.arm - 2);
    }
    if (spacedArmWidth.arm > 1) {
      generated += this.lastChar.toString();
    }
    if (spacedArmWidth.postSpace > 0) {
      generated += ' '.repeat(spacedArmWidth.postSpace);
    }
    return new StrictUnicodeLine(this.rules, generated, true);
  }
  public generateArm(armWidth: armWidthT): ArmT {
    const plainLine = this.generateArmPlainLine(armWidth);
    const arm: ArmT = new AtomicTextContainer<StrictUnicodeLine>(plainLine.rules, plainLine, this.style);
    return arm;
  }
  static fromChars(rules: strictUnicodeRulesT, chars: consumableArmCharsT, style?: Style): ArmPattern {
    const armPlainLinePattern = new ArmPattern(rules, new StrictUnicodeChar(rules, chars[0]), new StrictUnicodeChar(rules, chars[1]), new StrictUnicodeChar(rules, chars[2]), style);
    return armPlainLinePattern;
  }
}
