import { UnbreakedStyledSpan } from "./styledSpan";
type breakTypeT = 'wrap' | 'hard';
export class UnbreakedStyledSpanLine<TbreakType extends breakTypeT = breakTypeT>{
  // immutable spans, breakType and width, mutable styles
  readonly unbreakedStyledSpans:Readonly<UnbreakedStyledSpan[]>;
  readonly width:number;
  readonly breakType: TbreakType;
  constructor(unbreakedStyledSpans: UnbreakedStyledSpan[], breakType:TbreakType) {
    this.unbreakedStyledSpans = unbreakedStyledSpans;
    this.breakType = breakType;
    this.width = this.calcWidthSum();
  }
  private calcWidthSum() {
    const widthSum = this.unbreakedStyledSpans.reduce((sum, unbreakedStyledSpan) => { return unbreakedStyledSpan.span.width + sum; }, 0);
    return widthSum;
  }
}
export class UnbreakedStyledSpanSheet {
  // immutable spans breakType, and width, mutable styles
  readonly unbreakedStyledSpanLines:Readonly<UnbreakedStyledSpanLine[]>;
  readonly width:number;
  constructor(unbreakedStyledSpanLines: UnbreakedStyledSpanLine[]) {
    this.unbreakedStyledSpanLines = unbreakedStyledSpanLines;
    this.width = this.calcWidthMax();
  }
  private calcWidthMax() {
    const widthMax = this.unbreakedStyledSpanLines.reduce((max, unbreakedStyledSpanLine) => { return Math.max(unbreakedStyledSpanLine.width, max); }, 0);
    return widthMax;
  }
}