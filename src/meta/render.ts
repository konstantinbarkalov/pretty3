import { EOL } from 'os';
import { MetaNodeI } from './types/node';
import { LineDependentStyledArmsI, StyledArmT } from './types/deprecated';
import { Renderer } from '../text/renderer/abstract/renderer';
import { ArmT } from './types/arm';
import { AtomicTextContainer, FlatNonatomicTextContainer } from '../text/textContainer';
import { StrictUnicodeLine } from '../text/strictUnicode';
import { LineDependentArmPatternI } from './types/pattern';
import { LineDependentStyledArms } from './arm';
import { easyCreateChildDependentArmPattern } from './pattern';
import { PatternDrivenArmGenerator } from './patternDrivenArmGenerator';
import { easyCreateNode } from './node';
import { PlainRenderer } from '../text/renderer/implementation';
import { generateFnParametersT } from './types/armGenerator';



function renderMetaNodeRecursive(node: MetaNodeI, parentLineDependentSyledArms: LineDependentStyledArmsI, maxWidth: number, armWidth: number, firstLinePadding: number, renderer: Renderer): void {
  const hasChildren = (node.children.length > 0);
  const wrappedLeaf = node.leaf.wrap(maxWidth, firstLinePadding).wrapped;
  const leafFlatLines = wrappedLeaf.splitToFlatLines();

  // iterating through leaf lines
  leafFlatLines.forEach((leafFlatLine, leafFlatLineId) => {
    let parentStyledArms: StyledArmT[];
    const isFirstLineOfLeaf = leafFlatLineId === 0;
    const isLastLineOfLeaf = leafFlatLineId === leafFlatLines.length - 1;
    if (isFirstLineOfLeaf) {
      parentStyledArms = parentLineDependentSyledArms.firstLine;
    } else if (isLastLineOfLeaf) {
      if (hasChildren) {
        parentStyledArms = parentLineDependentSyledArms.otherLine;
      } else {
        parentStyledArms = parentLineDependentSyledArms.lastLine;
      }
    } else {
      parentStyledArms = parentLineDependentSyledArms.otherLine;
    }
    const generateArmParameters: generateFnParametersT = {
      node,
      childId: null,
      childrenCount: node.children.length,
      lineId: leafFlatLineId,
      linesCount: leafFlatLines.length,
    };
    const arm = node.armGenerator.generateArm(generateArmParameters);
    const styledArm = new AtomicTextContainer(arm); // TODO: style here
    const atomicsToRender = parentStyledArms.concat(styledArm, leafFlatLine.children);
    const flatLineToRender = new FlatNonatomicTextContainer<StrictUnicodeLine>(atomicsToRender);
    const rendered = renderer.renderFlatLine(flatLineToRender);
    console.log(rendered);
  });
  // iterating through children
  node.children.forEach((childNode, childNodeId)=>{
    let lineDependentStyledArms: LineDependentStyledArmsI;
    const isFirstChild = childNodeId === 0;
    const isLastChild = childNodeId === node.children.length - 1;
    if (isLastChild) {
      lineDependentStyledArms = new LineDependentStyledArms(
        parentLineDependentSyledArms.otherLine,
        parentLineDependentSyledArms.otherLine,
        parentLineDependentSyledArms.lastLine
      );
    } else if (isFirstChild) {
      lineDependentStyledArms = new LineDependentStyledArms(
        parentLineDependentSyledArms.otherLine,
        parentLineDependentSyledArms.otherLine,
        parentLineDependentSyledArms.otherLine
      );
    } else {
      lineDependentStyledArms = new LineDependentStyledArms(
        parentLineDependentSyledArms.otherLine,
        parentLineDependentSyledArms.otherLine,
        parentLineDependentSyledArms.otherLine
      );
    }

    const generateArmParameters: generateFnParametersT = {
      node,
      childId: childNodeId,
      childrenCount: node.children.length,
      lineId: leafFlatLineId,
      linesCount: leafFlatLines.length,
    };

    const arm = node.armGenerator.generateArm(generateArmParameters);

    const lineDependentArm = childLineDependentArmPattern.generateLineDependentArm(childNode.armWidth);
    const lineDependentStyledArm = {
      first: new AtomicTextContainer(lineDependentArm.firstLine), // TODO: style here
      other: new AtomicTextContainer(lineDependentArm.otherLine), // TODO: style here
      last: new AtomicTextContainer(lineDependentArm.lastLine), // TODO: style here
    };
    lineDependentStyledArms.firstLine = lineDependentStyledArms.firstLine.concat(lineDependentStyledArm.first);
    lineDependentStyledArms.otherLine = lineDependentStyledArms.otherLine.concat(lineDependentStyledArm.other);
    lineDependentStyledArms.lastLine = lineDependentStyledArms.lastLine.concat(lineDependentStyledArm.last);

    renderMetaNodeRecursive(childNode, lineDependentStyledArms, maxWidth, armWidth, firstLinePadding, renderer);
  });
}
// const pattern = easyCreateChildDependentArmPattern({
//   otherChildFirstLine:   '├─╸',
//   spacer: '│  ',
//   lastChildFirstLine:    '└─╸',
// });
const pattern = easyCreateChildDependentArmPattern([
  '┬─>', '│  ', '│  ',
  '├──', '│  ', '│  ',
  '├──', '│  ', '│  ',
  '└──', '   ', '   ',
]);
const generator = new PatternDrivenArmGenerator(pattern);
function genWidth(): number {
  return Math.floor(Math.random() * 10) + 2;
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
const emptyLineDependentArms = new LineDependentStyledArms([],[],[]);
renderMetaNodeRecursive(testMetaTree, emptyLineDependentArms, 40, 8, 0, renderer);
console.log('--- fin ---');