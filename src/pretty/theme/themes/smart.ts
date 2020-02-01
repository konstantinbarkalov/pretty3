import { themeT } from '../../interfaces/theme';
import { Style, StyleSwitches } from '../../../text/style';
import { StyleSwitchesEnum, rgbT, styleSwitchesT } from '../../../text/styleTypes';

type paletteT = {
  color?: {
    info?: rgbT;
    remark?: rgbT;
    value?: rgbT;
    unvalue?: rgbT;
    enumerable?: {
      arm?: rgbT;
      icon?: rgbT;
      iconAccent?: rgbT;
      key?: rgbT;
      keyDelimiter?: rgbT;
    };
    iterable?: {
      arm?: rgbT;
      icon?: rgbT;
      iconAccent?: rgbT;
      key?: rgbT;
      keyDelimiter?: rgbT;
    };
    single?: {
      arm?: rgbT;
      icon?: rgbT;
      iconAccent?: rgbT;
      key?: rgbT;
      keyDelimiter?: rgbT;
    };
    dead?: {
      arm?: rgbT;
      icon?: rgbT;
      iconAccent?: rgbT;
      key?: rgbT;
      keyDelimiter?: rgbT;
      elipsis?: rgbT;
    };
  };
  styleSwatches?: {
    key?: styleSwitchesT;
    info?: styleSwitchesT;
  };
};
const standartPalette: paletteT = {
  color: {
    info: {r: 96, g: 80, b: 96},
    remark: {r: 255, g: 128, b: 0},
    value: {r: 225, g: 225, b: 225},
    unvalue: {r: 180, g: 180, b: 120},
    enumerable: {
      arm: {r: 60, g: 70, b: 60},
      icon: {r: 55, g: 105, b: 55},
      iconAccent: {r: 100, g: 200, b: 100},
      key: {r: 100, g: 200, b: 100},
      keyDelimiter: {r: 60, g: 70, b: 60},
    },
    iterable: {
      arm: {r: 60, g: 60, b: 70},
      icon: {r: 55, g: 55, b: 105},
      iconAccent: {r: 100, g: 100, b: 200},
      key: {r: 100, g: 100, b: 200},
      keyDelimiter: {r: 60, g: 60, b: 70},
    },
    single: {
      arm: {r: 60, g: 60, b: 60},
      icon: {r: 60, g: 60, b: 60},
      iconAccent: {r: 150, g: 150, b: 150},
      key: {r: 100, g: 100, b: 100},
      keyDelimiter: {r: 60, g: 60, b: 60},
    },
    dead: {
      arm: {r: 70, g: 60, b: 60 },
      icon: {r: 200, g: 100, b: 100 },
      iconAccent: {r: 105, g: 55, b: 55 },
      key: {r: 200, g: 100, b: 100 },
      keyDelimiter: {r: 70, g: 60, b: 60 },
      elipsis: {r: 80, g: 80, b: 80 },
    },
  },
};
const safeAnsiPalette: paletteT = {
  color: {
    info: {r: 128, g: 64, b: 128},
    remark: {r: 255, g: 128, b: 0},
    value: {r: 192, g: 192, b: 192},
    unvalue: {r: 192, g: 192, b: 128},
    enumerable: {
      arm: {r: 0, g: 128, b: 0},
      icon: {r: 64, g: 128, b: 64},
      iconAccent: {r: 64, g: 255, b: 64},
      key: {r: 64, g: 255, b: 64},
      keyDelimiter: {r: 0, g: 64, b: 0},
    },
    iterable: {
      arm: {r: 0, g: 0, b: 128},
      icon: {r: 64, g: 64, b: 128},
      iconAccent: {r: 64, g: 64, b: 255},
      key: {r: 64, g: 64, b: 255},
      keyDelimiter: {r: 0, g: 0, b: 64},
    },
    single: {
      arm: {r: 64, g: 64, b: 64},
      icon: {r: 64, g: 64, b: 64},
      iconAccent: {r: 192, g: 192, b: 192},
      key: {r: 128, g: 128, b: 128},
      keyDelimiter: {r: 64, g: 64, b: 64},
    },
    dead: {
      arm: {r: 128, g: 0, b: 0},
      icon: {r: 128, g: 64, b: 64},
      iconAccent: {r: 255, g: 64, b: 64},
      key: {r: 255, g: 64, b: 64},
      keyDelimiter: {r: 64, g: 0, b: 0},
      elipsis: {r: 64, g: 64, b: 64 },
    },
  },
};
const richFontsPalette: paletteT = Object.assign({}, standartPalette, {
  styleSwatches: {
    key: new StyleSwitches({ [StyleSwitchesEnum.Bold]: false}),
    info: new StyleSwitches({ [StyleSwitchesEnum.Italic]: true}),
  }
});
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
      icon: {
        postdelimiter: {
          line: ' ',
        }
      },
      key: {
        postdelimiter: {
          line: ': ',
        }
      },
      value: {
        style: styleIfNeed(palette.color?.value),
      },
      info: {
        predelimiter: {
          line: ' · ',
        },
        style: styleIfNeed(palette.color?.info, undefined, palette.styleSwatches?.info),
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
          commonChars: ['├─╴', '│  ', '╰─╴',],
          width: 3,
          style: styleIfNeed(palette.color?.enumerable?.arm),
        },
        icon: {
          prefix: {
            line: '{',
          },
          content: {
            line: ' ',
            style: styleIfNeed(palette.color?.enumerable?.iconAccent),
          },
          postfix: {
            line: '}',
          },
          style: styleIfNeed(palette.color?.enumerable?.icon),
        },
        key: {
          style: styleIfNeed(palette.color?.enumerable?.key, undefined, palette.styleSwatches?.key),
          postdelimiter: {
            style: styleIfNeed(palette.color?.enumerable?.keyDelimiter),
          }
        },
      },
      iterable: {
        arm: {
          commonChars: ['├─╸', '│  ', '└─╸',],
          width: 3,
          style: styleIfNeed(palette.color?.iterable?.arm),
        },
        icon: {
          prefix: {
            line: '[',
          },
          content: {
            line: ' ',
            style: styleIfNeed(palette.color?.iterable?.iconAccent),
          },
          postfix: {
            line: ']',
          },
          style: styleIfNeed(palette.color?.iterable?.icon),
        },
        key: {
          style: styleIfNeed(palette.color?.iterable?.key, undefined, palette.styleSwatches?.key),
          postdelimiter: {
            style: styleIfNeed(palette.color?.iterable?.keyDelimiter),
          }
        },
      },
      single: {
        arm: {
          commonChars: ['├─╴', '│  ', '└─╴',],
          width: 3,
          style: styleIfNeed(palette.color?.single?.arm),
        },
        icon: {
          prefix: {
            line: '<',
          },
          content: {
            line: ' ',
            style: styleIfNeed(palette.color?.single?.iconAccent),
          },
          postfix: {
            line: '>',
          },
          style: styleIfNeed(palette.color?.single?.icon),
        },
        key: {
          style: styleIfNeed(palette.color?.single?.key, undefined, palette.styleSwatches?.key),
          postdelimiter: {
            style: styleIfNeed(palette.color?.single?.keyDelimiter),
          }
        },
      },
      dead: {
        arm: {
          commonChars: ['├─╴', '│  ', '╰─╴',], // TODO
          width: 3,
          style: styleIfNeed(palette.color?.dead?.arm),
        },
        icon: {
          prefix: {
            line: '>',
          },
          content: {
            line: ' ',
            style: styleIfNeed(palette.color?.dead?.iconAccent),
          },
          postfix: {
            line: '<',
          },
          style: styleIfNeed(palette.color?.dead?.icon),
        },
        key: {
          style: styleIfNeed(palette.color?.dead?.key, undefined, palette.styleSwatches?.key),
          postdelimiter: {
            style: styleIfNeed(palette.color?.dead?.keyDelimiter),
          }
        },
      },

    },
    fine: {
      dead: {
        circularReference: {
          icon: {
            content: {
              line: '∞',
            }
          }
        },

        elipsis: {
          icon: {
            prefix: {
              line: '',
            },
            content: {
              line: '...',
            },
            postfix: {
              line: '',
            },
            style: styleIfNeed(palette.color?.dead?.elipsis),
          }
        },

      },
      single: {
        bigInt: {
          icon: {
            content: {
              line: 'I',
            }
          }
        },

        boolean: {
          icon: {
            content: {
              line: 'B',
            }
          }
        },

        booleanObject: {
          icon: {
            content: {
              line: 'B',
            }
          }
        },

        date: {
          icon: {
            content: {
              line: 'D',
            }
          }
        },

        function: {
          icon: {
            content: {
              line: 'F',
            }
          }
        },

        null: {
          icon: {
            content: {
              line: 'X',
            }
          },
          value: {
            style: styleIfNeed(palette.color?.unvalue)
          }
        },

        number: {
          icon: {
            content: {
              line: 'N',
            }
          }
        },

        numberObject: {
          icon: {
            content: {
              line: 'N',
            }
          }
        },

        string: {
          icon: {
            content: {
              line: 'T',
            }
          }
        },

        stringObject: {
          icon: {
            content: {
              line: 'T',
            }
          }
        },

        symbol: {
          icon: {
            content: {
              line: 'S',
            }
          }
        },

        undefined: {
          icon: {
            content: {
              line: ' ',
            }
          },
          value: {
            style: styleIfNeed(palette.color?.unvalue)
          }
        },

        unknown: {
          icon: {
            content: {
              line: '?',
            }
          }
        },

        weakMap: {
          icon: {
            content: {
              line: 'M',
            }
          }
        },

        weakSet: {
          icon: {
            content: {
              line: 'S',
            }
          }
        },

      },
      enumerable: {
        map: {
          icon: {
            content: {
              line: 'M',
            }
          }
        },

        object: {
          icon: {
            content: {
              line: ' ',
              style: styleIfNeed(palette.color?.enumerable?.icon),
            },
            style: styleIfNeed(palette.color?.enumerable?.iconAccent),
          }
        },

        error: {
          icon: {
            content: {
              line: 'E',
            }
          }
        },

        unknown: {
          icon: {
            content: {
              line: '?',
            }
          }
        },

      },
      iterable: {
        array: {
          icon: {
            content: {
              line: ' ',
              style: styleIfNeed(palette.color?.iterable?.icon),
            },
            style: styleIfNeed(palette.color?.iterable?.iconAccent),
          }
        },

        iterable: {
          icon: {
            content: {
              line: 'I',
            }
          }
        },

        set: {
          icon: {
            content: {
              line: 'S',
            }
          }
        },

        typedArray: {
          icon: {
            content: {
              line: 'T',
            }
          }
        },

        unknown: {
          icon: {
            content: {
              line: '?',
            }
          }
        },

      },
    },
  };
  return theme;
}

export const smart = {
  standart: buildTheme(standartPalette),
  safeAnsi: buildTheme(safeAnsiPalette),
  richFonts: buildTheme(richFontsPalette),
};
