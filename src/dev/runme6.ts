import { ArmPatternMatrix } from '../meta/matrix/armPatternMatrix';
import { Style } from '../text/style';
import { spacedArmWidthT } from '../meta/interfaces/arm/armWidth';
import { ArmWidthMatrix } from '../meta/matrix/armWidthMatrix';
import { MatrixDrivenArmGenerator, MatrixDrivenArmWidthGenerator } from '../meta/matrix/matrixDrivenArmGenerator';
import { MetaNode } from '../meta/node';
import { EOL } from 'os';
import { AnsiRenderer } from '../text/renderer/implementation';
import { renderMetaNode } from '../meta/render/render';
import { NonatomicTextContainer, AtomicTextContainer } from '../text/textContainer';
import { StrictUnicodeText } from '../text/strictUnicode';
import * as pretty2 from '../pretty2';

const treeStyleColors = {
  green: {r: 80, g: 160, b: 80},
  darkGreen: {r: 64, g: 128, b: 64},
  blue: {r: 160, g: 160, b: 220},
  darkGray: {r: 64, g: 64, b: 64},
  gray: {r: 128, g: 128, b: 128},
  lightGray: {r: 192, g: 192, b: 192},
  white: {r: 255, g: 255, b: 255},
};
const treeStyle = {
  icon: new Style(treeStyleColors.green),
  dim: new Style(treeStyleColors.darkGray),
  key: new Style(treeStyleColors.green),
  keyDots: new Style(treeStyleColors.darkGreen),
  value: new Style(treeStyleColors.white),
  info: new Style(treeStyleColors.blue),
  branch: new Style(treeStyleColors.darkGray),
};

const armPatternMatrix = ArmPatternMatrix.fromArray([
  '┬─)', '│  ', '│  ',
  '┬─>', '│  ', '│  ',
  '├──', '│  ', '│  ',
  '├──', '│  ', '│  ',
  '└──', '   ', '   ',
], treeStyle.keyDots);

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


const richContainer = new NonatomicTextContainer([
  new NonatomicTextContainer([
    new AtomicTextContainer(new StrictUnicodeText('you dfg dvpel v'), treeStyle.info),
    new AtomicTextContainer(new StrictUnicodeText(' sdf ;lksdf we [ psdok sdp[o wlk sd fkls sdf'), treeStyle.branch),
    new AtomicTextContainer(new StrictUnicodeText('you dfg dvpel v'), treeStyle.key),
  ]),
]);
const testMetaTree = new MetaNode(richContainer, armGenerator, armWidthGenerator);

testMetaTree.children.push(MetaNode.fromString(`here will be some long text to be wrapped and only then: ${EOL} brake! ${EOL} shake!`, armGenerator, armWidthGenerator));
testMetaTree.children.push(MetaNode.fromString('endpoint child 2', armGenerator, armWidthGenerator));
testMetaTree.children.push(MetaNode.fromString('endpoint child 3 that is multiline too because long text will be wrapped', armGenerator, armWidthGenerator));


//const renderer = new PlainRenderer();
const renderer = new AnsiRenderer();
function logLineCallback(line: string): void { console.log(line); }
renderMetaNode(testMetaTree, 40, renderer, logLineCallback);
console.log('--- ');
pretty2.renderTree({a: ['123','777'], b:{q: 'Q'}});
console.log('--- fin ---');