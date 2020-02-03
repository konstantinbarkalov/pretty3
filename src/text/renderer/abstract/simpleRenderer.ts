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
    const flatFeedLines = flatTextContainer.splitToFlatFeedLines();
    return this.renderFlatFeedLines(flatFeedLines);
  }

  public renderFlatFeedLines(flatFeedLines: FlatNonatomicTextContainer<StrictUnicodeLine>[]): string {
    return flatFeedLines.map((flatFeedLine)=>{
      return this.renderFlatFeedLine(flatFeedLine);
    }).join('');
  }

  public renderFlatFeedLine(flatFeedLineContainer: FlatNonatomicTextContainer<StrictUnicodeLine>): string {
    return flatFeedLineContainer.children.map((child) => {
      return this.styleBegin(child.style) + this.escapeText(child.toString()) + this.styleEnd(child.style);
    }).join('') + this.eol;
  }

  protected abstract escapeText(text: string): string;
  protected abstract styleBegin(style: Style | undefined): string;
  protected abstract styleEnd(style: Style | undefined): string;
  public abstract eol: string;
}