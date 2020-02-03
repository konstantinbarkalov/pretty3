import { EOL } from 'os';
import { SimpleRenderer } from '../abstract/simpleRenderer';

export class PlainRenderer extends SimpleRenderer {
  protected styleBegin(): string {
    return '';
  }
  protected styleEnd(): string {
    return '';
  }
  public eol: string = EOL;
  protected escapeText(text: string): string {
    return text;
  }
}