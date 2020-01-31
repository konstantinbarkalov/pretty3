import { themeT } from '../../interfaces/theme';
import { Style } from '../../../text/style';

const palette = {
  red: {r: 255, g: 0, b: 0},
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
  enumerable: {
    bright: {r: 130, g: 240, b: 130},
    main: {r: 100, g: 160, b: 100},
    dim: {r: 60, g: 90, b: 60},
  },
  iterarable: {
    bright: {r: 130, g: 130, b: 240},
    main: {r: 100, g: 100, b: 160},
    dim: {r: 60, g: 60, b: 90},
  },
  single: {
    bright: {r: 200, g: 200, b: 200},
    main: {r: 130, g: 130, b: 130},
    dim: {r: 80, g: 80, b: 80},
  },
  dead: {
    bright: {r: 240, g: 130, b: 130 },
    main: {r: 160, g: 100, b: 100 },
    dim: {r: 90, g: 60, b: 60 },
  },
};

export const theme: themeT = {
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
      style: new Style(palette.red),
    },
    info: {
      predelimiter: {
        line: ' / ',
      }
    },
    remark: {
      predelimiter: {
        line: ' * ',
      }
    },
  },
  broad: {
    enumerable: {
      arm: {
        commonChars: ['├─╸', '│  ', '└─╸',],
        width: 3,
        style: new Style(palette.enumerable.dim),
      },
      icon: {
        content: {
          line: '{ }',
        },
        style: new Style(palette.enumerable.bright),
      },
      key: {
        style: new Style(palette.enumerable.main),
      },
    },
    iterable: {
      arm: {
        commonChars: ['├─╴', '│  ', '╰─╴',],
        width: 3,
        style: new Style(palette.iterarable.dim),
      },
      icon: {
        content: {
          line: '[ ]',
        },
        style: new Style(palette.iterarable.bright),
      },
      key: {
        style: new Style(palette.iterarable.main),
      },
    },
    single: {
      arm: {
        commonChars: ['├─╴', '│  ', '└─╴',],
        width: 3,
        style: new Style(palette.single.dim),
      },
      icon: {
        content: {
          line: '< >',
        },
        style: new Style(palette.single.bright),
      },
      key: {
        style: new Style(palette.single.main),
      },
    },
    dead: {
      arm: {
        commonChars: ['├─╴', '│  ', '╰─╴',], // TODO
        width: 3,
        style: new Style(palette.dead.dim),
      },
      icon: {
        content: {
          line: '> <',
        },
        style: new Style(palette.dead.bright),
      },
      key: {
        style: new Style(palette.dead.main),
      },
    },

  },
  fine: {
    dead: {
      circularReference: {},
      elipsis: {},
    },
    iterable: {
      array: {
        key: {
          //style: new Style({r: 0, g: 200, b: 0}),
          content: {
            //style: new Style({r: 0, g: 255, b: 0}),
          }
        }
      }
    }
  },
};