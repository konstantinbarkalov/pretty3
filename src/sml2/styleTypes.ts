export enum StyleSwitchesEnum {
  Bold,
  Underline,
}
export type styleSwitchesT = {
  [key in StyleSwitchesEnum]: boolean
}

export type rgbT = {
  r: number,
  g: number,
  b: number
};
