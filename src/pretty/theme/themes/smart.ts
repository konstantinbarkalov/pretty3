import { themeT } from '../../interfaces/theme';
import { Style } from '../../../text/style';

const palette = {
  info: {r: 96, g: 80, b: 96},
  remark: {r: 255, g: 128, b: 0},
  value: {r: 225, g: 225, b: 225},
  unvalue: {r: 180, g: 180, b: 120},
  enumerable: {
    //bright: {r: 160, g: 240, b: 160},
    arm: {r: 60, g: 70, b: 60},
    icon: {r: 100, g: 200, b: 100},
    iconCenter: {r: 55, g: 105, b: 55},
    key: {r: 100, g: 200, b: 100},
    keyDelimiter: {r: 60, g: 70, b: 60},
  },
  iterarable: {
    //bright: {r: 160, g: 160, b: 240},
    arm: {r: 60, g: 60, b: 70},
    icon: {r: 100, g: 100, b: 200},
    iconCenter: {r: 55, g: 55, b: 105},
    key: {r: 100, g: 100, b: 200},
    keyDelimiter: {r: 60, g: 60, b: 70},
  },
  single: {
    //bright: {r: 200, g: 200, b: 200},
    arm: {r: 60, g: 60, b: 60},
    icon: {r: 60, g: 60, b: 60},
    iconCenter: {r: 120, g: 120, b: 120},
    key: {r: 120, g: 120, b: 120},
    keyDelimiter: {r: 60, g: 60, b: 60},
  },
  dead: {
    //bright: {r: 240, g: 160, b: 160 },
    arm: {r: 70, g: 60, b: 60 },
    icon: {r: 200, g: 100, b: 100 },
    iconCenter: {r: 105, g: 55, b: 55 },
    key: {r: 200, g: 100, b: 100 },
    keyDelimiter: {r: 70, g: 60, b: 60 },
  },
};

export const smart: themeT = {
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
      style: new Style(palette.value),
    },
    info: {
      predelimiter: {
        line: ' / ',
      },
      style: new Style(palette.info),
    },
    remark: {
      predelimiter: {
        line: ' * ',
      },
      style: new Style(palette.remark),
    },
  },
  broad: {
    enumerable: {
      arm: {
        commonChars: ['├─╸', '│  ', '└─╸',],
        width: 3,
        style: new Style(palette.enumerable.arm),
      },
      icon: {
        prefix: {
          line: '{',
        },
        content: {
          line: ' ',
          style: new Style(palette.enumerable.iconCenter),
        },
        postfix: {
          line: '}',
        },
        style: new Style(palette.enumerable.icon),
      },
      key: {
        style: new Style(palette.enumerable.key),
        postdelimiter: {
          style: new Style(palette.enumerable.keyDelimiter),
        }
      },
    },
    iterable: {
      arm: {
        commonChars: ['├─╴', '│  ', '╰─╴',],
        width: 3,
        style: new Style(palette.iterarable.arm),
      },
      icon: {
        prefix: {
          line: '[',
        },
        content: {
          line: ' ',
          style: new Style(palette.iterarable.iconCenter),
        },
        postfix: {
          line: ']',
        },
        style: new Style(palette.iterarable.icon),
      },
      key: {
        style: new Style(palette.iterarable.key),
        postdelimiter: {
          style: new Style(palette.iterarable.keyDelimiter),
        }
      },
    },
    single: {
      arm: {
        commonChars: ['├─╴', '│  ', '└─╴',],
        width: 3,
        style: new Style(palette.single.arm),
      },
      icon: {
        prefix: {
          line: '<',
        },
        content: {
          line: ' ',
          style: new Style(palette.single.iconCenter),
        },
        postfix: {
          line: '>',
        },
        style: new Style(palette.single.icon),
      },
      key: {
        style: new Style(palette.single.key),
        postdelimiter: {
          style: new Style(palette.single.keyDelimiter),
        }
      },
    },
    dead: {
      arm: {
        commonChars: ['├─╴', '│  ', '╰─╴',], // TODO
        width: 3,
        style: new Style(palette.dead.arm),
      },
      icon: {
        prefix: {
          line: '>',
        },
        content: {
          line: ' ',
          style: new Style(palette.dead.iconCenter),
        },
        postfix: {
          line: '<',
        },
        style: new Style(palette.dead.icon),
      },
      key: {
        style: new Style(palette.dead.key),
        postdelimiter: {
          style: new Style(palette.dead.keyDelimiter),
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
          content: {
            line: '.',
          }
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
          style: new Style(palette.unvalue)
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
          style: new Style(palette.unvalue)
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
          }
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
          }
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