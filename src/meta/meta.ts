import { StrictUnicodeLine, StrictUnicodeChar } from '../text/strictUnicode';
import { MetaNodeI, LineDependedArmPatternI, LineDependedStyledArmsI, ArmPatternI, styledArmT, LineDependedArmI, armT, ChildDependedArmPatternI, ChildDependedArmI } from './metaTypes';
import { AnyTextContainer, AtomicTextContainer, FlatNonatomicTextContainer } from '../text/textContainer';
import { Renderer } from '../text/renderer/abstract/renderer';
import { PlainRenderer } from '../text/renderer/implementation';
import { EOL } from 'os';


export class MetaNode implements MetaNodeI {

  public children: MetaNodeI[] = [];
  constructor(public leaf: AnyTextContainer, public nodePattern: ChildDependedArmPatternI, public armWidth: number) { }
}

export class LineDependedArms implements LineDependedStyledArmsI {
  constructor(public firstLine: styledArmT[], public otherLine: styledArmT[], public lastLine: styledArmT[]) { }
}
export class LineDependedUnstyledArm implements LineDependedArmI {
  constructor(public firstLine: armT, public otherLine: armT, public lastLine: armT) { }
}
export class ChildDependedUnstyledArm implements ChildDependedArmI {
  constructor(public firstChild: LineDependedArmI, public otherChild: LineDependedArmI, public lastChild: LineDependedArmI) { }
}

export class ArmPattern implements ArmPatternI {

  constructor(public firstChar: StrictUnicodeChar, public otherChar: StrictUnicodeChar, public lastChar: StrictUnicodeChar) { }
  /**
   * Generates line with drawn arm like: `╰───╸`
   * with repeating `this.other` character to fit `this.armWidth`
   *
   * @remarks
   *
   * During generation `last` have higher priority then `first`.
   * So `last` will be the only generated character if `this.armWidth = 1`.
   * Same way `other` have lowest priority. And appars only if `this.armWidth > 2`
   *
   * @param {number} armWidth
   * Width of generated arm. Measured in monospaced-character positions.
   * @returns {StrictUnicodeLine}
   * Drawn arm, wrapped in StrictUnicodeLine.
   *
   * @remarks
   *
   * Returning StrictUnicodeLine instead of raw string is to skip
   * safaty-checks in tree generator/renderer.
   *
   * @memberof BasicPattern
   */
  generateUnstyledArm(armWidth: number): StrictUnicodeLine {
    let generated = '';
    if (armWidth > 1) {
      generated += this.firstChar.toString();
    }
    if (armWidth > 2) {
      generated += this.otherChar.toString().repeat(armWidth - 2);
    }
    if (armWidth > 0) {
      generated += this.lastChar.toString();
    }
    return new StrictUnicodeLine(generated, true);
  }
}

export class LineDependedArmPattern implements LineDependedArmPatternI {
  constructor(public firstLine: ArmPatternI, public otherLine: ArmPatternI, public lastLine: ArmPatternI) { }
  generateLineDependedUnstyledArm(armWidth: number): LineDependedArmI {
    const lineDependedUnstyledArm: LineDependedUnstyledArm = new LineDependedUnstyledArm (
      this.firstLine.generateUnstyledArm(armWidth),
      this.otherLine.generateUnstyledArm(armWidth),
      this.lastLine.generateUnstyledArm(armWidth),
    );
    return lineDependedUnstyledArm;
  }
}

export class ChildDependedArmPattern implements ChildDependedArmPatternI {
  constructor(public firstChild: LineDependedArmPatternI, public otherChild: LineDependedArmPatternI, public lastChild: LineDependedArmPatternI) { }
  generateChildDependedUnstyledArm(armWidth: number): ChildDependedArmI {
    const childDependedUnstyledArm: ChildDependedUnstyledArm = new ChildDependedUnstyledArm (
      this.firstChild.generateLineDependedUnstyledArm(armWidth),
      this.otherChild.generateLineDependedUnstyledArm(armWidth),
      this.lastChild.generateLineDependedUnstyledArm(armWidth),
    );
    return childDependedUnstyledArm;
  }
}

function renderMetaNodeRecursive(node: MetaNodeI, parentLineDependedArms: LineDependedStyledArmsI, maxWidth: number, armWidth: number, firstLinePadding: number, renderer: Renderer): void {
  const hasChildren = (node.children.length > 0);
  const wrappedLeaf = node.leaf.wrap(maxWidth, firstLinePadding).wrapped;
  const leafFlatLines = wrappedLeaf.splitToFlatLines();
  leafFlatLines.forEach((leafFlatLine, leafFlatLineId) => {
    let parentArms: styledArmT[];
    const isFirstLineOfLeaf = leafFlatLineId === 0;
    const isLastLineOfLeaf = leafFlatLineId === leafFlatLines.length - 1;

    if (isFirstLineOfLeaf) {
      parentArms = parentLineDependedArms.firstLine;
    } else if (isLastLineOfLeaf) {
      if (hasChildren) {
        parentArms = parentLineDependedArms.otherLine;
      } else {
        parentArms = parentLineDependedArms.lastLine;
      }
    } else {
      parentArms = parentLineDependedArms.otherLine;
    }

    const atomicsToRender = parentArms.concat(leafFlatLine.children);
    const flatLineToRender = new FlatNonatomicTextContainer<StrictUnicodeLine>(atomicsToRender);
    const rendered = renderer.renderFlatLine(flatLineToRender);
    console.log(rendered);
  });
  node.children.forEach((childNode, childNodeId)=>{
    let сonditionalArmPattern: LineDependedArmPatternI;
    let lineDependedArms: LineDependedStyledArmsI;
    const isFirstChild = childNodeId === 0;
    const isLastChild = childNodeId === node.children.length - 1;
    if (isLastChild) {
      сonditionalArmPattern = node.nodePattern.lastChild;
      lineDependedArms = new LineDependedArms(
        parentLineDependedArms.otherLine,
        parentLineDependedArms.otherLine,
        parentLineDependedArms.lastLine
      );
    } else if (isFirstChild) {
      сonditionalArmPattern = node.nodePattern.firstChild;
      lineDependedArms = new LineDependedArms(
        parentLineDependedArms.otherLine,
        parentLineDependedArms.otherLine,
        parentLineDependedArms.otherLine
      );
    } else {
      сonditionalArmPattern = node.nodePattern.otherChild;
      lineDependedArms = new LineDependedArms(
        parentLineDependedArms.otherLine,
        parentLineDependedArms.otherLine,
        parentLineDependedArms.otherLine
      );
    }

    const lineDependedUnstyledArm = сonditionalArmPattern.generateLineDependedUnstyledArm(armWidth);
    const lineDependedArm = {
      first: new AtomicTextContainer(lineDependedUnstyledArm.firstLine), // TODO: style here
      other: new AtomicTextContainer(lineDependedUnstyledArm.otherLine), // TODO: style here
      last: new AtomicTextContainer(lineDependedUnstyledArm.lastLine), // TODO: style here
    };
    lineDependedArms.firstLine = lineDependedArms.firstLine.concat(lineDependedArm.first);
    lineDependedArms.otherLine = lineDependedArms.otherLine.concat(lineDependedArm.other);
    lineDependedArms.lastLine = lineDependedArms.lastLine.concat(lineDependedArm.last);

    renderMetaNodeRecursive(childNode, lineDependedArms, maxWidth, armWidth, firstLinePadding, renderer);
  });
}
function easyCreateArmPattern(chars: string): ArmPattern {
  const basicСhars: [StrictUnicodeChar, StrictUnicodeChar, StrictUnicodeChar] = [
    new StrictUnicodeChar(chars[0]),
    new StrictUnicodeChar(chars[1]),
    new StrictUnicodeChar(chars[2]),
  ];
  const armPattern = new ArmPattern(...basicСhars);
  return armPattern;
}
function easyCreateLineDependedArmPattern(firstChars: string, otherChars: string, lastChars: string): LineDependedArmPattern {
  const lineDependedArmPattern = new LineDependedArmPattern(
    easyCreateArmPattern(firstChars),
    easyCreateArmPattern(otherChars),
    easyCreateArmPattern(lastChars),
  );
  return lineDependedArmPattern;
}
function easyCreateChildDependedArmPattern(chars: string[]): ChildDependedArmPattern {
  const childDependedArmPattern = new ChildDependedArmPattern(
    easyCreateLineDependedArmPattern(chars[0], chars[1], chars[2]),
    easyCreateLineDependedArmPattern(chars[3], chars[4], chars[5]),
    easyCreateLineDependedArmPattern(chars[6], chars[7], chars[8]),
  );
  return childDependedArmPattern;
}
function easyCreateNode(text: string, nodePattern: ChildDependedArmPattern): MetaNode {
  const leaf = new AtomicTextContainer(new StrictUnicodeLine(text));
  const metaNode = new MetaNode(leaf, nodePattern, 4);
  return metaNode;
}

const testCPattern = easyCreateChildDependedArmPattern([
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
const emptyLineDependedArms = new LineDependedArms([],[],[]);
renderMetaNodeRecursive(testMetaTree, emptyLineDependedArms, 40, 8, 0, renderer);
console.log('--- fin ---');