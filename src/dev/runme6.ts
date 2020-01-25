import { ArmPatternMatrix } from '../meta/matrix/armPatternMatrix';
import { Style } from '../text/style';
import { spacedArmWidthT } from '../meta/types/arm/armWidth';
import { ArmWidthMatrix } from '../meta/matrix/armWidthMatrix';
import { MatrixDrivenArmGenerator, MatrixDrivenArmWidthGenerator } from '../meta/matrix/matrixDrivenArmGenerator';
import { MetaNode } from '../meta/node';
import { EOL } from 'os';
import { PlainRenderer } from '../text/renderer/implementation';
import { ArmGeneratorChain } from '../meta/render/armGeneratorChain';
import { renderMetaNodeRecursive } from '../meta/render/render';

// const pattern = KnotDependentArmPlainLinePattern.fromString({
//   otherChildFirstLine:   '├─╸',
//   spacer: '│  ',
//   lastChildFirstLine:    '└─╸',
// });
const armPatternMatrix = ArmPatternMatrix.fromArray([
  '┬─)', '│  ', '│  ',
  '┬─>', '│  ', '│  ',
  '├──', '│  ', '│  ',
  '├──', '│  ', '│  ',
  '└──', '   ', '   ',
], new Style());

const armWidth: spacedArmWidthT = {preSpace: 1, postSpace: 1, arm: 4};
const smallArmWidth: spacedArmWidthT = {preSpace: 1, postSpace: 1, arm: 1};
const armWidthMatrix = ArmWidthMatrix.fromArray([
  0,        0,        0,
  0,        smallArmWidth, smallArmWidth,
  armWidth, armWidth, armWidth,
  armWidth, armWidth, armWidth,
  armWidth, armWidth, armWidth,
]);

const armGenerator = new MatrixDrivenArmGenerator(armPatternMatrix);
const armWidthGenerator = new MatrixDrivenArmWidthGenerator(armWidthMatrix);


const testMetaTree = MetaNode.fromString(`here will be some long text to be wrapped and only then: ${EOL} brake! ${EOL} shake!`, armGenerator, armWidthGenerator);

// const testMetaTree = MetaNode.fromString('root node with text, that is more then one line, when wrapped', generator, 4);
testMetaTree.children.push(MetaNode.fromString('endpoint child 1', armGenerator, armWidthGenerator));
testMetaTree.children.push(MetaNode.fromString('endpoint child 2 that is multiline too because long text will be wrapped', armGenerator, armWidthGenerator));
// testMetaTree.children.push(MetaNode.fromString('endpoint child 3 is another long-talking azaza', generator, 4));

const renderer = new PlainRenderer();
const emptyChain = new ArmGeneratorChain([]);
renderMetaNodeRecursive(testMetaTree, emptyChain, 40, 8, 0, renderer);
console.log('--- fin ---');