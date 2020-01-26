import { Style } from '../text/style';

const color = {
  green: {r: 80, g: 160, b: 80},
  darkGreen: {r: 64, g: 128, b: 64},
  blue: {r: 160, g: 160, b: 220},
  darkGray: {r: 64, g: 64, b: 64},
  gray: {r: 128, g: 128, b: 128},
  lightGray: {r: 192, g: 192, b: 192},
  white: {r: 255, g: 255, b: 255},
};
const style = {
  icon: new Style(color.green),
  dim: new Style(color.darkGray),
  key: new Style(color.green),
  keyDots: new Style(color.darkGreen),
  value: new Style(color.white),
  info: new Style(color.blue),
  branch: new Style(color.darkGray),
};
export const theme = {
  color,
  style
};