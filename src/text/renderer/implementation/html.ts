import { Style } from '../../style';
import { StyleSwitchesEnum } from '../../styleTypes';
import { SimpleRenderer } from '../abstract/simpleRenderer';
import { EOL } from 'os';
export class HtmlRenderer extends SimpleRenderer {
  public eol: string = '<br/>' + EOL;
  protected styleBegin(style: Style | undefined): string {
    let styleString = '';
    if (style) {
      styleString += '<span style="';
      if (style.background) {
        styleString += `background-color: rgb(${style.background.r}, ${style.background.g}, ${style.background.b}); `;
      }
      if (style.foreground) {
        styleString += `color: rgb(${style.foreground.r}, ${style.foreground.g}, ${style.foreground.b}); `;
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
      '>': '&gt;'
    };
    return text.replace(/[&<>]/g, (tag: string) => {
      return tagsToEscape[tag] || tag;
    });
  }
  public wrapDocument(document: string): string {
    return this.documentBegin + document + this.documentEnd;
  }
  protected documentBegin = '<span style="font-family: monospace; ">';
  protected documentEnd = '</span>';
}