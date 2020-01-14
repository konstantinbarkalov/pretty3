import { TextContainer } from "../textContainer";
import { Renderer } from "../renderer";
import { Style } from "../style";
const ansiStyleLib = require('ansi-styles');
import { StyleSwitchesEnum } from "../styleTypes";
import { EOL } from "os";
export class AnsiRenderer extends Renderer {
  public render(textContainer: TextContainer):string {
    let rendered:string = '';
    if (this.guardAtomic(textContainer)) {
      rendered = textContainer.text.splitToLines().map((line)=>{
        return this.styleBegin(textContainer.style) + line.toString() + this.styleEnd(textContainer.style);
      }).join(EOL);
    } else if (this.guardNonatomic(textContainer)) {
      rendered = textContainer.children.map((child)=>{
        return this.render(child);
      }).join('');
    } else {
      throw new Error('unknown textContainer type');
    }
    return rendered;
  }
  protected styleBegin(style:Style | undefined) {
    let styleString = '';
    if (style) {
      if (style.background) {
        styleString += ansiStyleLib.bgColor.ansi16m.rgb(style.background.r, style.background.g, style.background.b);
      }
      if (style.foreground) {
        styleString += ansiStyleLib.color.ansi16m.rgb(style.foreground.r, style.foreground.g, style.foreground.b);
      }
      if (style.switches[StyleSwitchesEnum.Bold]) {
        styleString += ansiStyleLib.bold.open;
      }
      if (style.switches[StyleSwitchesEnum.Italic]) {
        styleString += ansiStyleLib.italic.open;
      }
      if (style.switches[StyleSwitchesEnum.Underline]) {
        styleString += ansiStyleLib.underline.open;
      }
    }
    return styleString;
  }
  protected styleEnd(style:Style | undefined) {
    let styleString = '';
    if (style) {
      if (style.background) {
        styleString += ansiStyleLib.bgColor.close;
      }
      if (style.foreground) {
        styleString += ansiStyleLib.color.close;
      }
      if (style.switches[StyleSwitchesEnum.Bold]) {
        styleString += ansiStyleLib.bold.close;
      }
      if (style.switches[StyleSwitchesEnum.Italic]) {
        styleString += ansiStyleLib.italic.close;
      }
      if (style.switches[StyleSwitchesEnum.Underline]) {
        styleString += ansiStyleLib.underline.close;
      }
    }
    return styleString;
  }
}