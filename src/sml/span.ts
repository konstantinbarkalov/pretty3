import { linesT } from "../types/general";
import { EOL } from "os";

export class BreakableSpan {
  // immutable design
  readonly lines:linesT;
  readonly width:number;
  constructor(text:string) {
    this.lines = BreakableSpan.stringToLines(text);
    this.width = text.length; // TODO unicode size
  }
  toString() {
    return this.lines.join(EOL);
  }
  static stringToLines(text:string):linesT {
    // to be less sensitive on input
    // and to allow cross-OS compatibility
    // with same (locked to any of EOLs) input
    const lines = text.split(/\r\n|\n/);
    return lines;
  }
}

export class Span extends BreakableSpan {
  // immutable design
  readonly unbreaked:true = true;
  constructor(text:string) {
    super(text)
    if (!Span.guard(this)) {
      throw new Error('Span cannot have any EOLs');
    }
  }
  public toString() {
    return this.lines[0];
  }
  static guard(breakableSpan:BreakableSpan): breakableSpan is Span {
    return (breakableSpan instanceof Span) && (breakableSpan.lines.length === 0);
  }
}
