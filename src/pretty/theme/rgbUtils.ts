import { rgbT } from '../../text/styleTypes';

type rgbEachCallbackT = (value: number, channel: 'r' | 'g' | 'b') => number;
function rgbEach(rgb: rgbT, callback: rgbEachCallbackT): rgbT {
  return {
    r: callback(rgb.r, 'r'),
    g: callback(rgb.g, 'g'),
    b: callback(rgb.b, 'b'),
  };
}
export function shiftLuminosity(rgb: rgbT, shiftRatio: number): rgbT {
  return rgbEach(rgb, (value: number) => {
    return value + shiftRatio * 255;
  });
}

export function gainLuminosity(rgb: rgbT, factor: number): rgbT {
  return rgbEach(rgb, (value: number) => {
    return value * factor;
  });
}

export function gammaCorrect(rgb: rgbT, q: number): rgbT {
  return rgbEach(rgb, (value: number) => {
    return Math.pow((value / 255), 1 / q) * 255;
  });
}

export function vibrance(rgb: rgbT, factor: number): rgbT {
  const mean = (rgb.r + rgb.g + rgb.b) / 3;
  return rgbEach(rgb, (value: number) => {
    const diff = value - mean;
    return mean + diff * factor;
  });
}