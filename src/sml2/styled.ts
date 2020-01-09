import { Style } from "./style";
import { TextContainer } from "./tls";

export class Styled<TTextContainer extends TextContainer> {
  // immmutable breakableSpan, mutable style
  constructor(public readonly textContainer: TTextContainer, public style?:Style) {
  }
}

