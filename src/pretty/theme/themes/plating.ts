import { themeT } from '../../interfaces/theme';
import { Style } from '../../../text/style';
import { rgbT, styleSwitchesT } from '../../../text/styleTypes';
import { vibrance, gammaCorrect, gainLuminosity } from '../rgbUtils';

type paletteT = {
  color?: {
    remark?: rgbT;
    value?: rgbT;
    unvalue?: rgbT;
    valueTrue: rgbT;
    valueFalse: rgbT;
    enumerable?: {
      arm?: rgbT;
      icon?: rgbT;
      iconAccent?: rgbT;
      keyBackground?: rgbT;
      keyForeground?: rgbT;
      iconBackground?: rgbT;
      iconForeground?: rgbT;
      keyDelimiter?: rgbT;
      info?: rgbT;
    };
    iterable?: {
      arm?: rgbT;
      icon?: rgbT;
      iconAccent?: rgbT;
      keyBackground?: rgbT;
      keyForeground?: rgbT;
      iconBackground?: rgbT;
      iconForeground?: rgbT;
      keyDelimiter?: rgbT;
      info?: rgbT;
    };
    single?: {
      arm?: rgbT;
      icon?: rgbT;
      iconAccent?: rgbT;
      keyBackground?: rgbT;
      keyForeground?: rgbT;
      iconBackground?: rgbT;
      iconForeground?: rgbT;
      keyDelimiter?: rgbT;
      info?: rgbT;
    };
    dead?: {
      arm?: rgbT;
      icon?: rgbT;
      iconAccent?: rgbT;
      keyBackground?: rgbT;
      keyForeground?: rgbT;
      iconBackground?: rgbT;
      iconForeground?: rgbT;
      keyDelimiter?: rgbT;
      info?: rgbT;
      elipsis?: rgbT;
    };
  };
  styleSwatches?: {
    key?: styleSwitchesT;
    info?: styleSwitchesT;
  };
};
type basePaletteT = {
  emphasis: {
    gamma: number;
    vibrance: number;
  };
  dim: {
    gamma: number;
    vibrance: number;
  };
  enumerable: {
    color: rgbT;
    counterColor: rgbT;
  };
  iterable: {
    color: rgbT;
    counterColor: rgbT;
  };
  single: {
    color: rgbT;
    counterColor: rgbT;
  };
  dead: {
    color: rgbT;
    counterColor: rgbT;
  };
}
const standartPalette: basePaletteT = {
  enumerable: {
    color: {r: 50, g: 140, b: 50},
    counterColor: {r: 0, g: 0, b: 0},

  },
  iterable: {
    color: {r: 100, g: 100, b: 200},
    counterColor: {r: 0, g: 0, b: 0},
  },

  single: {
    color: {r: 40, g: 40, b: 40},
    counterColor: {r: 96, g: 96, b: 96},
  },
  dead: {
    color: {r: 200, g: 100, b: 100},
    counterColor: {r: 0, g: 0, b: 0},
  },
  dim: {
    gamma: 0.6,
    vibrance: 0.6
  },
  emphasis: {
    gamma: 0.75,
    vibrance: 1.2
  },
};

const cutePalette: basePaletteT = {
  enumerable: {
    color: {r: 45, g: 145, b: 65},
    counterColor: {r: 0, g: 0, b: 0},

  },
  iterable: {
    color: {r: 70, g: 130, b: 180},
    counterColor: {r: 0, g: 0, b: 0},
  },

  single: {
    color: {r: 40, g: 42, b: 44},
    counterColor: {r: 97, g: 96, b: 95},
  },
  dead: {
    color: {r: 200, g: 140, b: 60},
    counterColor: {r: 0, g: 0, b: 0},
  },
  dim: {
    gamma: 0.6,
    vibrance: 0.6
  },
  emphasis: {
    gamma: 0.75,
    vibrance: 1.2
  },
};

const alternativePalette: basePaletteT = {
  enumerable: {
    color: gainLuminosity({r: 65, g: 56, b: 99}, 1.25),
    counterColor: {r: 0, g: 0, b: 0},

  },
  iterable: {
    color: gainLuminosity({r: 99, g: 60, b: 40}, 1.2),
    counterColor: {r: 0, g: 0, b: 0},
  },

  single: {
    color: {r: 35, g: 36, b: 32},
    counterColor: {r: 110, g: 120, b: 105},
  },
  dead: {
    color: {r: 140, g: 33, b: 11},
    counterColor: {r: 0, g: 0, b: 0},
  },
  dim: {
    gamma: 1,
    vibrance: 1
  },
  emphasis: {
    gamma: 1.2,
    vibrance: 1.3
  },
};
function styleIfNeed(foreground?: rgbT, background?: rgbT, styleSwatches?: styleSwitchesT): Style | undefined {
  if (foreground || background || styleSwatches) {
    return new Style(foreground, background, styleSwatches);
  } else {
    return undefined;
  }
}
function buildTheme(basePalette: basePaletteT): themeT {

  const palette: paletteT = {
    color: {
      remark: {r: 255, g: 128, b: 0},
      value: {r: 208, g: 208, b: 208},
      unvalue: {r: 180, g: 180, b: 120},
      valueTrue: {r: 192, g: 225, b: 192},
      valueFalse: {r: 225, g: 192, b: 192},
      enumerable: {
        arm: vibrance(gammaCorrect(basePalette.enumerable.color, basePalette.dim.gamma), basePalette.dim.vibrance),
        iconForeground: basePalette.enumerable.counterColor,
        iconBackground: vibrance(gammaCorrect(basePalette.enumerable.color, basePalette.emphasis.gamma), basePalette.emphasis.vibrance),
        keyForeground: basePalette.enumerable.counterColor,
        keyBackground: basePalette.enumerable.color,
        keyDelimiter: basePalette.enumerable.color,
        info: vibrance(gammaCorrect(basePalette.enumerable.color, basePalette.dim.gamma), basePalette.dim.vibrance),
      },
      iterable: {
        arm: vibrance(gammaCorrect(basePalette.iterable.color, basePalette.dim.gamma), basePalette.dim.vibrance),
        iconForeground: basePalette.iterable.counterColor,
        iconBackground: vibrance(gammaCorrect(basePalette.iterable.color, basePalette.emphasis.gamma), basePalette.emphasis.vibrance),
        keyForeground: basePalette.iterable.counterColor,
        keyBackground: basePalette.iterable.color,
        keyDelimiter: basePalette.iterable.color,
        info: vibrance(gammaCorrect(basePalette.iterable.color, basePalette.dim.gamma), basePalette.dim.vibrance),
      },
      single: {
        arm: vibrance(gammaCorrect(basePalette.single.color, basePalette.dim.gamma), basePalette.dim.vibrance),
        iconForeground: basePalette.single.counterColor,
        iconBackground: vibrance(gammaCorrect(basePalette.single.color, basePalette.emphasis.gamma), basePalette.emphasis.vibrance),
        keyForeground: basePalette.single.counterColor,
        keyBackground: basePalette.single.color,
        keyDelimiter: basePalette.single.color,
        info: vibrance(gammaCorrect(basePalette.single.color, basePalette.dim.gamma), basePalette.dim.vibrance),
      },
      dead: {
        arm: vibrance(gammaCorrect(basePalette.dead.color, basePalette.dim.gamma), basePalette.dim.vibrance),
        iconForeground: basePalette.dead.counterColor,
        iconBackground: vibrance(gammaCorrect(basePalette.dead.color, basePalette.emphasis.gamma), basePalette.emphasis.vibrance),
        keyForeground: basePalette.dead.counterColor,
        keyBackground: basePalette.dead.color,
        keyDelimiter: basePalette.dead.color,
        info: vibrance(gammaCorrect(basePalette.dead.color, basePalette.dim.gamma), basePalette.dim.vibrance),
        elipsis: {r: 80, g: 80, b: 80 },
      },
    },
  };

  const theme: themeT = {
    global: {
      visibility: true,
      arm: {
        width: {preSpace: 1, arm: 3, postSpace: 0},
      },
      icon: {
        prefix: {
          line: ' ',
        },
        postfix: {
          line: ' ',
        },
      },
      key: {
        prefix: {
          line: ' ',
        },
        postfix: {
          line: ' ',
        },
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
      },
      remark: {
        predelimiter: {
          line: ' · ',
        },
        style: styleIfNeed(palette.color?.remark),
      },
    },
    broad: {
      enumerable: {
        arm: {
          commonChars: ['├──', '│  ', '╰──',],
          style: styleIfNeed(palette.color?.enumerable?.arm),
        },
        info: {
          style: styleIfNeed(palette.color?.enumerable?.info, undefined, palette.styleSwatches?.info),
        },
        icon: {
          style: styleIfNeed(palette.color?.enumerable?.iconForeground, palette.color?.enumerable?.iconBackground),
        },
        key: {
          style: styleIfNeed(palette.color?.enumerable?.keyForeground, palette.color?.enumerable?.keyBackground, palette.styleSwatches?.key),
          postdelimiter: {
            style: styleIfNeed(palette.color?.enumerable?.keyDelimiter),
          }
        },
      },
      iterable: {
        arm: {
          commonChars: ['├─━', '│  ', '└─━',],
          style: styleIfNeed(palette.color?.iterable?.arm),
        },
        info: {
          style: styleIfNeed(palette.color?.iterable?.info, undefined, palette.styleSwatches?.info),
        },
        icon: {
          style: styleIfNeed(palette.color?.iterable?.iconForeground, palette.color?.iterable?.iconBackground),
        },
        key: {
          style: styleIfNeed(palette.color?.iterable?.keyForeground, palette.color?.iterable?.keyBackground, palette.styleSwatches?.key),
          postdelimiter: {
            style: styleIfNeed(palette.color?.iterable?.keyDelimiter),
          }
        },
      },
      single: {
        arm: {
          commonChars: ['├─╴', '│  ', '└─╴',],
          style: styleIfNeed(palette.color?.single?.arm),
        },
        info: {
          style: styleIfNeed(palette.color?.single?.info, undefined, palette.styleSwatches?.info),
        },
        icon: {
          style: styleIfNeed(palette.color?.single?.iconForeground, palette.color?.single?.iconBackground),
        },
        key: {
          style: styleIfNeed(palette.color?.single?.keyForeground, palette.color?.single?.keyBackground, palette.styleSwatches?.key),
          postdelimiter: {
            style: styleIfNeed(palette.color?.single?.keyDelimiter),
          }
        },
      },
      dead: {
        arm: {
          commonChars: ['├─╴', '│  ', '╰─╴',], // TODO
          style: styleIfNeed(palette.color?.dead?.arm),
        },
        info: {
          style: styleIfNeed(palette.color?.dead?.info, undefined, palette.styleSwatches?.info),
        },
        icon: {
          style: styleIfNeed(palette.color?.dead?.iconForeground, palette.color?.dead?.iconBackground),
        },
        key: {
          style: styleIfNeed(palette.color?.dead?.keyForeground, palette.color?.dead?.keyBackground, palette.styleSwatches?.key),
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

        booleanTrue: {
          icon: {
            content: {
              line: 'B',
            }
          },
          value: {
            style: styleIfNeed(palette.color?.valueTrue),
          }
        },

        booleanFalse: {
          icon: {
            content: {
              line: 'B',
            }
          },
          value: {
            style: styleIfNeed(palette.color?.valueFalse),
          }
        },

        booleanObjectTrue: {
          icon: {
            content: {
              line: 'B',
            }
          },
          value: {
            style: styleIfNeed(palette.color?.valueTrue),
          }
        },

        booleanObjectFalse: {
          icon: {
            content: {
              line: 'B',
            }
          },
          value: {
            style: styleIfNeed(palette.color?.valueFalse),
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
            style: styleIfNeed(palette.color?.unvalue),
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
            style: styleIfNeed(palette.color?.unvalue),
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
            },
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
            },
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

export const plating = {
  standart: buildTheme(standartPalette),
  cute: buildTheme(cutePalette),
  alternative: buildTheme(alternativePalette),
};
