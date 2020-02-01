import { rgbT } from '../../styleTypes';

export function strictRgbValue(value: number): number {
  return Math.floor((Math.max(0, Math.min(255, value))));

}
export function strictRgb(rgb: rgbT): rgbT {
  return {
    r: strictRgbValue(rgb.r),
    g: strictRgbValue(rgb.g),
    b: strictRgbValue(rgb.b),
  };
}