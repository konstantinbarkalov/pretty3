import { spanStyleSwitchesT, SpanStyleSwitchesEnum, rgbT } from "./styleTypes";
import { Span, UnbreakedSpan } from "./span";

export class SpanStyleSwitches implements spanStyleSwitchesT {
  // mutable
  static default = new SpanStyleSwitches();
  [SpanStyleSwitchesEnum.Bold]: boolean = false;
  [SpanStyleSwitchesEnum.Underline]: boolean = false;
  constructor(switches?: Partial<spanStyleSwitchesT>) {
    if (switches) {
      Object.assign(this, switches);
    }
  }
}

export class SpanStyle {
  // mutable
  static readonly default:Readonly<SpanStyle> = new SpanStyle(undefined, undefined, SpanStyleSwitches.default);
  foreground?:rgbT;
  background?:rgbT;
  switches:SpanStyleSwitches;
  constructor(foreground?:rgbT, background?:rgbT, switches?:SpanStyleSwitches) {
    this.foreground = foreground;
    this.background = background;
    this.switches = switches || new SpanStyleSwitches();
  }
}

export class StyledSpan<TSpan extends Span = Span> {
  // immmutable span, mutable style
  style:SpanStyle;
  readonly span: TSpan;
  constructor(span:TSpan, style?:SpanStyle) {
    this.span = span;
    this.style = style ? style : SpanStyle.default;
  }

}

export class UnbreakedStyledSpan<TUnbreakedSpan extends UnbreakedSpan = UnbreakedSpan> extends StyledSpan<TUnbreakedSpan> {
  // immmutable span, mutable style
}

export class CleanBreakStyledSpan extends StyledSpan<Span> {
  // immmutable span, mutable style
  constructor(eol:string) {
    const span = new Span(eol);
    super(span);
  }
}

export function guardUnbreakedStyledSpan(styledSpan: StyledSpan): styledSpan is UnbreakedStyledSpan {
  return styledSpan instanceof UnbreakedStyledSpan;
}

export function guardCleanBreakStyledSpan(styledSpan: StyledSpan): styledSpan is CleanBreakStyledSpan {
  return styledSpan instanceof CleanBreakStyledSpan;
}

