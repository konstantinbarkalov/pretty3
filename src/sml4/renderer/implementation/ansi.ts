import { Style } from "../../style";
const ansiStyleLib = require('ansi-styles');
import { StyleSwitchesEnum } from "../../styleTypes";
import { EOL } from "os";
import { SimpleRenderer } from "../simpleRenderer";
export class AnsiRenderer extends SimpleRenderer {
  protected eol:string = EOL;
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