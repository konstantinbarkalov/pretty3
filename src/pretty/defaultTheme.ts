import { Style } from '../text/style';

const color = {
  brightGreen: {r: 130, g: 240, b: 130},
  green: {r: 80, g: 160, b: 80},
  darkGreen: {r: 64, g: 128, b: 64},
  blue: {r: 160, g: 160, b: 220},
  darkBlue: {r: 64, g: 64, b: 160},
  darkGray: {r: 64, g: 64, b: 64},
  gray: {r: 128, g: 128, b: 128},
  lightGray: {r: 192, g: 192, b: 192},
  white: {r: 255, g: 255, b: 255},
  orange: {r: 255, g: 128, b: 0},
};
const style = {
  icon: new Style(color.brightGreen),
  dim: new Style(color.darkGray),
  key: new Style(color.green),
  keyDelimeter: new Style(color.darkGreen),
  value: new Style(color.white),
  infoDelimeter: new Style(color.darkBlue),
  info: new Style(color.blue),
  branch: new Style(color.darkGray),
  warning: new Style(color.orange),
};
export const theme = {
  color,
  style
};