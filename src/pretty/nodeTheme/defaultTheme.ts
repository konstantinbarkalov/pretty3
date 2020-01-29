import { themeT } from '../interfaces/theme';
import { Style } from '../../text/style';

export const theme: themeT = {
  global: {
    style: new Style({r: 255, g: 128, b: 64}),
  },
  broad: {
    enumerable: {
      style: new Style({r: 200, g: 200, b: 200}),
    },
    iterable: {

    },
    single: {

    },
  },
  fine: {
    dead:{
      circularReference: {},
      elipsis: {},
    },
  },
};