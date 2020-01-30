import { nodePrebuildedThemeT } from '../interfaces/prebuildedTheme';
import { AtomicTextContainer } from '../../text/textContainer';
import { StrictUnicodeLine } from '../../text/strictUnicode';
import { ArmPatternMatrix } from '../../meta/matrix/armPatternMatrix';
import { ArmWidthMatrix } from '../../meta/matrix/armWidthMatrix';
import { MatrixDrivenArmGenerator, MatrixDrivenArmWidthGenerator } from '../../meta/matrix/matrixDrivenArmGenerator';

const fallbackArmPatternMatrix = ArmPatternMatrix.fromCommonChars(
  '|->',
  '|  ',
  'L->',
);
const fallbackArmWidthMatrix = ArmWidthMatrix.fromCommonWidth(4);

export const fallback: nodePrebuildedThemeT = {
  icon: {

  },
  arm: {
    armGenerator: new MatrixDrivenArmGenerator(fallbackArmPatternMatrix),
    armWidthGenerator: new MatrixDrivenArmWidthGenerator(fallbackArmWidthMatrix),
  },
  key: {
    content: {
    }
  },
  keyDelimiter: {
    container: new AtomicTextContainer(new StrictUnicodeLine(' ')),
  },

  value: {
    content: {

    }
  },
  valueDelimiter: {
    container: new AtomicTextContainer(new StrictUnicodeLine(': ')),
  },

  info: {
    content: {

    }
  },

  infoDelimiter: {
    container: new AtomicTextContainer(new StrictUnicodeLine(' / ')),
  },

  remark: {
    content: {

    }
  },

  remarkDelimiter: {
    container: new AtomicTextContainer(new StrictUnicodeLine(' * ')),
  },
};