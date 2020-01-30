import { Style } from '../text/style';
import { NodeBroadTypeEnum } from './interfaces/nodeType';

const color = {
  brightGreen: {r: 130, g: 240, b: 130},
  green: {r: 80, g: 160, b: 80},
  darkGreen: {r: 64, g: 128, b: 64},
  blue: {r: 160, g: 160, b: 220},
  darkBlue: {r: 64, g: 64, b: 160},
  darkGray: {r: 64, g: 64, b: 64},
  darkGrayGreen: {r: 54, g: 84, b: 54},
  darkGrayBlue: {r: 54, g: 54, b: 84},
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
  branch: {
    [NodeBroadTypeEnum.Dead]: new Style(color.orange),
    [NodeBroadTypeEnum.Single]: new Style(color.orange),
    [NodeBroadTypeEnum.Iterable]: new Style(color.darkGrayGreen),
    [NodeBroadTypeEnum.Enumerable]: new Style(color.darkGrayBlue),
  },
  warning: new Style(color.orange),
};
export const theme = {
  color,
  style
};