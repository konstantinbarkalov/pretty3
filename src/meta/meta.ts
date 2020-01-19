import { StrictUnicodeLine, StrictUnicodeChar } from '../text/strictUnicode';
import { MetaNodeI, LinePatternI, BranchPatternI, BasicPatternI, patternModeKeyT } from './metaTypes';
import { AnyTextContainer, AtomicTextContainer, NonatomicTextContainer } from '../text/textContainer';
import { Renderer } from '../text/renderer/abstract/renderer';


export class MetaNode implements MetaNodeI {

  public children: MetaNodeI[] = [];
  constructor(public leaf: AnyTextContainer, public nodePattern: LinePatternI, public childPattern: BranchPatternI, public armWidth: number) { }
}

export class BranchPattern implements BranchPatternI {
  constructor(public first: LinePatternI, public other: LinePatternI, public last: LinePatternI) { }
}

export class LinePattern implements LinePatternI {
  constructor(public first: BasicPatternI, public other: BasicPatternI, public last: BasicPatternI) { }
}

export class BasicPattern implements BasicPatternI {

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
  generateArm(armWidth: number): StrictUnicodeLine {
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

function renderMetaNodeRecursive(node: MetaNodeI, maxWidth: number, armWidth: number, firstLinePadding:number, renderer: Renderer) {
  const hasChildren = (node.children.length > 0);
  const wrappedLeaf = node.leaf.wrap(maxWidth, firstLinePadding).wrapped;
  const leafFlatLines = wrappedLeaf.splitToFlatLines();
  leafFlatLines.forEach((leafFlatLine, leafFlatLineId) => {
    let pattern: BasicPatternI;
    const isFirstLineOfLeaf = leafFlatLineId === 0;
    const isLastLineOfLeaf = leafFlatLineId === leafFlatLines.length - 1;
    if (isLastLineOfLeaf) {
      if (hasChildren) {
        pattern = node.nodePattern.other;
      } else {
        pattern = node.nodePattern.last;
      }
    } else if (isFirstLineOfLeaf) {
      pattern = node.nodePattern.first;
    } else {
      pattern = node.nodePattern.other;
    }
    const unicodeArm = pattern.generateArm(armWidth);
    const arm = new AtomicTextContainer(unicodeArm); // TODO: style here
    const lineToRender = new NonatomicTextContainer([arm, node.leaf]);
  });
}