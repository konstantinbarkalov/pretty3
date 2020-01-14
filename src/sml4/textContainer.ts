import { Style } from "./style";
import { StrictUnicodeText } from "./strictUnicode";

export abstract class TextContainer {
  public style?: Style;
  public abstract calcSize():textContainerSizeT;
  public abstract toString():string;
  public abstract wrap(maxWidth:number): {wrapped: TextContainer, lastLinePadding: number };
}
type textContainerSizeT = {
  width: {
    first: number,
    other: number,
    last: number,
  },
  heigth: number,
}
export class AtomicTextContainer extends TextContainer {
  public readonly size:textContainerSizeT;
  public readonly text:StrictUnicodeText;
  constructor(text:string | StrictUnicodeText, public style?: Style) {
    super();
    const isStrictAlready = (text instanceof StrictUnicodeText);
    this.text = isStrictAlready ? text as StrictUnicodeText : new StrictUnicodeText(text);
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
  public wrap(maxWidth: number, firstLinePadding: number = 0): {wrapped: AtomicTextContainer, lastLinePadding: number} {
    const {wrappedText, lastLinePadding} = this.text.wrap(maxWidth, firstLinePadding);
    const wrapped = new AtomicTextContainer(wrappedText, this.style);
    return {wrapped, lastLinePadding}
  }
}
type NonatomicChildT = NonatomicTextContainer | AtomicTextContainer;
export class NonatomicTextContainer extends TextContainer {
  constructor(public children:NonatomicChildT[], public style?: Style) {
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
  public wrap(maxWidth: number, firstLinePadding: number = 0): {wrapped: NonatomicTextContainer, lastLinePadding: number} {
    type reduceStateT = {children: NonatomicChildT[], linePadding:number};
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
}
