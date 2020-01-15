import { TextContainer } from "../../textContainer";
import { Renderer } from "../renderer";

export class PlainRenderer extends Renderer {
  public render(textContainer: TextContainer):string {
    return textContainer.toString();
  }
}