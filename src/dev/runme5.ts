import { ArmPatternMatrix } from '../meta/matrix/armPatternMatrix';
import { Style } from '../text/style';
import { spacedArmWidthT } from '../meta/interfaces/arm/armWidth';
import { ArmWidthMatrix } from '../meta/matrix/armWidthMatrix';
import { MatrixDrivenArmGenerator, MatrixDrivenArmWidthGenerator } from '../meta/matrix/matrixDrivenArmGenerator';
import { MetaNode } from '../meta/node';
import { EOL } from 'os';
import { AnsiRenderer } from '../text/renderer/implementation';
import { renderMetaNode } from '../meta/render/render';

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
], new Style({r:128, g:160, b: 90}));

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

const testMetaNodeA = MetaNode.fromString('alla long story about: evwkfsdf vfodpskj eevcsg dfsv evwkfsdf vfodpskj eevcsg dfsv', armGenerator, armWidthGenerator);
testMetaNodeA.children.push(MetaNode.fromString('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', armGenerator, armWidthGenerator));
testMetaNodeA.children.push(MetaNode.fromString(`ally dot ${EOL} d ddf sdfg sd g`, armGenerator, armWidthGenerator));
testMetaNodeA.children.push(MetaNode.fromString('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', armGenerator, armWidthGenerator));
testMetaNodeA.children.push(MetaNode.fromString('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', armGenerator, armWidthGenerator));
testMetaNodeA.children.push(MetaNode.fromString(`ally dot ${EOL} d ddf sdfg sd g`, armGenerator, armWidthGenerator));
testMetaNodeA.children.push(MetaNode.fromString('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', armGenerator, armWidthGenerator));

const testMetaNodeB = MetaNode.fromString('bella', armGenerator, armWidthGenerator);
testMetaNodeB.children.push(MetaNode.fromString('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', armGenerator, armWidthGenerator));
testMetaNodeB.children.push(MetaNode.fromString(`ally dot ${EOL} d ddf sdfg sd g`, armGenerator, armWidthGenerator));
testMetaNodeB.children.push(MetaNode.fromString('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', armGenerator, armWidthGenerator));
testMetaNodeB.children.push(MetaNode.fromString('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', armGenerator, armWidthGenerator));
testMetaNodeB.children.push(MetaNode.fromString(`ally dot ${EOL} d ddf sdfg sd g`, armGenerator, armWidthGenerator));
testMetaNodeB.children.push(MetaNode.fromString('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', armGenerator, armWidthGenerator));

const testMetaNodeC = MetaNode.fromString('chika', armGenerator, armWidthGenerator);
testMetaNodeC.children.push(MetaNode.fromString('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', armGenerator, armWidthGenerator));
testMetaNodeC.children.push(MetaNode.fromString(`ally dot ${EOL} d ddf sdfg sd g`, armGenerator, armWidthGenerator));
testMetaNodeC.children.push(MetaNode.fromString('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', armGenerator, armWidthGenerator));
testMetaNodeC.children.push(MetaNode.fromString('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', armGenerator, armWidthGenerator));
testMetaNodeC.children.push(MetaNode.fromString(`ally dot ${EOL} d ddf sdfg sd g`, armGenerator, armWidthGenerator));
testMetaNodeC.children.push(MetaNode.fromString('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', armGenerator, armWidthGenerator));

testMetaNodeA.children.push(testMetaNodeC);

const testMetaTree = MetaNode.fromString('alabama story goes here: er fopgp oidpsfgoisdf gfgsd qwecsddf fmkg-olvlkmk dgrg', armGenerator, armWidthGenerator);
testMetaTree.children.push(testMetaNodeA);
testMetaTree.children.push(testMetaNodeB);

// const testMetaTree = MetaNode.fromString('root node with text, that is more then one line, when wrapped', generator, 4);
// testMetaTree.children.push(MetaNode.fromString('endpoint child 1', generator, 4));
// testMetaTree.children.push(MetaNode.fromString('endpoint child 2 that is multiline too because long text will be wrapped', generator, 4));
// testMetaTree.children.push(MetaNode.fromString('endpoint child 3 is another long-talking azaza', generator, 4));

const renderer = new AnsiRenderer();
function logLineCallback(line: string): void { console.log(line); }
renderMetaNode(testMetaTree, 40, renderer, logLineCallback);
console.log('--- fin ---');