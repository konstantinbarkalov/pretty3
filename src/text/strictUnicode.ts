/* eslint-disable @typescript-eslint/ban-types */

import { EOL } from 'os';

export class NormalizedUnicodeText extends String {
  constructor(text: string | String, isSkipChecks = false) {
    if (isSkipChecks) {
      super(text);
    } else {
      const normalizedText = text.normalize();
      super(normalizedText);
    }
  }
  public normalize(): string {
    return this.valueOf();
  }
  protected isPrecheckedInstance(text: string | String): boolean {
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
    if (isSkipChecks) {
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
  public splitToLines(): StrictUnicodeLine[] {
    const lines = this.valueOf().split(EOL).map((lineString: string) => {
      return new StrictUnicodeLine(lineString, true);
    });
    return lines;
  }
  public wrap(maxWidth: number, firstLinePadding = 0): {wrappedText: StrictUnicodeText; lastLinePadding: number} {
    const lines = this.splitToLines();
    const wrapResults = lines.map((line, lineId) => {
      const isFirst = lineId === 0;
      const currentLineFirstLinePadding = isFirst ? firstLinePadding : 0;
      return line.wrap(maxWidth, currentLineFirstLinePadding);
    });
    const wrappedTextString = wrapResults.map(({wrappedText}) => {
      return wrappedText;
    }).join(EOL);
    const lastWrappedText = wrapResults[wrapResults.length - 1];
    const lastLinePadding = lastWrappedText.lastLinePadding;
    const wrappedText = new StrictUnicodeText(wrappedTextString, true);
    return {wrappedText, lastLinePadding };
  }
  static combine(...items: StrictUnicodeText[]): StrictUnicodeText {
    const combinedNormalized = super.combine(...items);
    return new StrictUnicodeText(combinedNormalized);
  }
}

export class StrictUnicodeLine extends StrictUnicodeText {
  constructor(text: string | String, isSkipChecks = false) {
    super(text, isSkipChecks);
  }

  protected isPrecheckedInstance(text: string | String): boolean {
    return text instanceof StrictUnicodeLine;
  }

  public guardStringIsStrictUnicode(normalizedText: NormalizedUnicodeText): void {
    if (normalizedText.includes(EOL)) { throw('No EOLs allowed in single StrictUnicodeLine, use StrictUnicodeText instead'); }
    super.guardStringIsStrictUnicode(normalizedText);
  }
  private widthCache: number | undefined;
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
  public wrap(maxWidth: number, firstLinePadding = 0): {wrappedText: StrictUnicodeText; lastLinePadding: number} {
    const lineWidth = this.calcWidth();
    if (lineWidth <= maxWidth - firstLinePadding) {
      return {wrappedText: this, lastLinePadding: lineWidth};
    }
    let wrappedLineWidth: number = firstLinePadding;
    let wrappedLine = '';
    const wrappedLines = [];
    for (const codePoint of this) {
      const codePointWidth = 1; // TODO: support for full-width chars
      if (wrappedLineWidth + codePointWidth > maxWidth) {
        wrappedLines.push(wrappedLine);
        wrappedLine = '';
        wrappedLineWidth = 0;
      }
      wrappedLineWidth += codePointWidth;
      wrappedLine += codePoint;
    }
    //tail
    wrappedLines.push(wrappedLine); // TODO maybe i need to check for nonempty wrappedLine

    const wrappedText = new StrictUnicodeText(wrappedLines.join(EOL), true);
    return {wrappedText, lastLinePadding: wrappedLineWidth};
  }
  static combine(...items: StrictUnicodeLine[]): StrictUnicodeLine {
    const combinedText = super.combine(...items);
    return new StrictUnicodeLine(combinedText);
  }
}

export type AnyStrictUnicodeT = StrictUnicodeLine | StrictUnicodeText;