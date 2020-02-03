import { AnyTextContainer, FlatNonatomicTextContainer } from '../../textContainer';
import { Renderer, renderResultT } from './renderer';
import { StrictUnicodeLine } from '../../strictUnicode';
import { Style } from '../../style';

export abstract class SimpleRenderer extends Renderer {

  public render(textContainer: AnyTextContainer): renderResultT {
    const flat = textContainer.flatten();
    return this.renderFlat(flat);
  }

  public renderFlat(flatTextContainer: FlatNonatomicTextContainer): renderResultT {
    const flatFeedLines = flatTextContainer.splitToFlatFeedLines();
    return this.renderFlatFeedLines(flatFeedLines);
  }

  public renderFlatFeedLines(flatFeedLines: FlatNonatomicTextContainer<StrictUnicodeLine>[]): renderResultT {
    const rendered = flatFeedLines.map((flatFeedLine) => {
      return this.renderFlatFeedLine(flatFeedLine).rendered;
    }).join(this.eol);
    return {
      rendered,
      trailingEol: this.eol,
    };
  }

  public renderFlatFeedLine(flatFeedLineContainer: FlatNonatomicTextContainer<StrictUnicodeLine>): renderResultT {
    const rendered = this.renderFlatLine(flatFeedLineContainer).rendered;
    return {
      rendered,
      trailingEol: this.eol,
    };
  }

  public renderFlatLine(flatLineContainer: FlatNonatomicTextContainer<StrictUnicodeLine>): renderResultT {
    const rendered = flatLineContainer.children.map((child) => {
      return this.styleBegin(child.style) + this.escapeText(child.toString()) + this.styleEnd(child.style);
    }).join('');
    return {
      rendered,
      trailingEol: '',
    };
  }

  public renderLine(lineContainer: AnyTextContainer<StrictUnicodeLine>): renderResultT {
    const flatLine = lineContainer.flatten();
    return this.renderFlat(flatLine);
  }

  protected abstract escapeText(text: string): string;
  protected abstract styleBegin(style: Style | undefined): string;
  protected abstract styleEnd(style: Style | undefined): string;
  public abstract eol: string;
}