import { linesT } from "../types/general";
import { EOL } from "os";

export class Span {
  // immutable design
  readonly lines:linesT;
  readonly width:number;
  constructor(text:string) {
    this.lines = Span.stringToLines(text);
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

export class UnbreakedSpan extends Span {
  // immutable design
  readonly unbreaked:true = true
  constructor(text:string) {
    super(text)
    if (this.lines.length !== 1) {
      throw new Error('UnbreakedSpan cannot have anly EOLs');
    }
  }
}
