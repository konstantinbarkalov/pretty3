import { StrictUnicodeLine, StrictUnicodeChar } from '../text/strictUnicode';
import { MetaNodeI, ConditionalArmPatternI, ConditionalArmsI, ArmPatternI, armT, ConditionalUnstyledArmI, unstyledArmT, UniversalArmPatternI, UniversalUnstyledArmI } from './metaTypes';
import { AnyTextContainer, AtomicTextContainer, FlatNonatomicTextContainer } from '../text/textContainer';
import { Renderer } from '../text/renderer/abstract/renderer';
import { PlainRenderer } from '../text/renderer/implementation';
import { EOL } from 'os';


export class MetaNode implements MetaNodeI {

  public children: MetaNodeI[] = [];
  constructor(public leaf: AnyTextContainer, public nodePattern: UniversalArmPatternI, public armWidth: number) { }
}

export class ConditionalArms implements ConditionalArmsI {
  constructor(public first: armT[], public other: armT[], public last: armT[]) { }
}
export class ConditionalUnstyledArm implements ConditionalUnstyledArmI {
  constructor(public first: unstyledArmT, public other: unstyledArmT, public last: unstyledArmT) { }
}
export class UniversalUnstyledArm implements UniversalUnstyledArmI {
  constructor(public first: ConditionalUnstyledArmI, public other: ConditionalUnstyledArmI, public last: ConditionalUnstyledArmI) { }
}

export class ArmPattern implements ArmPatternI {

  constructor(public first: StrictUnicodeChar, public other: StrictUnicodeChar, public last: StrictUnicodeChar) { }
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
      generated += this.first.toString();
    }
    if (armWidth > 2) {
      generated += this.other.toString().repeat(armWidth - 2);
    }
    if (armWidth > 0) {
      generated += this.last.toString();
    }
    return new StrictUnicodeLine(generated, true);
  }
}

export class ConditionalArmPattern implements ConditionalArmPatternI {
  constructor(public first: ArmPatternI, public other: ArmPatternI, public last: ArmPatternI) { }
  generateConditionalUnstyledArm(armWidth: number): ConditionalUnstyledArmI {
    const conditionalUnstyledArm: ConditionalUnstyledArm = new ConditionalUnstyledArm (
      this.first.generateUnstyledArm(armWidth),
      this.other.generateUnstyledArm(armWidth),
      this.last.generateUnstyledArm(armWidth),
    );
    return conditionalUnstyledArm;
  }
}

export class UniversalArmPattern implements UniversalArmPatternI {
  constructor(public first: ConditionalArmPatternI, public other: ConditionalArmPatternI, public last: ConditionalArmPatternI) { }
  generateUniversalUnstyledArm(armWidth: number): UniversalUnstyledArmI {
    const universalUnstyledArm: UniversalUnstyledArm = new UniversalUnstyledArm (
      this.first.generateConditionalUnstyledArm(armWidth),
      this.other.generateConditionalUnstyledArm(armWidth),
      this.last.generateConditionalUnstyledArm(armWidth),
    );
    return universalUnstyledArm;
  }
}

function renderMetaNodeRecursive(node: MetaNodeI, parentConditionalArms: ConditionalArmsI, maxWidth: number, armWidth: number, firstLinePadding: number, renderer: Renderer): void {
  const hasChildren = (node.children.length > 0);
  const wrappedLeaf = node.leaf.wrap(maxWidth, firstLinePadding).wrapped;
  const leafFlatLines = wrappedLeaf.splitToFlatLines();
  leafFlatLines.forEach((leafFlatLine, leafFlatLineId) => {
    let parentArms: armT[];
    const isFirstLineOfLeaf = leafFlatLineId === 0;
    const isLastLineOfLeaf = leafFlatLineId === leafFlatLines.length - 1;

    if (isFirstLineOfLeaf) {
      parentArms = parentConditionalArms.first;
    } else if (isLastLineOfLeaf) {
      if (hasChildren) {
        parentArms = parentConditionalArms.other;
      } else {
        parentArms = parentConditionalArms.last;
      }
    } else {
      parentArms = parentConditionalArms.other;
    }

    const atomicsToRender = parentArms.concat(leafFlatLine.children);
    const flatLineToRender = new FlatNonatomicTextContainer<StrictUnicodeLine>(atomicsToRender);
    const rendered = renderer.renderFlatLine(flatLineToRender);
    console.log(rendered);
  });
  node.children.forEach((childNode, childNodeId)=>{
    let сonditionalArmPattern: ConditionalArmPatternI;
    let conditionalArms: ConditionalArmsI;
    const isFirstChild = childNodeId === 0;
    const isLastChild = childNodeId === node.children.length - 1;
    if (isLastChild) {
      сonditionalArmPattern = new ConditionalArmPattern(
        node.nodePattern.last.first,
        node.nodePattern.last.other,
        node.nodePattern.last.last,
      );
      conditionalArms = new ConditionalArms(
        parentConditionalArms.other,
        parentConditionalArms.other,
        parentConditionalArms.last
      );
    } else if (isFirstChild) {
      сonditionalArmPattern = new ConditionalArmPattern(
        node.nodePattern.first.first,
        node.nodePattern.first.other,
        node.nodePattern.first.other,
      );
      conditionalArms = new ConditionalArms(
        parentConditionalArms.other,
        parentConditionalArms.other,
        parentConditionalArms.other
      );
    } else {
      сonditionalArmPattern = new ConditionalArmPattern(
        node.nodePattern.other.first,
        node.nodePattern.other.other,
        node.nodePattern.other.other,
      );
      conditionalArms = new ConditionalArms(
        parentConditionalArms.other,
        parentConditionalArms.other,
        parentConditionalArms.other
      );
    }

    const conditionalUnstyledArm = сonditionalArmPattern.generateConditionalUnstyledArm(armWidth);
    const conditionalArm = {
      first: new AtomicTextContainer(conditionalUnstyledArm.first), // TODO: style here
      other: new AtomicTextContainer(conditionalUnstyledArm.other), // TODO: style here
      last: new AtomicTextContainer(conditionalUnstyledArm.last), // TODO: style here
    };
    conditionalArms.first = conditionalArms.first.concat(conditionalArm.first);
    conditionalArms.other = conditionalArms.other.concat(conditionalArm.other);
    conditionalArms.last = conditionalArms.last.concat(conditionalArm.last);

    renderMetaNodeRecursive(childNode, conditionalArms, maxWidth, armWidth, firstLinePadding, renderer);
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
function easyCreateConditionalArmPattern(firstChars: string, otherChars: string, lastChars: string): ConditionalArmPattern {
  const conditionalArmPattern = new ConditionalArmPattern(
    easyCreateArmPattern(firstChars),
    easyCreateArmPattern(otherChars),
    easyCreateArmPattern(lastChars),
  );
  return conditionalArmPattern;
}
function easyCreateUniversalArmPattern(chars: string[]): UniversalArmPattern {
  const universalArmPattern = new UniversalArmPattern(
    easyCreateConditionalArmPattern(chars[0], chars[1], chars[2]),
    easyCreateConditionalArmPattern(chars[3], chars[4], chars[5]),
    easyCreateConditionalArmPattern(chars[6], chars[7], chars[8]),
  );
  return universalArmPattern;
}
function easyCreateNode(text: string, nodePattern: UniversalArmPattern): MetaNode {
  const leaf = new AtomicTextContainer(new StrictUnicodeLine(text));
  const metaNode = new MetaNode(leaf, nodePattern, 4);
  return metaNode;
}
//const testCPatternA = easyCreateConditionalArmPattern('├─>', '├─╸', '└─╸');
//const testCPatternB = easyCreateConditionalArmPattern('├─╴', '├─╴', '╰─╴');
//const testCPatternC = easyCreateConditionalArmPattern('╔═F', '╠═O', '╚═L');

const testCPatternA = easyCreateUniversalArmPattern([
  '├─>', '│  ', '│  ',
  '├─╸', '│  ', '│  ',
  '└─<', '   ', '   ']);
const testCPatternB = testCPatternA;
const testCPatternC = testCPatternA;
const testMetaNodeA = easyCreateNode('alla', testCPatternA);
testMetaNodeA.children.push(easyCreateNode('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', testCPatternB));
testMetaNodeA.children.push(easyCreateNode(`ally dot ${EOL} d ddf sdfg sd g`, testCPatternC));
testMetaNodeA.children.push(easyCreateNode('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', testCPatternB));

const testMetaNodeB = easyCreateNode('bella', testCPatternB);
testMetaNodeB.children.push(easyCreateNode('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', testCPatternB));
testMetaNodeB.children.push(easyCreateNode(`ally dot ${EOL} d ddf sdfg sd g`, testCPatternC));
testMetaNodeB.children.push(easyCreateNode('ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ally son sdf sdf s ;dl fasd fasd fkl; aksdf wepo r awr ', testCPatternB));

const testMetaTree = easyCreateNode('alabama story goes here: er fopgp oidpsfgoisdf gfgsd qwecsddf fmkg-olvlkmk dgrg', testCPatternC);
testMetaTree.children.push(testMetaNodeA);
testMetaTree.children.push(testMetaNodeB);
const renderer = new PlainRenderer();
const emptyConditionalArms = new ConditionalArms([],[],[]);
renderMetaNodeRecursive(testMetaTree, emptyConditionalArms, 40, 8, 0, renderer);
console.log('--- fin ---');