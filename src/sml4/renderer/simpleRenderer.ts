import { FlatNonatomicTextContainer, TextContainer } from "../textContainer";
import { Renderer } from "./renderer";
import { Style } from "../style";

export abstract class SimpleRenderer extends Renderer {

  public render(textContainer: TextContainer):string {
    const flat = textContainer.flatten();
    return this.renderFlat(flat);
  }
  public renderFlat(flatTextContainer: FlatNonatomicTextContainer):string {
    let rendered:string = '';
    rendered = flatTextContainer.children.map((atomicChild) => {
      return atomicChild.text.splitToLines().map((line)=>{
        return this.styleBegin(atomicChild.style) + line.toString() + this.styleEnd(atomicChild.style);
      }).join(this.eol);
    }).join('');
    return rendered;
  }

  protected abstract styleBegin(style:Style | undefined): string;
  protected abstract styleEnd(style:Style | undefined): string;
  protected abstract eol:string;
}