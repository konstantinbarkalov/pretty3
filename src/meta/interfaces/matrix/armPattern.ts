import { StrictUnicodeChar } from '../../../text/strictUnicode';
import { armWidthT } from '../arm/armWidth';
import { ArmT } from '../arm/arm';
import { Style } from '../../../text/style';

export interface ArmPatternI {
  readonly rules: strictUnicodeRulesT;
  readonly firstChar: StrictUnicodeChar;
  readonly otherChar: StrictUnicodeChar;
  readonly lastChar: StrictUnicodeChar;
  generateArm(armWidth: armWidthT): ArmT;
  style?: Style;
}

export type consumableArmCharT = string | StrictUnicodeChar;
export type consumableArmCharsT = string | [consumableArmCharT, consumableArmCharT, consumableArmCharT];
