import { TextContainer } from "../textContainer";

export abstract class Renderer {
  public abstract render(textContainer: TextContainer):string;
}