import { Style } from '../../style';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ansiStyleLib = require('ansi-styles');
import { StyleSwitchesEnum } from '../../styleTypes';
import { EOL } from 'os';
import { SimpleRenderer } from '../abstract/simpleRenderer';
import { strictRgb } from '../abstract/strictRgb';
export class AnsiRenderer extends SimpleRenderer {
  public eol: string = EOL;

  protected styleBegin(style: Style | undefined): string {
    let styleString = '';
    if (style) {
      if (style.background) {
        const strictBackground = strictRgb(style.background);
        styleString += ansiStyleLib.bgColor.ansi16m.rgb(strictBackground.r, strictBackground.g, strictBackground.b);
      }
      if (style.foreground) {
        const strictForeground = strictRgb(style.foreground);
        styleString += ansiStyleLib.color.ansi16m.rgb(strictForeground.r, strictForeground.g, strictForeground.b);
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
  protected styleEnd(style: Style | undefined): string {
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
  protected escapeText(text: string): string {
    return text;
  }
}