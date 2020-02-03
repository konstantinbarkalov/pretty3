import { EOL } from 'os';
import { SimpleRenderer } from '../abstract/simpleRenderer';
import { FlatNonatomicTextContainer } from '../../textContainer';
import { StrictUnicodeLine } from '../../strictUnicode';

export class PlainRenderer extends SimpleRenderer {
  protected styleBegin(): string {
    return '';
  }
  protected styleEnd(): string {
    return '';
  }
  public eol: string = EOL;
  public renderFlatFeedLine(flatFeedLineContainer: FlatNonatomicTextContainer<StrictUnicodeLine>): string {
    return this.escapeText(flatFeedLineContainer.toString()) +  + this.eol;
  }
  protected escapeText(text: string): string {
    return text;
  }
}