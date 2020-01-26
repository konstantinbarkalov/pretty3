import { ArmPatternMatrix } from '../meta/matrix/armPatternMatrix';
import { spacedArmWidthT } from '../meta/interfaces/arm/armWidth';
import { ArmWidthMatrix } from '../meta/matrix/armWidthMatrix';
import { MatrixDrivenArmGenerator, MatrixDrivenArmWidthGenerator } from '../meta/matrix/matrixDrivenArmGenerator';
import { metaNodeTemplateT } from '../interfaces/general';
import { theme } from './defaultTheme';

const armPatternMatrix = ArmPatternMatrix.fromArray([
  '┬─)', '│  ', '│  ',
  '┬─>', '│  ', '│  ',
  '├──', '│  ', '│  ',
  '├──', '│  ', '│  ',
  '└──', '   ', '   ',
], theme.style.branch);

const armWidth: spacedArmWidthT = {preSpace: 1, postSpace: 1, arm: 4};
const smallArmWidth: spacedArmWidthT = {preSpace: 1, postSpace: 1, arm: 8};
const armWidthMatrix = ArmWidthMatrix.fromArray([
  0,        0,        0,
  0,        smallArmWidth, smallArmWidth,
  armWidth, armWidth, armWidth,
  armWidth, armWidth, armWidth,
  armWidth, armWidth, armWidth,
]);

const array: metaNodeTemplateT = {
  armGenerator: new MatrixDrivenArmGenerator(armPatternMatrix),
  armWidthGenerator: new MatrixDrivenArmWidthGenerator(armWidthMatrix),
};

const object: metaNodeTemplateT = {
  armGenerator: new MatrixDrivenArmGenerator(armPatternMatrix),
  armWidthGenerator: new MatrixDrivenArmWidthGenerator(armWidthMatrix),
};

export const template = {
  array,
  object
};