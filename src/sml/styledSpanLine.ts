import { StyledSpan } from "./styledSpan";
type breakTypeT = 'wrap' | 'hard';
export class StyledSpanLine<TbreakType extends breakTypeT = breakTypeT>{
  // immutable spans, breakType and width, mutable styles
  readonly styledSpans:Readonly<StyledSpan[]>;
  readonly width:number;
  readonly breakType: TbreakType;
  constructor(styledSpans: StyledSpan[], breakType:TbreakType) {
    this.styledSpans = styledSpans;
    this.breakType = breakType;
    this.width = this.calcWidthSum();
  }
  private calcWidthSum() {
    const widthSum = this.styledSpans.reduce((sum, styledSpan) => { return styledSpan.breakableSpan.width + sum; }, 0);
    return widthSum;
  }
}
export class StyledSpanSheet {
  // immutable spans breakType, and width, mutable styles
  readonly styledSpanLines:Readonly<StyledSpanLine[]>;
  readonly width:number;
  constructor(styledSpanLines: StyledSpanLine[]) {
    this.styledSpanLines = styledSpanLines;
    this.width = this.calcWidthMax();
  }
  private calcWidthMax() {
    const widthMax = this.styledSpanLines.reduce((max, styledSpanLine) => { return Math.max(styledSpanLine.width, max); }, 0);
    return widthMax;
  }
}