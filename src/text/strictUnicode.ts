export class StrictUnicodeText {
  private readonly text: string;
  constructor(public readonly rules: strictUnicodeRulesT, text: string | StrictUnicodeText, isSkipChecks = false) {
    this.text = this.preprocessText(text, isSkipChecks);
  }

  protected preprocessText(text: string | StrictUnicodeText, isSkipChecks = false): string {
    if (isSkipChecks || this.guardSafeInstance(text)) {
      return text.toString();
    } else {
      const normalizedText = this.normalize(text);
      if (this.checkByRules(text)) {
        return normalizedText;
      } else {
        throw new Error('text does not follow strictUnicodeRules');
      }
    }
  }
  protected normalize(text: string): string {
    const utf16Normalized = text.normalize('NFC');
    const noTabs = utf16Normalized.replace('\t','').padEnd(this.rules.width.tab, ' ');
    // TODO: consider natural alingned tab steps (via div/mod math)
    const noIgnored = noTabs.replace(this.rules.ingore.matcher,this.rules.ingore.token);
    return noIgnored;

  }
  protected checkByRules(text: string): boolean {
    return true;
  }
  protected guardSafeInstance(text: string | StrictUnicodeText): text is StrictUnicodeText {
    return text instanceof StrictUnicodeText;
  }
  public toString(): string {
    return this.text;
  }

  static combine(rules: strictUnicodeRulesT, items: StrictUnicodeText[]): StrictUnicodeText {
    const itemsRules = items.map(item => item.rules);
    const isAllsameRules = itemsRules.every((itemsRules) => itemsRules === rules);
    if (isAllsameRules) {
      const combinedString = items.reduce((combinedString, item) => {
        return combinedString + item.toString();
      }, '');
      return new StrictUnicodeText(rules, combinedString, false); // TODO: try true
    } else {
      throw new Error('not all rules are strictly same');
    }
  }

  public splitToFeedLines(): StrictUnicodeLine[] {
    const feedLines = this.toString().split(this.rules.eol.matcher).map((lineString: string) => {
      return new StrictUnicodeLine(this.rules, lineString, true);
    });
    return feedLines;
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

  protected checkByRules(text: string): boolean {
    if (super.checkByRules(text)) {
      if (this.rules.eol.matcher.test(text.toString())) { throw('No EOLs allowed in single StrictUnicodeLine, use StrictUnicodeText instead'); }
      return true;
    } else {
      return false;
    }
  }
  protected guardSafeInstance(text: string | StrictUnicodeText): text is StrictUnicodeLine {
    return text instanceof StrictUnicodeLine;
  }

  protected widthCache: number | undefined;
  public calcWidth(): number {
    if (this.widthCache === undefined) {
      const iterator = this.toString()[Symbol.iterator]();
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

  static combine(rules: strictUnicodeRulesT, items: StrictUnicodeLine[]): StrictUnicodeLine {
    const combinedText = super.combine(rules, items);
    return new StrictUnicodeLine(rules, combinedText, false); // TODO: try true
  }
  public *managedWrap(maxWidth: number): Generator<StrictUnicodeLine, StrictUnicodeLine, number> {
    const lineWidth = this.calcWidth();
    if (lineWidth <= maxWidth) {
      return this;
    }
    let wrappedLineWidth = 0;
    let wrappedLine = '';
    for (const codePoint of this.toString()) {
      const codePointWidth = 1; // TODO: support for full-width chars
      if (wrappedLineWidth + codePointWidth > maxWidth) {
        maxWidth = yield new StrictUnicodeLine(this.rules, wrappedLine, false); // TODO: try true
        wrappedLine = '';
        wrappedLineWidth = 0;
      }
      wrappedLineWidth += codePointWidth;
      wrappedLine += codePoint;
    }
    //tail
    return new StrictUnicodeLine(this.rules, wrappedLine, false); // TODO: try true
  }
}

export class StrictUnicodeChar extends StrictUnicodeLine {

  protected checkByRules(text: string): boolean {
    if (super.checkByRules(text)) {
      if (this.toString().length > 1 ) { throw('No EOLs allowed in single StrictUnicodeLine, use StrictUnicodeText instead'); }
      // TODO: use rules and accurate char width
      return true;
    } else {
      return false;
    }
  }
  protected guardSafeInstance(text: string | StrictUnicodeText): text is StrictUnicodeChar {
    return text instanceof StrictUnicodeChar;
  }

  protected widthCache = 1;
  public calcWidth(): number {
    return 1;
  }

  static combine(rules: strictUnicodeRulesT, items: StrictUnicodeChar[]): StrictUnicodeLine {
    return super.combine(rules, items);
  }
}

export type AnyStrictUnicodeT = StrictUnicodeChar | StrictUnicodeLine | StrictUnicodeText;



