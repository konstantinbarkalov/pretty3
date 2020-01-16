import { styleSwitchesT, StyleSwitchesEnum } from "./styleTypes";
import { rgbT } from "./styleTypes";

export class StyleSwitches implements styleSwitchesT {
  // mutable
  static default = new StyleSwitches();
  [StyleSwitchesEnum.Bold]: boolean = false;
  [StyleSwitchesEnum.Italic]: boolean = false;
  [StyleSwitchesEnum.Underline]: boolean = false;
  constructor(switches?: Partial<styleSwitchesT>) {
    if (switches) {
      Object.assign(this, switches);
    }
  }
}

export class Style {
  // mutable
  static readonly default:Readonly<Style> = new Style(undefined, undefined, StyleSwitches.default);
  foreground?:rgbT;
  background?:rgbT;
  switches:StyleSwitches;
  constructor(foreground?:rgbT, background?:rgbT, switches?:StyleSwitches) {
    this.foreground = foreground;
    this.background = background;
    this.switches = switches || new StyleSwitches();
  }
}
