import { StrictUnicodeLine } from '../text/strictUnicode';
import { MetaNodeI, LineDependentArmPatternI, LineDependentStyledArmsI, styledArmT } from './types';
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
    const atomicsToRender = parentStyledArms.concat(leafFlatLine.children);
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

    const lineDependentArm = childLineDependentArmPattern.generateLineDependentArm(armWidth);
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

const testCPattern = easyCreateChildDependentArmPattern([
  '├─>', '│  ', '│  ',
  '├─╸', '│  ', '│  ',
  '└─<', '   ', '   ']);
const testMetaNodeA = easyCreateNode('alla', testCPattern);
testMetaNodeA.children.push(easyCreateNode('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', testCPattern));
testMetaNodeA.children.push(easyCreateNode(`ally dot ${EOL} d ddf sdfg sd g`, testCPattern));
testMetaNodeA.children.push(easyCreateNode('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', testCPattern));

const testMetaNodeB = easyCreateNode('bella', testCPattern);
testMetaNodeB.children.push(easyCreateNode('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', testCPattern));
testMetaNodeB.children.push(easyCreateNode(`ally dot ${EOL} d ddf sdfg sd g`, testCPattern));
testMetaNodeB.children.push(easyCreateNode('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', testCPattern));

const testMetaTree = easyCreateNode('alabama story goes here: er fopgp oidpsfgoisdf gfgsd qwecsddf fmkg-olvlkmk dgrg', testCPattern);
testMetaTree.children.push(testMetaNodeA);
testMetaTree.children.push(testMetaNodeB);
const renderer = new PlainRenderer();
const emptyLineDependentArms = new LineDependentStyledArms([],[],[]);
renderMetaNodeRecursive(testMetaTree, emptyLineDependentArms, 40, 8, 0, renderer);
console.log('--- fin ---');