import { StrictUnicodeLine } from '../../strictUnicode';
import { AnyTextContainer, FlatNonatomicTextContainer } from '../../textContainer';

export abstract class Renderer {
  public abstract render(textContainer: AnyTextContainer): string;

  public abstract renderFlat(flatTextContainer: FlatNonatomicTextContainer): string;

  public abstract renderFlatFeedLines(flatFeedLines: FlatNonatomicTextContainer<StrictUnicodeLine>[]): string;

  public abstract renderFlatFeedLine(flatFeedLineContainer: FlatNonatomicTextContainer<StrictUnicodeLine>): string;

  public abstract eol: string;
}