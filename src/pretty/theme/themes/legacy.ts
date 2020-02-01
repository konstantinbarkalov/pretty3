import { themeT } from '../../interfaces/theme';
import { Style } from '../../../text/style';
import { rgbT, styleSwitchesT } from '../../../text/styleTypes';

type paletteT = {
  color?: {
    info?: rgbT;
    infoDelimiter?: rgbT;
    remark?: rgbT;
    value?: rgbT;
    unvalue?: rgbT;
    key?: rgbT;
    keyDelimiter?: rgbT;
    enumerable?: {
      arm?: rgbT;
      keyBrackets?: rgbT;
    };
    iterable?: {
      arm?: rgbT;
      keyBrackets?: rgbT;
    };
    single?: {
      arm?: rgbT;
      keyBrackets?: rgbT;
    };
    dead?: {
      arm?: rgbT;
      keyBrackets?: rgbT;
      elipsis?: rgbT;
      circularReference?: rgbT;
    };
  };
};

const safeAnsiPalette: paletteT = {
  color: {
    info: {r: 162, g: 138, b: 49},
    infoDelimiter: {r: 162 / 2, g: 138 / 2, b: 49 / 2},
    remark: {r: 255, g: 128, b: 0},
    value: {r: 225, g: 225, b: 225},
    unvalue: {r: 225, g: 225, b: 128},
    keyDelimiter: {r: 64, g: 64, b: 64},
    key: {r: 128, g: 128, b: 128},

    enumerable: {
      arm: {r: 0 + 16, g: 128 - 48, b: 0 + 16},
      keyBrackets: {r: 64, g: 255 - 48, b: 64},
    },
    iterable: {
      arm: {r: 0 + 32, g: 0 + 48, b: 128 - 16},
      keyBrackets: {r: 64 - 16, g: 64 + 0, b: 255},
    },
    single: {
      arm: {r: 64, g: 64, b: 64},
      keyBrackets: {r: 128, g: 128, b: 128},
    },
    dead: {
      arm: {r: 128, g: 0, b: 0},
      keyBrackets: {r: 255, g: 64, b: 64},
      elipsis: {r: 128, g: 128, b: 128 },
      circularReference: {r: 192, g: 64, b: 64 },
    },
  },
};

function styleIfNeed(foreground?: rgbT, background?: rgbT, styleSwatches?: styleSwitchesT): Style | undefined {
  if (foreground || background || styleSwatches) {
    return new Style(foreground, background, styleSwatches);
  } else {
    return undefined;
  }
}
function buildTheme(palette: paletteT): themeT {
  const theme: themeT = {
    global: {
      visibility: true,
      arm: {
        //commonChars: ['|--', '|  ', 'L--',],
        commonChars: ['├──', '│  ', '└──',],
        width: {preSpace: 0, arm: 4, postSpace: 0},
      },
      key: {
        style: styleIfNeed(palette.color?.key, undefined, ),
        postdelimiter: {
          line: ': ',
          style: styleIfNeed(palette.color?.keyDelimiter),
        }
      },
      value: {
        style: styleIfNeed(palette.color?.value),
      },
      info: {
        predelimiter: {
          line: ' / ',
          style: styleIfNeed(palette.color?.infoDelimiter, undefined, ),
        },
        style: styleIfNeed(palette.color?.info, undefined, ),
      },
      remark: {
        predelimiter: {
          line: ' * ',
        },
        style: styleIfNeed(palette.color?.remark),
      },
    },
    broad: {
      enumerable: {
        arm: {
          style: styleIfNeed(palette.color?.enumerable?.arm),
        },
        key: {
          prefix: {
            line: '{',
            style: styleIfNeed(palette.color?.enumerable?.keyBrackets, undefined, ),
          },
          postfix: {
            line: '}',
            style: styleIfNeed(palette.color?.enumerable?.keyBrackets, undefined, ),
          },
        },
      },
      iterable: {
        arm: {
          style: styleIfNeed(palette.color?.iterable?.arm),
        },
        key: {
          prefix: {
            line: '[',
            style: styleIfNeed(palette.color?.iterable?.keyBrackets, undefined, ),
          },
          postfix: {
            line: ']',
            style: styleIfNeed(palette.color?.iterable?.keyBrackets, undefined, ),
          },
        },
      },
      single: {
        arm: {
          style: styleIfNeed(palette.color?.single?.arm),
        },
        key: {
          prefix: {
            line: '<',
            style: styleIfNeed(palette.color?.single?.keyBrackets, undefined, ),
          },
          postfix: {
            line: '>',
            style: styleIfNeed(palette.color?.single?.keyBrackets, undefined, ),
          },
        },
      },
      dead: {
        arm: {
          style: styleIfNeed(palette.color?.dead?.arm),
        },
        key: {
          prefix: {
            line: '>',
            style: styleIfNeed(palette.color?.dead?.keyBrackets, undefined, ),
          },
          postfix: {
            line: '<',
            style: styleIfNeed(palette.color?.dead?.keyBrackets, undefined, ),
          },
        },
      },

    },
    fine: {
      dead: {
        elipsis: {
          icon: {
            content: {
              line: '...',
              style: styleIfNeed(palette.color?.dead?.elipsis),
            }
          }
        },
        circularReference: {
          icon: {
            content: {
              line: '>∞<',
              style: styleIfNeed(palette.color?.dead?.circularReference),
            }
          }
        },

      }
    }
  };
  return theme;
}

export const legacy = {
  standart: buildTheme(safeAnsiPalette),
};
