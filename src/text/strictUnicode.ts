import { strictUnicodeRulesT, defaultStrictUnicodeRules } from './strictUnicodeRules';


/* eslint-disable @typescript-eslint/ban-types */

const eolRegexp = /[\n\r]/g;
export class NormalizedUnicodeText<TRules extends strictUnicodeRulesT> extends String {
  public readonly rules: TRules;
  constructor(text: string | String, isSkipChecks = false, rules: strictUnicodeRulesT = defaultStrictUnicodeRules) {
    const isNormalizedInstance = NormalizedUnicodeText.isNormalizedInstance(text);
    if (isSkipChecks || isNormalizedInstance) {
      super(text);
    } else {
      const normalizedText = text.normalize();
      super(normalizedText);
    }
    this.rules = rules as TRules;
  }
  public normalize(): string {
    return this.valueOf();
  }
  static isNormalizedInstance(text: string | String): boolean {
    return text instanceof NormalizedUnicodeText;
  }
  static combine<TRules extends strictUnicodeRulesT>(items: NormalizedUnicodeText<TRules>[], rules: TRules): NormalizedUnicodeText<TRules> {
    const combinedString = items.reduce((combinedString, item) => {
      return combinedString + item.toString();
    }, '');
    return new NormalizedUnicodeText<TRules>(combinedString, false, rules);
  }
}

export class StrictUnicodeText<TRules extends strictUnicodeRulesT> extends NormalizedUnicodeText<TRules> {
  constructor(text: string | String, isSkipChecks = false, rules: TRules) {
    super(text, isSkipChecks, rules);
    isSkipChecks = isSkipChecks || this.isPrecheckedInstance(text);
    if (!isSkipChecks) {
      this.guardStringIsStrictUnicode(this);
    }
  }

  protected isPrecheckedInstance(text: string | String): boolean {
    return text instanceof StrictUnicodeText;
  }

  public guardStringIsStrictUnicode(normalizedText: NormalizedUnicodeText<TRules>): void {
    for (const utf16Code of normalizedText) {
      const utf16CodePoint = utf16Code.codePointAt(0);
      if (utf16CodePoint === undefined || utf16CodePoint > 65536) {
        // TODO: 1. ASAP check limits
        // TODO: 2. later support compound multi utf16Code
        throw new Error('String is nonstrict unicode, which is unsupported');
      }
    }
  }
  public splitToFeedLines(): StrictUnicodeLine<TRules>[] {
    const feedLines = this.valueOf().split(eolRegexp).map((lineString: string) => {
      return new StrictUnicodeLine<TRules>(lineString, false, this.rules);
    });
    return feedLines;
  }

  static combine<TRules extends strictUnicodeRulesT>(items: StrictUnicodeText<TRules>[], rules: TRules): StrictUnicodeText<TRules> {
    const combinedNormalized = super.combine(items, rules);
    return new StrictUnicodeText<TRules>(combinedNormalized, false, rules);
  }
  public *managedWrap(maxWidth: number): Generator<StrictUnicodeLine<TRules>, StrictUnicodeLine<TRules>, number> {
    const feedLines = this.splitToFeedLines();
    let wrappedLine: StrictUnicodeLine<TRules>;

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

export class StrictUnicodeLine<TRules extends strictUnicodeRulesT> extends StrictUnicodeText<TRules> {
  constructor(text: string | String, isSkipChecks = false, rules: TRules) {
    if (eolRegexp.test(text.toString())) {
      console.log(text.toString());
    }
    super(text, isSkipChecks, rules);
  }

  protected isPrecheckedInstance(text: string | String): boolean {
    return text instanceof StrictUnicodeLine;
  }

  public guardStringIsStrictUnicode(normalizedText: NormalizedUnicodeText<TRules>): void {
    if (eolRegexp.test(normalizedText.toString())) { throw('No EOLs allowed in single StrictUnicodeLine, use StrictUnicodeText instead'); }
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

  static combine<TRules extends strictUnicodeRulesT>(items: StrictUnicodeLine<TRules>[], rules: TRules): StrictUnicodeLine<TRules> {
    const combinedText = super.combine(items, rules);
    return new StrictUnicodeLine<TRules>(combinedText, false, rules);
  }
  public *managedWrap(maxWidth: number): Generator<StrictUnicodeLine<TRules>, StrictUnicodeLine<TRules>, number> {
    const lineWidth = this.calcWidth();
    if (lineWidth <= maxWidth) {
      return this;
    }
    let wrappedLineWidth = 0;
    let wrappedLine = '';
    for (const codePoint of this) {
      const codePointWidth = 1; // TODO: support for full-width chars
      if (wrappedLineWidth + codePointWidth > maxWidth) {
        maxWidth = yield new StrictUnicodeLine<TRules>(wrappedLine, false, this.rules);
        wrappedLine = '';
        wrappedLineWidth = 0;
      }
      wrappedLineWidth += codePointWidth;
      wrappedLine += codePoint;
    }
    //tail
    return new StrictUnicodeLine<TRules>(wrappedLine, false, this.rules);
  }
}

export class StrictUnicodeChar<TRules extends strictUnicodeRulesT> extends StrictUnicodeLine<TRules> {

  protected isPrecheckedInstance(text: string | String): boolean {
    return text instanceof StrictUnicodeChar;
  }

  protected widthCache = 1;
  public guardStringIsStrictUnicode(normalizedText: StrictUnicodeLine<TRules>): void {
    if (normalizedText.calcWidth() !== 1) {
      throw('char width must be strictly 1');
    }
    super.guardStringIsStrictUnicode(normalizedText);
  }
  public calcWidth(): number {
    return 1;
  }

  static combine<TRules extends strictUnicodeRulesT>(items: StrictUnicodeChar<TRules>[], rules: TRules): StrictUnicodeLine<TRules> {
    return super.combine(items, rules);
  }
}

export type AnyStrictUnicodeT<TRules extends strictUnicodeRulesT> = StrictUnicodeChar<TRules> | StrictUnicodeLine<TRules> | StrictUnicodeText<TRules>;



