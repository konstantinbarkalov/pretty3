import { StrictUnicodeChar } from '../../text/strictUnicode';
import { Style } from '../../text/style';
import { ArmT } from './arm';
import { armWidthT } from './armWidth';
export interface ArmPatternI {
  firstChar: StrictUnicodeChar;
  otherChar: StrictUnicodeChar;
  lastChar: StrictUnicodeChar;
  generateArm(armWidth: armWidthT): ArmT;
  style: Style;
}
