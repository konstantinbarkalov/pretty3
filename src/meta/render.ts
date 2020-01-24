import { EOL } from 'os';
import { MetaNodeI } from './types/node';
import { Renderer } from '../text/renderer/abstract/renderer';
import { generateFnParametersT } from './types/armGenerator';
import { FlatNonatomicTextContainer } from '../text/textContainer';
import { StrictUnicodeLine } from '../text/strictUnicode';
import { PlainRenderer } from '../text/renderer/implementation';
import { ArmGeneratorChain, ArmGeneratorChainElement } from './ArmGeneratorChainElement';
import { ChildDependentArmPlainLinePattern, ChildDependentArmPattern } from './pattern';
import { Style } from '../text/style';
import { PatternDrivenArmGenerator } from './patternDrivenArmGenerator';
import { MetaNode } from './node';




function renderMetaNodeRecursive(node: MetaNodeI, parentChain: ArmGeneratorChain, maxWidth: number, armWidth: number, firstLinePadding: number, renderer: Renderer): void {
  const hasChildren = (node.children.length > 0);
  const wrappedLeaf = node.leaf.wrap(maxWidth, firstLinePadding).wrapped;
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

    const parentArmChain = parentChain.generateArmChain();
    const currentArm = currentChainElement.generateArm();
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
// const pattern = ChildDependentArmPlainLinePattern.fromString({
//   otherChildFirstLine:   '├─╸',
//   spacer: '│  ',
//   lastChildFirstLine:    '└─╸',
// });
const plainPattern = ChildDependentArmPlainLinePattern.fromMatrix([
  '┬─>', '│  ', '│  ',
  '├──', '│  ', '│  ',
  '├──', '│  ', '│  ',
  '└──', '   ', '   ',
]);
const pattern = new ChildDependentArmPattern(plainPattern, new Style());
const generator = new PatternDrivenArmGenerator(pattern);
function genWidth(): number {
  return 4; // Math.floor(Math.random() * 10) + 2;
}
const testMetaNodeA = MetaNode.fromString('alla long story about: evwkfsdf vfodpskj eevcsg dfsv evwkfsdf vfodpskj eevcsg dfsv', generator, genWidth());
testMetaNodeA.children.push(MetaNode.fromString('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', generator, genWidth()));
testMetaNodeA.children.push(MetaNode.fromString(`ally dot ${EOL} d ddf sdfg sd g`, generator, genWidth()));
testMetaNodeA.children.push(MetaNode.fromString('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', generator, genWidth()));
testMetaNodeA.children.push(MetaNode.fromString('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', generator, genWidth()));
testMetaNodeA.children.push(MetaNode.fromString(`ally dot ${EOL} d ddf sdfg sd g`, generator, genWidth()));
testMetaNodeA.children.push(MetaNode.fromString('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', generator, genWidth()));

const testMetaNodeB = MetaNode.fromString('bella', generator, genWidth());
testMetaNodeB.children.push(MetaNode.fromString('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', generator, genWidth()));
testMetaNodeB.children.push(MetaNode.fromString(`ally dot ${EOL} d ddf sdfg sd g`, generator, genWidth()));
testMetaNodeB.children.push(MetaNode.fromString('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', generator, genWidth()));
testMetaNodeB.children.push(MetaNode.fromString('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', generator, genWidth()));
testMetaNodeB.children.push(MetaNode.fromString(`ally dot ${EOL} d ddf sdfg sd g`, generator, genWidth()));
testMetaNodeB.children.push(MetaNode.fromString('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', generator, genWidth()));

const testMetaNodeC = MetaNode.fromString('chika', generator, genWidth());
testMetaNodeC.children.push(MetaNode.fromString('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', generator, genWidth()));
testMetaNodeC.children.push(MetaNode.fromString(`ally dot ${EOL} d ddf sdfg sd g`, generator, genWidth()));
testMetaNodeC.children.push(MetaNode.fromString('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', generator, genWidth()));
testMetaNodeC.children.push(MetaNode.fromString('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', generator, genWidth()));
testMetaNodeC.children.push(MetaNode.fromString(`ally dot ${EOL} d ddf sdfg sd g`, generator, genWidth()));
testMetaNodeC.children.push(MetaNode.fromString('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', generator, genWidth()));

testMetaNodeA.children.push(testMetaNodeC);

const testMetaTree = MetaNode.fromString('alabama story goes here: er fopgp oidpsfgoisdf gfgsd qwecsddf fmkg-olvlkmk dgrg', generator, genWidth());
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