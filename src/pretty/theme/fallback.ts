import { nodePrebuildedThemeT } from '../interfaces/prebuildedTheme';
import { ArmPatternMatrix } from '../../meta/matrix/armPatternMatrix';
import { ArmWidthMatrix } from '../../meta/matrix/armWidthMatrix';
import { MatrixDrivenArmGenerator, MatrixDrivenArmWidthGenerator } from '../../meta/matrix/matrixDrivenArmGenerator';

const fallbackArmPatternMatrix = ArmPatternMatrix.fromCommonChars(
  '|->',
  '|  ',
  'L->',
);
const fallbackArmWidthMatrix = ArmWidthMatrix.fromCommonWidth(4);

// TODO: remove ablility to falback to key/value/info/etc items, and
// use it only as armGenerator fallback
export const fallback: nodePrebuildedThemeT = {
  arm: {
    armGenerator: new MatrixDrivenArmGenerator(fallbackArmPatternMatrix),
    armWidthGenerator: new MatrixDrivenArmWidthGenerator(fallbackArmWidthMatrix),
  },
};