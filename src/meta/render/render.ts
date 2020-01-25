import { EOL } from 'os';
import { MetaNodeI } from '../types/node';
import { Renderer } from '../../text/renderer/abstract/renderer';
import { generateFnParametersT } from '../types/arm/armGenerator';
import { FlatNonatomicTextContainer } from '../../text/textContainer';
import { StrictUnicodeLine } from '../../text/strictUnicode';
import { PlainRenderer } from '../../text/renderer/implementation';
import { ArmGeneratorChain, ArmGeneratorChainElement } from './armGeneratorChain';
import { ArmPatternMatrix } from '../matrix/armPatternMatrix';
import { Style } from '../../text/style';
import { MatrixDrivenArmGenerator, MatrixDrivenArmWidthGenerator } from '../matrix/matrixDrivenArmGenerator';
import { MetaNode } from '../node';
import { ArmWidthMatrix } from '../matrix/armWidthMatrix';
import { spacedArmWidthT } from '../types/arm/armWidth';




function renderMetaNodeRecursive(node: MetaNodeI, parentChain: ArmGeneratorChain, maxWidth: number, armWidth: number, firstLinePadding: number, renderer: Renderer): void {
  const parentArmChain = parentChain.generateArmChain();
  const parentArmChainWidth = new FlatNonatomicTextContainer(parentArmChain).calcSize().width.first;
  const hasChildren = (node.children.length > 0);
  const wrappedLeaf = node.leaf.wrap(maxWidth - parentArmChainWidth, firstLinePadding).wrapped;
  // TODO: wrap, with respect of whole armChainWidth not only parentArmChainWidth
  const leafFlatLines = wrappedLeaf.splitToFlatLines();

  const generateArmParameters: generateFnParametersT = {
    node,
    childNum: null,
    lineNum: 0,
    isLastLine: false,
    lineOfKnotNum: 0,
    isLastLineOfKnot: false,
  };
  const currentChainElement = new ArmGeneratorChainElement(
    node.armGenerator,
    node.armWidthGenerator,
    generateArmParameters,
  );
  //chain.elements.push(currentChainElement);

  // iterating through leaf lines
  leafFlatLines.forEach((leafFlatLine, leafFlatLineId) => {
    const isLastLineOfLeaf = leafFlatLineId === leafFlatLines.length - 1;
    //const isFirstLineOfLeaf = leafFlatLineId === 0;

    parentChain.elements.forEach((parentElement) => {
      const isLastChildOfParent = parentElement.parameters.childNum === parentElement.parameters.node.children.length - 1;
      if (isLastChildOfParent && isLastLineOfLeaf) {
        parentElement.parameters.isLastLine = true;
        parentElement.parameters.isLastLineOfKnot = true;
      }
    });
    if (!hasChildren && isLastLineOfLeaf) {
      currentChainElement.parameters.isLastLine = true;
      currentChainElement.parameters.isLastLineOfKnot = true;
    }
    const currentArm = currentChainElement.generateArm();
    const parentArmChain = parentChain.generateArmChain();
    const atomicsToRender = parentArmChain.concat(currentArm, leafFlatLine.children);
    const flatLineToRender = new FlatNonatomicTextContainer<StrictUnicodeLine>(atomicsToRender);
    const rendered = renderer.renderFlatLine(flatLineToRender);
    console.log(rendered);

    parentChain.elements.forEach((parentElement) => {
      parentElement.parameters.lineNum++;
      parentElement.parameters.lineOfKnotNum++;
    });
    currentChainElement.parameters.lineNum++;
    currentChainElement.parameters.lineOfKnotNum++;
  });
  const chain = new ArmGeneratorChain(parentChain.elements.concat(currentChainElement));

  // iterating through children
  node.children.forEach((childNode, childNodeId) => {
    currentChainElement.parameters.childNum = childNodeId;
    currentChainElement.parameters.lineOfKnotNum = 0;
    currentChainElement.parameters.isLastLineOfKnot = false;
    renderMetaNodeRecursive(childNode, chain, maxWidth, armWidth, firstLinePadding, renderer);
  });
}
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

const renderer = new PlainRenderer();
const emptyChain = new ArmGeneratorChain([]);
renderMetaNodeRecursive(testMetaTree, emptyChain, 40, 8, 0, renderer);
console.log('--- fin ---');