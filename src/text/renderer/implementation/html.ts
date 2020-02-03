import { Style } from '../../style';
import { StyleSwitchesEnum } from '../../styleTypes';
import { SimpleRenderer } from '../abstract/simpleRenderer';
import { EOL } from 'os';
import { strictRgb } from '../abstract/strictRgb';
export class HtmlRenderer extends SimpleRenderer {
  public eol: string = '<br/>' + EOL;
  protected styleBegin(style: Style | undefined): string {
    let styleString = '';
    if (style) {
      styleString += '<span style="';
      if (style.background) {
        const strictBackground = strictRgb(style.background);
        styleString += `background-color: rgb(${strictBackground.r}, ${strictBackground.g}, ${strictBackground.b}); `;
      }
      if (style.foreground) {
        const strictForeground = strictRgb(style.foreground);
        styleString += `color: rgb(${strictForeground.r}, ${strictForeground.g}, ${strictForeground.b}); `;
      }
      if (style.switches[StyleSwitchesEnum.Bold]) {
        styleString += 'font-weight: bold; ';
      }
      if (style.switches[StyleSwitchesEnum.Italic]) {
        styleString += 'font-style: italic; ';
      }
      if (style.switches[StyleSwitchesEnum.Underline]) {
        styleString += 'text-decoration: underline; ';
      }
      styleString += '" >';
    }
    return styleString;
  }
  protected styleEnd(style: Style | undefined): string {
    let styleString = '';
    if (style) {
      styleString ='</span>';
    }
    return styleString;
  }
  protected escapeText(text: string): string {
    const tagsToEscape: {[key: string]: string | undefined} = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      ' ': '&nbsp;',
    };
    // TODO: redo such uneffective crap
    return text.replace(/[&<> ]/g, (tag: string) => {
      return tagsToEscape[tag] || tag;
    });
  }
  public wrapDocument(document: string): string {
    return this.documentBegin + document + this.documentEnd;
  }
  protected documentBegin = '<span style="font-family: monospace; ">';
  protected documentEnd = '</span>';
}