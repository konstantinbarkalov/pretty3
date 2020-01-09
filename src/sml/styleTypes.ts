export enum SpanStyleSwitchesEnum {
  Bold,
  Underline,
}
export type spanStyleSwitchesT = {
  [key in SpanStyleSwitchesEnum]: boolean
}

export type rgbT = {
  r: number,
  g: number,
  b: number
};
