import { StrictUnicodeLine } from '../text/strictUnicode';
import { MetaNodeI, LineDependentArmPatternI, LineDependentStyledArmsI, styledArmT, armT } from './types';
import { AtomicTextContainer, FlatNonatomicTextContainer } from '../text/textContainer';
import { Renderer } from '../text/renderer/abstract/renderer';
import { PlainRenderer } from '../text/renderer/implementation';
import { EOL } from 'os';
import { LineDependentStyledArms, easyCreateChildDependentArmPattern } from './arm';
import { easyCreateNode } from './node';



function renderMetaNodeRecursive(node: MetaNodeI, parentLineDependentSyledArms: LineDependentStyledArmsI, maxWidth: number, armWidth: number, firstLinePadding: number, renderer: Renderer): void {
  const hasChildren = (node.children.length > 0);
  const wrappedLeaf = node.leaf.wrap(maxWidth, firstLinePadding).wrapped;
  const leafFlatLines = wrappedLeaf.splitToFlatLines();

  // iterating through leaf lines
  leafFlatLines.forEach((leafFlatLine, leafFlatLineId) => {
    let parentStyledArms: styledArmT[];
    let arm: armT;
    const isFirstLineOfLeaf = leafFlatLineId === 0;
    const isLastLineOfLeaf = leafFlatLineId === leafFlatLines.length - 1;
    const leafArmWidth = (hasChildren) ? 3 : 3;
    if (isFirstLineOfLeaf) {
      arm = node.pattern.leaf.firstLine.generateArm(leafArmWidth);
      parentStyledArms = parentLineDependentSyledArms.firstLine;
    } else if (isLastLineOfLeaf) {
      if (hasChildren) {
        arm = node.pattern.leaf.otherLine.generateArm(leafArmWidth);
        parentStyledArms = parentLineDependentSyledArms.otherLine;
      } else {
        arm = node.pattern.leaf.lastLine.generateArm(leafArmWidth);
        parentStyledArms = parentLineDependentSyledArms.lastLine;
      }
    } else {
      arm = node.pattern.leaf.otherLine.generateArm(leafArmWidth);
      parentStyledArms = parentLineDependentSyledArms.otherLine;
    }
    const styledArm = new AtomicTextContainer(arm); // TODO: style here
    const atomicsToRender = parentStyledArms.concat(styledArm, leafFlatLine.children);
    const flatLineToRender = new FlatNonatomicTextContainer<StrictUnicodeLine>(atomicsToRender);
    const rendered = renderer.renderFlatLine(flatLineToRender);
    console.log(rendered);
  });
  // iterating through children
  node.children.forEach((childNode, childNodeId)=>{
    let childLineDependentArmPattern: LineDependentArmPatternI;
    let lineDependentStyledArms: LineDependentStyledArmsI;
    const isFirstChild = childNodeId === 0;
    const isLastChild = childNodeId === node.children.length - 1;
    if (isLastChild) {
      childLineDependentArmPattern = node.pattern.lastChild;
      lineDependentStyledArms = new LineDependentStyledArms(
        parentLineDependentSyledArms.otherLine,
        parentLineDependentSyledArms.otherLine,
        parentLineDependentSyledArms.lastLine
      );
    } else if (isFirstChild) {
      childLineDependentArmPattern = node.pattern.firstChild;
      lineDependentStyledArms = new LineDependentStyledArms(
        parentLineDependentSyledArms.otherLine,
        parentLineDependentSyledArms.otherLine,
        parentLineDependentSyledArms.otherLine
      );
    } else {
      childLineDependentArmPattern = node.pattern.otherChild;
      lineDependentStyledArms = new LineDependentStyledArms(
        parentLineDependentSyledArms.otherLine,
        parentLineDependentSyledArms.otherLine,
        parentLineDependentSyledArms.otherLine
      );
    }

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
function genWidth(): number {
  return Math.floor(Math.random() * 10) + 2;
}
const testMetaNodeA = easyCreateNode('alla long story about: evwkfsdf vfodpskj eevcsg dfsv evwkfsdf vfodpskj eevcsg dfsv', pattern, genWidth());
testMetaNodeA.children.push(easyCreateNode('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', pattern, genWidth()));
testMetaNodeA.children.push(easyCreateNode(`ally dot ${EOL} d ddf sdfg sd g`, pattern, genWidth()));
testMetaNodeA.children.push(easyCreateNode('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', pattern, genWidth()));
testMetaNodeA.children.push(easyCreateNode('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', pattern, genWidth()));
testMetaNodeA.children.push(easyCreateNode(`ally dot ${EOL} d ddf sdfg sd g`, pattern, genWidth()));
testMetaNodeA.children.push(easyCreateNode('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', pattern, genWidth()));

const testMetaNodeB = easyCreateNode('bella', pattern, genWidth());
testMetaNodeB.children.push(easyCreateNode('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', pattern, genWidth()));
testMetaNodeB.children.push(easyCreateNode(`ally dot ${EOL} d ddf sdfg sd g`, pattern, genWidth()));
testMetaNodeB.children.push(easyCreateNode('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', pattern, genWidth()));
testMetaNodeB.children.push(easyCreateNode('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', pattern, genWidth()));
testMetaNodeB.children.push(easyCreateNode(`ally dot ${EOL} d ddf sdfg sd g`, pattern, genWidth()));
testMetaNodeB.children.push(easyCreateNode('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', pattern, genWidth()));

const testMetaNodeC = easyCreateNode('chika', pattern, genWidth());
testMetaNodeC.children.push(easyCreateNode('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', pattern, genWidth()));
testMetaNodeC.children.push(easyCreateNode(`ally dot ${EOL} d ddf sdfg sd g`, pattern, genWidth()));
testMetaNodeC.children.push(easyCreateNode('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', pattern, genWidth()));
testMetaNodeC.children.push(easyCreateNode('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', pattern, genWidth()));
testMetaNodeC.children.push(easyCreateNode(`ally dot ${EOL} d ddf sdfg sd g`, pattern, genWidth()));
testMetaNodeC.children.push(easyCreateNode('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', pattern, genWidth()));

testMetaNodeA.children.push(testMetaNodeC);

const testMetaTree = easyCreateNode('alabama story goes here: er fopgp oidpsfgoisdf gfgsd qwecsddf fmkg-olvlkmk dgrg', pattern, genWidth());
testMetaTree.children.push(testMetaNodeA);
testMetaTree.children.push(testMetaNodeB);
const renderer = new PlainRenderer();
const emptyLineDependentArms = new LineDependentStyledArms([],[],[]);
renderMetaNodeRecursive(testMetaTree, emptyLineDependentArms, 40, 8, 0, renderer);
console.log('--- fin ---');