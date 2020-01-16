import { EOL } from "os";
import { SimpleRenderer } from "../simpleRenderer";
import { FlatNonatomicTextContainer } from "../../textContainer";
import { StrictUnicodeLine } from "../../strictUnicode";

export class PlainRenderer extends SimpleRenderer {
  protected styleBegin(): string {
    return ''
  }
  protected styleEnd(): string {
    return ''
  }
  public eol: string = EOL;
  public renderFlatLine(flatLineContainer: FlatNonatomicTextContainer<StrictUnicodeLine>): string {
    return flatLineContainer.toString();
  }
  protected escapeText(text: string):string {
    return text;
  }
}