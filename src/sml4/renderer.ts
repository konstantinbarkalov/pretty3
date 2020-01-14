import { TextContainer, AtomicTextContainer, NonatomicTextContainer } from "./textContainer";

export abstract class Renderer {
  public abstract render(textContainer: TextContainer):string;
  protected guardAtomic(textContainer: TextContainer): textContainer is AtomicTextContainer {
    return textContainer instanceof AtomicTextContainer;
  }
  protected guardNonatomic(textContainer: TextContainer): textContainer is NonatomicTextContainer {
    return textContainer instanceof NonatomicTextContainer;
  }
}