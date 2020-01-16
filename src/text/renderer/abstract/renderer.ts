import { TextContainer, FlatNonatomicTextContainer } from "../../textContainer";
import { StrictUnicodeLine } from "../../strictUnicode";

export abstract class Renderer {
  public abstract render(textContainer: TextContainer):string;

  public abstract renderFlat(flatTextContainer: FlatNonatomicTextContainer):string;

  public abstract renderFlatLines(flatLines: FlatNonatomicTextContainer<StrictUnicodeLine>[]):string;

  public abstract renderFlatLine(flatLineContainer: FlatNonatomicTextContainer<StrictUnicodeLine>):string;

  public abstract eol:string;
}