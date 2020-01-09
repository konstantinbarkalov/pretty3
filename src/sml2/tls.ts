import { EOL } from "os";

/* class decorator */
function staticImplements<T>() {
  return <U extends T>(constructor: U) => {constructor};
}

export interface TextContainerClassI<TTextContainer extends TextContainer> {
  fromString(text: string):TTextContainer;
  new(...args: any):TTextContainer;
}


export abstract class TextContainer {
  public readonly width: number;
  constructor() {
    this.width = this.calcWidth();
  }
  protected abstract calcWidth():number;
  public abstract toString():string;
}

@staticImplements<TextContainerClassI<Token>>()
export class Token extends TextContainer {
  constructor(public readonly text: string, public readonly withSpace: boolean, ingoreChecks: boolean = false) {
    super();
    if (!ingoreChecks) {
      if (!Token.guard(this)) {
        throw new Error('Bad token');
      }
    }
  }
  protected calcWidth():number {
    return this.text.length + (this.withSpace ? 1 : 0); // TODO: unicode stuff
  }
  public toString():string {
    return this.text + (this.withSpace ? ' ' : '');
  }
  static guard(token: Token): token is Token {
    return !token.text.includes(' ') && !token.text.includes(EOL);
  }
  static fromString(text: string, withSpace:boolean = false) {
    return new Token(text, withSpace);
  }
}

@staticImplements<TextContainerClassI<Linepart>>()
export class Linepart extends TextContainer {
  constructor(private readonly tokens: Readonly<Token[]>, ingoreChecks: boolean = true) {
    super();
    if (!ingoreChecks) {
      if (!Linepart.guard(this)) {
        throw new Error('Bad linepart');
      }
    }
  }
  calcWidth():number {
    const sum = this.tokens.reduce((sum, token) => {
      sum += token.width;
      return sum;
    }, 0);
    return sum;
  }
  toString():string {
    const text = this.tokens.reduce((text, token) => {
      text += token.toString();
      return text;
    }, '');
    return text;
  }
  static guard(linepart: Linepart): linepart is Linepart {
    return linepart.tokens.every((token) => {
      return Token.guard(token);
    })
  }
  static fromString(text: string) {
    const tokenStrings = text.split(' ');
    const tokens = tokenStrings.map((tokenString, tokenStringId) => {
      const isLast = tokenStringId === tokenString.length - 1;
      return new Token(tokenString, !isLast);
    });
    return new Linepart(tokens);
  }
}


@staticImplements<TextContainerClassI<Softline>>()
export class Softline extends TextContainer {
  constructor(private readonly lineparts: Readonly<Linepart[]>, private readonly withBreak: boolean, ingoreChecks: boolean = true) {
    super();
    if (!ingoreChecks) {
      if (!Softline.guard(this)) {
        throw new Error('Bad softline');
      }
    }
  }
  calcWidth():number {
    const sum = this.lineparts.reduce((sum, linepart) => {
      sum += linepart.width;
      return sum;
    }, 0);
    return sum;
  }
  toString():string {
    const text = this.lineparts.reduce((text, linepart) => {
      text += linepart.toString();
      return text;
    }, '');
    return text + (this.withBreak ? EOL : '');
  }
  static guard(softline: Softline): softline is Softline {
    return softline.lineparts.every((linepart) => {
      return Linepart.guard(linepart);
    })
  }
  static fromString(text: string, withBreak: boolean = false) {
    const linepart = Linepart.fromString(text);
    return new Softline([linepart], withBreak);
  }
}


@staticImplements<TextContainerClassI<Hardline>>()
export class Hardline extends TextContainer {
  constructor(private readonly softlines: Readonly<Softline[]>, private readonly withBreak: boolean, ingoreChecks: boolean = true) {
    super();
    if (!ingoreChecks) {
      if (!Hardline.guard(this)) {
        throw new Error('Bad hardline');
      }
    }
  }
  calcWidth():number {
    const sum = this.softlines.reduce((sum, softline) => {
      sum += softline.width;
      return sum;
    }, 0);
    return sum;
  }
  toString():string {
    const text = this.softlines.reduce((text, softline) => {
      text += softline.toString();
      return text;
    }, '');
    return text + (this.withBreak ? EOL : '');
  }
  static guard(hardline: Hardline): hardline is Hardline {
    return hardline.softlines.every((softline) => {
      return Softline.guard(softline);
    })
  }
  static fromString(text: string, withBreak: boolean = false) {
    const softline = Softline.fromString(text);
    return new Hardline([softline], withBreak);
  }
}

@staticImplements<TextContainerClassI<Sheet>>()
export class Sheet extends TextContainer {
  constructor(private readonly lines: Readonly<Hardline[]>, ingoreChecks: boolean = true) {
    super();
    if (!ingoreChecks) {
      if (!Sheet.guard(this)) {
        throw new Error('Bad sheet');
      }
    }
  }
  calcWidth():number {
    const max = this.lines.reduce((max, hardline) => {
      return Math.max(max, hardline.width);
    }, 0);
    return max;
  }
  toString():string {
    const text = this.lines.reduce((text, hardline) => {
      text += hardline.toString();
      return text;
    }, '');
    return text;
  }
  static guard(sheet: Sheet): sheet is Sheet {
    return sheet.lines.every((hardline) => {
      return Hardline.guard(hardline);
    })
  }
  static fromString(text: string) {
    const lineStrings = text.split(EOL);
    const lines = lineStrings.map((lineString, lineStringId) => {
      const isLast = lineStringId === lineString.length - 1;
      return Hardline.fromString(lineString, !isLast);
    });
    return new Sheet(lines);
  }
}