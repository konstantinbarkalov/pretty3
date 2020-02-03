import { StrictUnicodeLine } from '../../strictUnicode';
import { AnyTextContainer, FlatNonatomicTextContainer } from '../../textContainer';
export type renderResultT = {
  rendered: string;
  trailingEol: string;
}
export abstract class Renderer {
  public abstract render(textContainer: AnyTextContainer): renderResultT;

  public abstract renderFlat(flatTextContainer: FlatNonatomicTextContainer): renderResultT;

  public abstract renderFlatFeedLines(flatFeedLines: FlatNonatomicTextContainer<StrictUnicodeLine>[]): renderResultT;

  public abstract renderFlatFeedLine(flatFeedLineContainer: FlatNonatomicTextContainer<StrictUnicodeLine>): renderResultT;

  public abstract renderFlatLine(flatLineContainer: FlatNonatomicTextContainer<StrictUnicodeLine>): renderResultT;

  public abstract renderLine(flatLineContainer: AnyTextContainer<StrictUnicodeLine>): renderResultT;

  public abstract eol: string;
}