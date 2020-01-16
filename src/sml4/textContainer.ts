import { Style } from "./style";
import { StrictUnicodeText, AnyStrictUnicodeT, StrictUnicodeLine } from "./strictUnicode";

export abstract class TextContainer<T extends AnyStrictUnicodeT = AnyStrictUnicodeT> {
  public style?: Style;
  public abstract calcSize():textContainerSizeT;
  public abstract toString():string;
  public abstract wrap(maxWidth:number, firstLinePadding: number): {wrapped: TextContainer<StrictUnicodeText>, lastLinePadding: number };
  public abstract flatten(initialStyle?: Style):FlatNonatomicTextContainer<T>;
}
type textContainerSizeT = {
  width: {
    first: number,
    other: number,
    last: number,
  },
  heigth: number,
}
export class AtomicTextContainer<T extends AnyStrictUnicodeT = AnyStrictUnicodeT> extends TextContainer<T> {
  public readonly size:textContainerSizeT;
  constructor(public readonly text: T, public style?: Style) {
    super();
    this.size = this.precalcSize();
  }
  precalcSize():textContainerSizeT {
    const lines = this.text.splitToLines();
    const firstLine = lines[0];
    const lastLine = lines[lines.length - 1];
    let otherLineMaxWidth: number = 0;
    for (let lineId = 1; lineId < lines.length - 1; lineId++) {
      const otherLine = lines[lineId];
      const otherLineWidth = otherLine.calcWidth();
      otherLineMaxWidth = Math.max(otherLineMaxWidth, otherLineWidth);
    }
    const size:textContainerSizeT = {
      width: {
        first: firstLine.calcWidth(),
        last: lastLine.calcWidth(),
        other: otherLineMaxWidth,
      },
      heigth: lines.length - 1,
    };
    return size;
  }
  calcSize():textContainerSizeT {
    return this.size;
  }
  public toString(): string {
    return this.text.toString();
  }
  public wrap(maxWidth: number, firstLinePadding: number = 0): {wrapped: AtomicTextContainer<StrictUnicodeText>, lastLinePadding: number} {
    const {wrappedText, lastLinePadding} = this.text.wrap(maxWidth, firstLinePadding);
    const wrapped = new AtomicTextContainer(wrappedText, this.style);
    return {wrapped, lastLinePadding}
  }
  public flatten(initialStyle?: Style):FlatNonatomicTextContainer<T> {
    const style = this.style || initialStyle;
    return new FlatNonatomicTextContainer([new AtomicTextContainer(this.text, style)]);
  }
  splitToFlatLines():FlatNonatomicTextContainer<StrictUnicodeLine>[] {
    return this.text.splitToLines().map((line) => {
      return new FlatNonatomicTextContainer<StrictUnicodeLine>([new AtomicTextContainer<StrictUnicodeLine>(line, this.style)]);
    })
  }
}
type NonatomicChildT<T extends AnyStrictUnicodeT = AnyStrictUnicodeT> = NonatomicTextContainer<T> | AtomicTextContainer<T>;
export class NonatomicTextContainer<T extends AnyStrictUnicodeT = AnyStrictUnicodeT> extends TextContainer<T> {
  constructor(public children:NonatomicChildT<T>[], public style?: Style) {
    super();
  }
  calcSize():textContainerSizeT {
    type reduceStateT = {size: textContainerSizeT, linePadding:number, isFirst: boolean};
    const initialSize:textContainerSizeT = {
      heigth: 0,
      width:{
         first: 0,
         other:0,
         last: 0,
      }
    }
    const reduceState = this.children.reduce<reduceStateT>((reduceState, child) => {
      const currentSize = child.calcSize();
      debugger; // TODO check is 0 or 1 needed for noline
      reduceState.linePadding += currentSize.width.first;

      if (reduceState.isFirst) {
        reduceState.size.width.first = reduceState.linePadding;
      }
      reduceState.size.width.other = Math.max(reduceState.size.width.other, currentSize.width.other, reduceState.linePadding);
      reduceState.size.heigth += currentSize.heigth;

      if (currentSize.heigth > 0) {
        reduceState.isFirst = false;
        reduceState.linePadding = reduceState.size.width.last;
      }
      return reduceState;
    }, {size: initialSize, linePadding: 0, isFirst: true});

    reduceState.size.width.last = reduceState.linePadding;

    return reduceState.size;
  }
  public toString(): string {
    return this.children.reduce((text, child) => { return text + child.toString(); }, '');
  }
  public wrap(maxWidth: number, firstLinePadding: number = 0): {wrapped: NonatomicTextContainer<StrictUnicodeText>, lastLinePadding: number} {
    type reduceStateT = {children: NonatomicChildT<StrictUnicodeText>[], linePadding:number};
    const reduceState = this.children.reduce<reduceStateT>((reduceState, child) => {
      const wrapResult = child.wrap(maxWidth, reduceState.linePadding);
      if (wrapResult.wrapped.calcSize().heigth === 0) {
        reduceState.linePadding += wrapResult.lastLinePadding;
      } else {
        reduceState.linePadding = wrapResult.lastLinePadding;
      }
      reduceState.children.push(wrapResult.wrapped);
      return reduceState;
    }, {children: [], linePadding: firstLinePadding});

    const wrapped = new NonatomicTextContainer(reduceState.children, this.style);
    const lastLinePadding = reduceState.linePadding;
    return {wrapped, lastLinePadding }
  }
  public flatten(initialStyle?: Style):FlatNonatomicTextContainer<T> {
    const style = this.style || initialStyle;
    const flatChildren = this.children.reduce<AtomicTextContainer<T>[]>((flatChildren, child) => {
      flatChildren = flatChildren.concat(child.flatten(style).children);
      return flatChildren;
    }, []);
    return new FlatNonatomicTextContainer(flatChildren);
  }
}
export class FlatNonatomicTextContainer<T extends AnyStrictUnicodeT = AnyStrictUnicodeT> extends NonatomicTextContainer<T> {
  constructor(public children:AtomicTextContainer<T>[]) {
    super(children, undefined);
  }
  splitToFlatLines():FlatNonatomicTextContainer<StrictUnicodeLine>[] {
    let linesAsFlat:FlatNonatomicTextContainer<StrictUnicodeLine>[] = [];
    let currentLineAsAtomics:AtomicTextContainer<StrictUnicodeLine>[] = [];
    this.children.forEach((child) => {
      const childLines = child.text.splitToLines();
      const childLinesAsAtomic = childLines.map((childLine) => {
        const childLineAsAtomic = new AtomicTextContainer(childLine, child.style);
        return childLineAsAtomic;
      });
      if (childLinesAsAtomic.length > 0) {
        currentLineAsAtomics.push(childLinesAsAtomic.shift()!);
      }
      if (childLinesAsAtomic.length > 0) {
        linesAsFlat.push(new FlatNonatomicTextContainer(currentLineAsAtomics));
        currentLineAsAtomics = [childLinesAsAtomic.pop()!];
      }
      if (childLinesAsAtomic.length > 0) {
        childLinesAsAtomic.forEach((childLineAsAtomic) => {
          linesAsFlat.push(new FlatNonatomicTextContainer([childLineAsAtomic]));
        });
      }
    });
    // tail
    linesAsFlat.push(new FlatNonatomicTextContainer(currentLineAsAtomics));
    return linesAsFlat;
  }
}
