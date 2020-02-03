import { AnyTextContainer, FlatNonatomicTextContainer } from '../../textContainer';
import { Renderer } from './renderer';
import { StrictUnicodeLine } from '../../strictUnicode';
import { Style } from '../../style';

export abstract class SimpleRenderer extends Renderer {

  public render(textContainer: AnyTextContainer): string {
    const flat = textContainer.flatten();
    return this.renderFlat(flat);
  }

  public renderFlat(flatTextContainer: FlatNonatomicTextContainer): string {
    const rendered = flatTextContainer.children.map((atomicChild) => {
      const flatLines = atomicChild.splitToFlatLines();
      return this.renderFlatLines(flatLines);
    }).join('');
    return rendered;
  }

  public renderFlatLines(flatLines: FlatNonatomicTextContainer<StrictUnicodeLine>[]): string {
    return flatLines.map((flatLine)=>{
      return this.renderFlatLine(flatLine);
    }).join('');
  }

  public renderFlatLine(flatLineContainer: FlatNonatomicTextContainer<StrictUnicodeLine>): string {
    return flatLineContainer.children.map((child) => {
      return this.styleBegin(child.style) + this.escapeText(child.toString()) + this.styleEnd(child.style) + this.eol;
    }).join('');
  }

  protected abstract escapeText(text: string): string;
  protected abstract styleBegin(style: Style | undefined): string;
  protected abstract styleEnd(style: Style | undefined): string;
  public abstract eol: string;
}