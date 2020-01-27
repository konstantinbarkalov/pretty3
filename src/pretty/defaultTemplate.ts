import { ArmPatternMatrix } from '../meta/matrix/armPatternMatrix';
import { spacedArmWidthT } from '../meta/interfaces/arm/armWidth';
import { ArmWidthMatrix } from '../meta/matrix/armWidthMatrix';
import { MatrixDrivenArmGenerator, MatrixDrivenArmWidthGenerator } from '../meta/matrix/matrixDrivenArmGenerator';
import { metaNodeTemplateT } from './interfaces/general';
import { theme } from './defaultTheme';

const otherArmPatternMatrix = ArmPatternMatrix.fromArray([
  '   ', '   ', '   ',
  '   ', '?  ', '?  ',
  '???', '?  ', '?  ',
  '???', '?  ', '?  ',
  '???', '   ', '   ',
], theme.style.branch);

const arrayArmPatternMatrix = ArmPatternMatrix.fromArray([
  '   ', '   ', '   ',
  '   ', '│  ', '│  ',
  '├─╸', '│  ', '│  ',
  '├─╸', '│  ', '│  ',
  '└─╸', '   ', '   ',
], theme.style.branch);

const objectArmPatternMatrix = ArmPatternMatrix.fromArray([
  '   ', '   ', '   ',
  '   ', '│  ', '│  ',
  '├─╴', '│  ', '│  ',
  '├─╴', '│  ', '│  ',
  '╰─╴', '   ', '   ',
], theme.style.branch);


const armWidth: spacedArmWidthT = {preSpace: 1, postSpace: 1, arm: 4};
const smallArmWidth: spacedArmWidthT = {preSpace: 1, postSpace: 1, arm: 1};
const armWidthMatrix = ArmWidthMatrix.fromArray([
  0,        0,        0,
  0,        smallArmWidth, smallArmWidth,
  armWidth, armWidth, armWidth,
  armWidth, armWidth, armWidth,
  armWidth, armWidth, armWidth,
]);

const array: metaNodeTemplateT = {
  armGenerator: new MatrixDrivenArmGenerator(arrayArmPatternMatrix),
  armWidthGenerator: new MatrixDrivenArmWidthGenerator(armWidthMatrix),
};

const object: metaNodeTemplateT = {
  armGenerator: new MatrixDrivenArmGenerator(objectArmPatternMatrix),
  armWidthGenerator: new MatrixDrivenArmWidthGenerator(armWidthMatrix),
};

const other: metaNodeTemplateT = {
  armGenerator: new MatrixDrivenArmGenerator(otherArmPatternMatrix),
  armWidthGenerator: new MatrixDrivenArmWidthGenerator(armWidthMatrix),
};
export const template = {
  array,
  object,
  other,
};