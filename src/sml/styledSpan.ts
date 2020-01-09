import { spanStyleSwitchesT, SpanStyleSwitchesEnum, rgbT } from "./styleTypes";
import { BreakableSpan, Span } from "./span";

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

export class StyledBreakableSpan<TBreakableSpan extends BreakableSpan = BreakableSpan> {
  // immmutable span, mutable style
  style:SpanStyle;
  readonly span: TBreakableSpan;
  constructor(span:TBreakableSpan, style?:SpanStyle) {
    this.span = span;
    this.style = style ? style : SpanStyle.default;
  }

}

export class StyledSpan<TSpan extends Span = Span> extends StyledBreakableSpan<TSpan> {
  // immmutable breakableSpan, mutable style
  constructor(span:TSpan, style?:SpanStyle) {
    super(span, style)
    if (!StyledSpan.guard<TSpan>(this)) {
      throw new Error('Span cannot have any EOLs');
    }
  }
  static guard<TSpan extends Span = Span>(styledBreakableSpan: StyledBreakableSpan): styledBreakableSpan is StyledSpan<TSpan> {
    return styledBreakableSpan instanceof StyledSpan;
  }

}

export class CleanBreakStyledSpan extends StyledBreakableSpan<BreakableSpan> {
  // immmutable breakableSpan, mutable style
  constructor(eol:string) {
    const breakableSpan = new BreakableSpan(eol);
    super(breakableSpan);
  }
}


