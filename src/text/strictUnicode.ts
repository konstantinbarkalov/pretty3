/* eslint-disable @typescript-eslint/ban-types */

import { EOL } from 'os';
export class NormalizedUnicodeText extends String {
  constructor(text: string | String, isSkipChecks = false) {
    const isNormalizedInstance = NormalizedUnicodeText.isNormalizedInstance(text);
    if (isSkipChecks || isNormalizedInstance) {
      super(text);
    } else {
      const normalizedText = text.normalize();
      super(normalizedText);
    }
  }
  public normalize(): string {
    return this.valueOf();
  }
  static isNormalizedInstance(text: string | String): boolean {
    return text instanceof NormalizedUnicodeText;
  }
  static combine(...items: NormalizedUnicodeText[]): NormalizedUnicodeText {
    const combinedString = items.reduce((combinedString, item) => {
      return combinedString + item.toString();
    }, '');
    return new NormalizedUnicodeText(combinedString);
  }
}

export class StrictUnicodeText extends NormalizedUnicodeText {
  constructor(text: string | String, isSkipChecks = false) {
    super(text, isSkipChecks);
    isSkipChecks = isSkipChecks || this.isPrecheckedInstance(text);
    if (!isSkipChecks) {
      this.guardStringIsStrictUnicode(this);
    }
  }

  protected isPrecheckedInstance(text: string | String): boolean {
    return text instanceof StrictUnicodeText;
  }

  public guardStringIsStrictUnicode(normalizedText: NormalizedUnicodeText): void {
    for (const utf16Code of normalizedText) {
      const utf16CodePoint = utf16Code.codePointAt(0);
      if (utf16CodePoint === undefined || utf16CodePoint > 65536) {
        // TODO: 1. ASAP check limits
        // TODO: 2. later support compound multi utf16Code
        throw new Error('String is nonstrict unicode, which is unsupported');
      }
    }
  }
  public splitToFeedLines(): StrictUnicodeLine[] {
    const feedLines = this.valueOf().split(EOL).map((lineString: string) => {
      return new StrictUnicodeLine(lineString, true);
    });
    return feedLines;
  }

  static combine(...items: StrictUnicodeText[]): StrictUnicodeText {
    const combinedNormalized = super.combine(...items);
    return new StrictUnicodeText(combinedNormalized);
  }
  public *managedWrap(maxWidth: number): Generator<StrictUnicodeLine, StrictUnicodeLine, number> {
    const feedLines = this.splitToFeedLines();
    let wrappedLine: StrictUnicodeLine;

    for (let lineId = 0; lineId < feedLines.length; lineId++) {
      const feelLine = feedLines[lineId];
      const isLastLine = lineId === feedLines.length - 1;
      const lineWrapGenerator = feelLine.managedWrap(maxWidth);
      let done: boolean;
      do {
        const generatorResult = lineWrapGenerator.next(maxWidth);
        done = generatorResult.done || false;
        wrappedLine = generatorResult.value;
        if (!done || !isLastLine) {
          maxWidth = yield wrappedLine;
        }
      } while (!done);
    }
    // tail
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return wrappedLine!;
  }
}

export class StrictUnicodeLine extends StrictUnicodeText {
  constructor(text: string | String, isSkipChecks = false) {
    if (text.toString().includes(EOL)) {
      console.log(text.toString());
    }
    super(text, isSkipChecks);
  }

  protected isPrecheckedInstance(text: string | String): boolean {
    return text instanceof StrictUnicodeLine;
  }

  public guardStringIsStrictUnicode(normalizedText: NormalizedUnicodeText): void {
    if (normalizedText.includes(EOL)) { throw('No EOLs allowed in single StrictUnicodeLine, use StrictUnicodeText instead'); }
    super.guardStringIsStrictUnicode(normalizedText);
  }
  protected widthCache: number | undefined;
  public calcWidth(): number {
    if (this.widthCache === undefined) {
      const iterator = this[Symbol.iterator]();
      let width = 0;
      while (!iterator.next().done) { width++; }
      this.widthCache = width;
      // or
      // for ({} of this) { width++ }
      // or
      // [...this].length
    }
    return this.widthCache;
  }

  static combine(...items: StrictUnicodeLine[]): StrictUnicodeLine {
    const combinedText = super.combine(...items);
    return new StrictUnicodeLine(combinedText);
  }
  public *managedWrap(maxWidth: number): Generator<StrictUnicodeLine, StrictUnicodeLine, number> {
    const lineWidth = this.calcWidth();
    if (lineWidth <= maxWidth) {
      return this;
    }
    let wrappedLineWidth = 0;
    let wrappedLine = '';
    for (const codePoint of this) {
      const codePointWidth = 1; // TODO: support for full-width chars
      if (wrappedLineWidth + codePointWidth > maxWidth) {
        maxWidth = yield new StrictUnicodeLine(wrappedLine);
        wrappedLine = '';
        wrappedLineWidth = 0;
      }
      wrappedLineWidth += codePointWidth;
      wrappedLine += codePoint;
    }
    //tail
    return new StrictUnicodeLine(wrappedLine);
  }
}

export class StrictUnicodeChar extends StrictUnicodeLine {

  protected isPrecheckedInstance(text: string | String): boolean {
    return text instanceof StrictUnicodeChar;
  }

  protected widthCache = 1;
  public guardStringIsStrictUnicode(normalizedText: StrictUnicodeLine): void {
    if (normalizedText.calcWidth() !== 1) {
      throw('char width must be strictly 1');
    }
    super.guardStringIsStrictUnicode(normalizedText);
  }
  public calcWidth(): number {
    return 1;
  }

  static combine(...items: StrictUnicodeChar[]): StrictUnicodeLine {
    return super.combine(...items);
  }
}

export type AnyStrictUnicodeT = StrictUnicodeChar | StrictUnicodeLine | StrictUnicodeText;



