import { ArmPatternMatrix } from '../meta/matrix/armPatternMatrix';
import { spacedArmWidthT } from '../meta/interfaces/arm/armWidth';
import { ArmWidthMatrix } from '../meta/matrix/armWidthMatrix';
import { MatrixDrivenArmGenerator, MatrixDrivenArmWidthGenerator } from '../meta/matrix/matrixDrivenArmGenerator';
import { metaNodeTemplateT } from './interfaces/general';
import { theme } from './defaultTheme';
import { NodeBroadTypeEnum } from './interfaces/nodeType';
import { typeDependentBroadOnlyDictionaryT } from './typeDependentDictionary';


const deadArmPatternMatrix = ArmPatternMatrix.fromArray([
  '   ', '   ', '   ',
  '   ', '?  ', '?  ',
  '???', '?  ', '?  ',
  '???', '?  ', '?  ',
  '???', '   ', '   ',
], theme.style.branch[NodeBroadTypeEnum.Dead]);

const singleArmPatternMatrix = ArmPatternMatrix.fromArray([
  '   ', '   ', '   ',
  '   ', '?  ', '?  ',
  '???', '?  ', '?  ',
  '???', '?  ', '?  ',
  '???', '   ', '   ',
], theme.style.branch[NodeBroadTypeEnum.Single]);

const iterableArmPatternMatrix = ArmPatternMatrix.fromArray([
  '   ', '   ', '   ',
  '   ', '│  ', '│  ',
  '├─╸', '│  ', '│  ',
  '├─╸', '│  ', '│  ',
  '└─╸', '   ', '   ',
], theme.style.branch[NodeBroadTypeEnum.Iterable]);

const enumerableArmPatternMatrix = ArmPatternMatrix.fromArray([
  '   ', '   ', '   ',
  '   ', '│  ', '│  ',
  '├─╴', '│  ', '│  ',
  '├─╴', '│  ', '│  ',
  '╰─╴', '   ', '   ',
], theme.style.branch[NodeBroadTypeEnum.Enumerable]);


const armWidth: spacedArmWidthT = {preSpace: 1, postSpace: 1, arm: 4};
const smallArmWidth: spacedArmWidthT = {preSpace: 1, postSpace: 1, arm: 1};
const armWidthMatrix = ArmWidthMatrix.fromArray([
  0,        0,        0,
  0,        smallArmWidth, smallArmWidth,
  armWidth, armWidth, armWidth,
  armWidth, armWidth, armWidth,
  armWidth, armWidth, armWidth,
]);

const dead: metaNodeTemplateT = {
  armGenerator: new MatrixDrivenArmGenerator(deadArmPatternMatrix),
  armWidthGenerator: new MatrixDrivenArmWidthGenerator(armWidthMatrix),
};

const single: metaNodeTemplateT = {
  armGenerator: new MatrixDrivenArmGenerator(singleArmPatternMatrix),
  armWidthGenerator: new MatrixDrivenArmWidthGenerator(armWidthMatrix),
};

const iterable: metaNodeTemplateT = {
  armGenerator: new MatrixDrivenArmGenerator(iterableArmPatternMatrix),
  armWidthGenerator: new MatrixDrivenArmWidthGenerator(armWidthMatrix),
};

const enumerable: metaNodeTemplateT = {
  armGenerator: new MatrixDrivenArmGenerator(enumerableArmPatternMatrix),
  armWidthGenerator: new MatrixDrivenArmWidthGenerator(armWidthMatrix),
};

export const templateDictionary: typeDependentBroadOnlyDictionaryT<metaNodeTemplateT> = {
  [NodeBroadTypeEnum.Dead]: dead,
  [NodeBroadTypeEnum.Single]: single,
  [NodeBroadTypeEnum.Iterable]: iterable,
  [NodeBroadTypeEnum.Enumerable]: enumerable,
};