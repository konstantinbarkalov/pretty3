import { EOL } from 'os';
import { MetaNodeI } from './types/node';
import { Renderer } from '../text/renderer/abstract/renderer';
import { generateFnParametersT } from './types/armGenerator';
import { FlatNonatomicTextContainer } from '../text/textContainer';
import { StrictUnicodeLine } from '../text/strictUnicode';
import { easyCreateNode } from './node';
import { PlainRenderer } from '../text/renderer/implementation';
import { ArmGeneratorChain, ArmGeneratorChainElement } from './ArmGeneratorChainElement';
import { ChildDependentPlainArmLinePattern, ChildDependentArmPattern } from './pattern';
import { Style } from '../text/style';
import { PatternDrivenArmGenerator } from './patternDrivenArmGenerator';




function renderMetaNodeRecursive(node: MetaNodeI, parentChain: ArmGeneratorChain, maxWidth: number, armWidth: number, firstLinePadding: number, renderer: Renderer): void {
  const hasChildren = (node.children.length > 0);
  const wrappedLeaf = node.leaf.wrap(maxWidth, firstLinePadding).wrapped;
  const leafFlatLines = wrappedLeaf.splitToFlatLines();

  const chain = new ArmGeneratorChain(parentChain.elements.slice());

  const generateArmParameters: generateFnParametersT = {
    node,
    childId: null,
    lineId: 0,
    isLastLine: false,
  };
  const chainElement = new ArmGeneratorChainElement(
    node.armGenerator,
    generateArmParameters
  );
  chain.elements.push(chainElement);

  // iterating through leaf lines
  leafFlatLines.forEach((leafFlatLine, leafFlatLineId) => {
    const isLastLineOfLeaf = leafFlatLineId === leafFlatLines.length - 1;

    chain.elements.forEach((element) => {
      const isLastChildInChain = element.parameters.childId === element.parameters.node.children.length - 1;
      element.parameters.isLastLine = isLastChildInChain && !hasChildren && isLastLineOfLeaf;
      element.parameters.lineId++;
    });


    generateArmParameters.lineId = leafFlatLineId;
    generateArmParameters.isLastLine = isLastLineOfLeaf && !hasChildren;

    const armChain = chain.generateArmChain();
    const atomicsToRender = armChain.concat(leafFlatLine.children);
    const flatLineToRender = new FlatNonatomicTextContainer<StrictUnicodeLine>(atomicsToRender);
    const rendered = renderer.renderFlatLine(flatLineToRender);
    console.log(rendered);
  });
  // iterating through children
  node.children.forEach((childNode, childNodeId)=>{
    chain.elements[chain.elements.length - 1].parameters.childId = childNodeId;
    renderMetaNodeRecursive(childNode, chain, maxWidth, armWidth, firstLinePadding, renderer);
  });
}
// const pattern = easyCreateChildDependentPlainArmLinePattern({
//   otherChildFirstLine:   '├─╸',
//   spacer: '│  ',
//   lastChildFirstLine:    '└─╸',
// });
const plainPattern = ChildDependentPlainArmLinePattern.fromMatrix([
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
const testMetaNodeA = easyCreateNode('alla long story about: evwkfsdf vfodpskj eevcsg dfsv evwkfsdf vfodpskj eevcsg dfsv', generator, genWidth());
testMetaNodeA.children.push(easyCreateNode('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', generator, genWidth()));
testMetaNodeA.children.push(easyCreateNode(`ally dot ${EOL} d ddf sdfg sd g`, generator, genWidth()));
testMetaNodeA.children.push(easyCreateNode('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', generator, genWidth()));
testMetaNodeA.children.push(easyCreateNode('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', generator, genWidth()));
testMetaNodeA.children.push(easyCreateNode(`ally dot ${EOL} d ddf sdfg sd g`, generator, genWidth()));
testMetaNodeA.children.push(easyCreateNode('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', generator, genWidth()));

const testMetaNodeB = easyCreateNode('bella', generator, genWidth());
testMetaNodeB.children.push(easyCreateNode('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', generator, genWidth()));
testMetaNodeB.children.push(easyCreateNode(`ally dot ${EOL} d ddf sdfg sd g`, generator, genWidth()));
testMetaNodeB.children.push(easyCreateNode('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', generator, genWidth()));
testMetaNodeB.children.push(easyCreateNode('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', generator, genWidth()));
testMetaNodeB.children.push(easyCreateNode(`ally dot ${EOL} d ddf sdfg sd g`, generator, genWidth()));
testMetaNodeB.children.push(easyCreateNode('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', generator, genWidth()));

const testMetaNodeC = easyCreateNode('chika', generator, genWidth());
testMetaNodeC.children.push(easyCreateNode('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', generator, genWidth()));
testMetaNodeC.children.push(easyCreateNode(`ally dot ${EOL} d ddf sdfg sd g`, generator, genWidth()));
testMetaNodeC.children.push(easyCreateNode('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', generator, genWidth()));
testMetaNodeC.children.push(easyCreateNode('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', generator, genWidth()));
testMetaNodeC.children.push(easyCreateNode(`ally dot ${EOL} d ddf sdfg sd g`, generator, genWidth()));
testMetaNodeC.children.push(easyCreateNode('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', generator, genWidth()));

testMetaNodeA.children.push(testMetaNodeC);

const testMetaTree = easyCreateNode('alabama story goes here: er fopgp oidpsfgoisdf gfgsd qwecsddf fmkg-olvlkmk dgrg', generator, genWidth());
testMetaTree.children.push(testMetaNodeA);
testMetaTree.children.push(testMetaNodeB);
const renderer = new PlainRenderer();
const emptyChain = new ArmGeneratorChain([]);
renderMetaNodeRecursive(testMetaTree, emptyChain, 40, 8, 0, renderer);
console.log('--- fin ---');