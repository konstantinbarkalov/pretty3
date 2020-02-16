/* eslint-disable @typescript-eslint/no-use-before-define */
import { AnyStrictUnicodeT, StrictUnicodeLine } from './strictUnicode';
import { Style } from './style';

type textContainerSizeT = {
  width: {
    first: number;
    other: number;
    last: number;
  };
  heigth: number;
}

export abstract class TextContainerBase<T extends AnyStrictUnicodeT = AnyStrictUnicodeT> {
  public abstract readonly rules: strictUnicodeRulesT;
  public style?: Style;
  public abstract calcSize(): textContainerSizeT;
  public abstract toString(): string;
  public abstract flatten(initialStyle?: Style): FlatNonatomicTextContainer<T>;
  public abstract splitToFlatFeedLines(): FlatNonatomicTextContainer<StrictUnicodeLine>[];
}
export type AnyTextContainer<T extends AnyStrictUnicodeT = AnyStrictUnicodeT> = AtomicTextContainer<T> | NonatomicTextContainer<T> | FlatNonatomicTextContainer<T>;
export class AtomicTextContainer<T extends AnyStrictUnicodeT = AnyStrictUnicodeT> extends TextContainerBase<T> {
  public readonly size: textContainerSizeT;
  constructor(public readonly rules: strictUnicodeRulesT, public readonly text: T, public style?: Style) {
    super();
    if (this.text.rules !== this.rules) {
      throw new Error('rules are not stricltly same');
    }
    this.size = this.precalcSize();
  }
  precalcSize(): textContainerSizeT {
    const feedLines = this.text.splitToFeedLines();
    const firstLine = feedLines[0];
    const lastLine = feedLines[feedLines.length - 1];
    let otherLineMaxWidth = 0;
    for (let lineId = 1; lineId < feedLines.length - 1; lineId++) {
      const otherLine = feedLines[lineId];
      const otherLineWidth = otherLine.calcWidth();
      otherLineMaxWidth = Math.max(otherLineMaxWidth, otherLineWidth);
    }
    const size: textContainerSizeT = {
      width: {
        first: firstLine.calcWidth(),
        last: lastLine.calcWidth(),
        other: otherLineMaxWidth,
      },
      heigth: feedLines.length - 1,
    };
    return size;
  }
  calcSize(): textContainerSizeT {
    return this.size;
  }
  public toString(): string {
    return this.text.toString();
  }

  public flatten(initialStyle?: Style): FlatNonatomicTextContainer<T> {
    const style = this.style || initialStyle;
    return new FlatNonatomicTextContainer(this.rules, [new AtomicTextContainer(this.rules, this.text, style)]);
  }
  public splitToFlatFeedLines(): FlatNonatomicTextContainer<StrictUnicodeLine>[] {
    return this.text.splitToFeedLines().map((line) => {
      return new FlatNonatomicTextContainer<StrictUnicodeLine>(this.rules, [new AtomicTextContainer<StrictUnicodeLine>(this.rules, line, this.style)]);
    });
  }
  public *managedWrap(maxWidth: number): Generator<AtomicTextContainer<StrictUnicodeLine>, AtomicTextContainer<StrictUnicodeLine>, number>  {
    const lineWrapGenerator = this.text.managedWrap(maxWidth);
    let done: boolean | undefined = false;
    while (true) {
      const generatorResult = lineWrapGenerator.next(maxWidth);
      done = generatorResult.done;
      const wrappedLine = generatorResult.value;
      const wrappedLineContainer = new AtomicTextContainer<StrictUnicodeLine>(this.rules, wrappedLine, this.style);
      if (!done) {
        maxWidth = yield wrappedLineContainer;
      } else {
        return wrappedLineContainer;
      }
    }
  }
}
export class NonatomicTextContainer<T extends AnyStrictUnicodeT = AnyStrictUnicodeT> extends TextContainerBase<T> {
  constructor(public readonly rules: strictUnicodeRulesT, public children: AnyTextContainer<T>[], public style?: Style) {
    super();
    const childrenRules = children.map(child => child.rules);
    const isAllsameRules = childrenRules.every((childrenRules) => childrenRules === rules);
    if (!isAllsameRules) {
      throw new Error('not all rules are strictly same');
    }
  }
  calcSize(): textContainerSizeT {
    type reduceStateT = {size: textContainerSizeT; linePadding: number; isFirst: boolean};
    const initialSize: textContainerSizeT = {
      heigth: 0,
      width:{
        first: 0,
        other:0,
        last: 0,
      }
    };
    const reduceState = this.children.reduce<reduceStateT>((reduceState, child) => {
      const currentSize = child.calcSize();
      // debugger; // TODO check is 0 or 1 needed for noline
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
  public flatten(initialStyle?: Style): FlatNonatomicTextContainer<T> {
    const style = this.style || initialStyle;
    const flatChildren = this.children.reduce<AtomicTextContainer<T>[]>((flatChildren, child) => {
      flatChildren = flatChildren.concat(child.flatten(style).children);
      return flatChildren;
    }, []);
    return new FlatNonatomicTextContainer(this.rules, flatChildren);
  }
  public splitToFlatFeedLines(): FlatNonatomicTextContainer<StrictUnicodeLine>[] {
    return this.flatten().splitToFlatFeedLines();
  }

  public *managedWrap(maxWidth: number): Generator<AnyTextContainer<StrictUnicodeLine>, AnyTextContainer<StrictUnicodeLine>, number> {
    let remains: AnyTextContainer<StrictUnicodeLine>[] | undefined = undefined;
    let remainsWidth = 0;
    if (this.children.length === 0) {
      return new NonatomicTextContainer<StrictUnicodeLine>(this.rules, [], this.style);
    }
    for (const child of this.children) {
      const lineWrapGenerator = child.managedWrap(maxWidth - remainsWidth);
      let done: boolean | undefined = false;
      while (!done) {
        const generatorResult = lineWrapGenerator.next(maxWidth - remainsWidth);
        done = generatorResult.done;
        const wrappedLine = generatorResult.value;
        if (!done) {
          if (remains) {
            const wrappedLineWithRemains = remains.concat([wrappedLine]);
            maxWidth = yield new NonatomicTextContainer<StrictUnicodeLine>(this.rules, wrappedLineWithRemains, this.style);
          } else {
            maxWidth = yield new NonatomicTextContainer<StrictUnicodeLine>(this.rules, [wrappedLine], this.style);
          }
          remains = undefined;
          remainsWidth = 0;
        } else {
          if (remains) {
            const wrappedLineWithRemains: AnyTextContainer<StrictUnicodeLine>[] = remains.concat([wrappedLine]);
            remains = wrappedLineWithRemains;
            remainsWidth += wrappedLine.calcSize().width.first;
          } else {
            remains = [wrappedLine];
            remainsWidth = wrappedLine.calcSize().width.first;
          }
        }
      }
    }
    // tail
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return new NonatomicTextContainer<StrictUnicodeLine>(this.rules, remains!, this.style);
  }
}

export class FlatNonatomicTextContainer<T extends AnyStrictUnicodeT = AnyStrictUnicodeT> extends NonatomicTextContainer<T> {
  readonly style: undefined;
  constructor(public readonly rules: strictUnicodeRulesT, public children: AtomicTextContainer<T>[]) {
    super(rules, children, undefined);
  }
  splitToFlatFeedLines(): FlatNonatomicTextContainer<StrictUnicodeLine>[] {
    const flatFeedLines: FlatNonatomicTextContainer<StrictUnicodeLine>[] = [];
    let currentFeedLineAsAtomics: AtomicTextContainer<StrictUnicodeLine>[] = [];
    this.children.forEach((child) => {
      const childFeedLines = child.text.splitToFeedLines();
      const childFeedLinesAsAtomics = childFeedLines.map((childLine) => {
        const childLineAsAtomic = new AtomicTextContainer(this.rules, childLine, child.style);
        return childLineAsAtomic;
      });
      if (childFeedLinesAsAtomics.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        currentFeedLineAsAtomics.push(childFeedLinesAsAtomics.shift()!);
      }
      while (childFeedLinesAsAtomics.length > 0) {
        flatFeedLines.push(new FlatNonatomicTextContainer(this.rules, currentFeedLineAsAtomics));
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        currentFeedLineAsAtomics = [childFeedLinesAsAtomics.pop()!];
      }
    });
    // tail
    flatFeedLines.push(new FlatNonatomicTextContainer(this.rules, currentFeedLineAsAtomics));
    return flatFeedLines;
  }
}
