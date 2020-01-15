import { Style } from "../../style";
import { StyleSwitchesEnum } from "../../styleTypes";
import { SimpleRenderer } from "../simpleRenderer";
import { FlatNonatomicTextContainer } from "../../textContainer";
export class HtmlRenderer extends SimpleRenderer {
  public renderFlat(flatTextContainer: FlatNonatomicTextContainer) {
    return this.textBegin + super.renderFlat(flatTextContainer) + this.textEnd;
  }
  protected eol:string = '<br/>';
  protected styleBegin(style:Style | undefined) {
    let styleString = '';
    if (style) {
      styleString += '<span style="'
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
      styleString += '" >'
    }
    return styleString;
  }
  protected styleEnd(style:Style | undefined) {
    let styleString = '';
    if (style) {
      styleString ='</span>';
    }
    return styleString;
  }
  protected textBegin = '<span style="font-family: monospace; ">';
  protected textEnd = '</span>';
}