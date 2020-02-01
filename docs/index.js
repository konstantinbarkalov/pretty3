class ExpampleIterator {
  constructor(message) {
    this.message = message.split(', ');
  }
  next() {
    return (this.message.length === 0) ? {
      value: undefined,
      done: true,
    } : {
        value: this.message.pop(),
        done: false,
      };
  }
}
class ExpampleIterable {
  constructor(message) {
    this.message = message;
  }
  [Symbol.iterator]() {
    return new ExpampleIterator(this.message);
  }
  toString() {
    return 'The olimpic motto is:' + this.message;
  }
}
const weakHepler1 = {};
const weakHepler2 = {};
const longArray = [];
for (let i = 0; i < 1000; i++) {
  longArray[i] = i * 10;
}
const richTree = {
  simpleText: 'Hello my friend!',
  objectedText: new String('Friend of mine, hello.'),
  maynardBirthDate: new Date('1964-04-17'),
  someSymbol: Symbol('Fortune'),
  longText: 'GitHub is home to over 40 million developers working together to host and review code, manage projects, and build software together. Since question was regarding clunkiness of property checking, and one regular usecase for that being validation of function argument options objects, thought I\'d mention a library-free short way of testing existence of multiple properties. Disclaimer: It does require ECMAScript 5 (but IMO anyone still using IE8 deserves a broken web).',
  capitalCityMap: new Map([['Canada', 'Ottawa'], ['Iceland', 'Reykjavík']]),
  regularArray: [0, 0.25, 0.5, { wow: 'surprize! there is is an object among numbers' }, 0.75],
  powersOfTwoTypedArray: new Uint8ClampedArray([1, 2, 4, 8, 16, 32, 64, 128]),
  phrasedWeakMap: new WeakMap([[weakHepler1, 'so anemic...'], [weakHepler2, 'so fragile...']]),
  jackpotSet: new Set([4, 8, 15, 16, 23, 42]),
  olympicIterable: new ExpampleIterable('Citius, Altius, Fortius!'),
  longArray: longArray,
  proxiedLongArray: new Proxy(longArray, {}),
  funError: new RangeError('Pizza size is too big'),
  longUnbreakebleText: 'yaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaarrr!',
  silence: '',
  '': 'with no key',
  666: 'with number key',
  [777]: 'with number key too',
  [Symbol('Luck')]: 'with luck symbol key',
  emptyObject: {},
  fate: null,
  rock: true,
  rap: false,
  whyWeAreHere: undefined,
  loneHtmlElement: document.createElement('div'),
};


const mediumTree = {
  longText: 'GitHub is home to over 40 million developers working together to host and review code, manage projects, and build software together. Since question was regarding clunkiness of property checking, and one regular usecase for that being validation of function argument options objects, thought I\'d mention a library-free short way of testing existence of multiple properties. Disclaimer: It does require ECMAScript 5 (but IMO anyone still using IE8 deserves a broken web).',
  maynardBirthDate: new Date('1964-04-17'),
  someSymbol: Symbol('Fortune'),
  capitalCityMap: new Map([['Canada', 'Ottawa'], ['Iceland', 'Reykjavík']]),
  regularArray: [0, 0.25, 0.5, { wow: 'surprize! there is is an object among numbers' }, 0.75],
  funError: new RangeError('Pizza size is too big'),
};
const longTree = {
  'single': 1,
  'list': ['Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ', 'Η', 'Θ', 'Ι', 'Κ', 'Λ', 'Μ', 'Ν', 'Ξ', 'Ο', 'Π', 'Ρ', 'Σ', 'Τ', 'Υ', 'Φ', 'Χ', 'Ψ', 'Ω'],
  'dictionary': {
    'α': 'alpha',
    'β': 'beta',
    'γ': 'gamma',
    'δ': 'delta',
    'ε': 'epsilon',
    'ζ': 'zeta',
    'η': 'eta',
    'θ': 'theta',
    'ι': 'iota',
    'κ': 'kappa',
    'λ': 'la',
    'μ': 'mu',
    'ν': 'nu',
    'ξ': 'xi',
    'ο': 'omicron',
    'π': 'pi',
    'ρ': 'rho',
    'σ': 'ς',
    'τ': 'tau',
    'υ': 'upsilon',
    'φ': 'phi',
    'χ': 'chi',
    'ψ': 'psi',
    'ω': 'omega'
  },
};

const simpleTree = {
  feeling: 'love',
  infinity: Infinity,
  pi: Math.PI,
  e: Math.E,
};

(async () => {
  const pretty3Module = await import('https://dev.jspm.io/npm:pretty3@1.0.0-alpha.1');
  const Pretty = pretty3Module.default.Pretty;
  const themes = pretty3Module.default.themes;
  const renderers = pretty3Module.default.renderers;


  const data = {
    'simple': simpleTree,
    'medium': mediumTree,
    'long': longTree,
    'rich': richTree,
  };
  const themeStack = {
    'default': {
      'standart': [themes.defaultTheme],
    },
    'smart': {
      'standart': [themes.smart.standart],
      'safe ansi': [themes.smart.safeAnsi],
      'rich fonts': [themes.smart.richFonts],
    },
    'smart with no simple icons': {
      'standart': [themes.smart.standart, themes.mods.noSimpleIcon],
      'safe ansi': [themes.smart.safeAnsi, themes.mods.noSimpleIcon],
      'rich fonts': [themes.smart.richFonts, themes.mods.noSimpleIcon],
    },
  };

  const renderer = new renderers.HtmlRenderer();
  const demoScreenTextDiv = document.getElementById('demo-screen-text');
  const select = {
    theme: document.getElementById('dropdown-select--theme'),
    data: document.getElementById('dropdown-select--data'),
    palette: document.getElementById('dropdown-select--palette'),
  };
  const selectedKey = {
    data: undefined,
    theme: undefined,
    palette: undefined,
  };

  function initSelect(selectKey, options) {
    const currentSelect = select[selectKey];
    while (currentSelect.firstChild) {
      currentSelect.removeChild(currentSelect.firstChild);
    }
    Object.keys(options).forEach((key) => {
      const option = document.createElement('option');
      option.value = key;
      option.innerText = key; // whatever property it has
      // then append it to the select element
      currentSelect.appendChild(option);
    });
    readSelectedKeyFromNode(selectKey);
  }

  function initSelects() {
    initSelect('data', data);
    initSelect('theme', themeStack);
    const paletteKey = Object.keys(themeStack)[0];
    initSelect('palette', themeStack[paletteKey]);
  }
  function readSelectedKeyFromNode(selectKey) {
    const currentSelect = select[selectKey];
    selectedKey[selectKey] = currentSelect.options[currentSelect.selectedIndex].value;
  }
  function writeSelectedKeyToNode(selectKey) {
    const currentSelect = select[selectKey];
    currentSelect.value = selectedKey[selectKey];
  }

  select.data.onchange = () => {
    readSelectedKeyFromNode('data');
    updateScreenText();
  };
  select.theme.onchange = () => {
    readSelectedKeyFromNode('theme');
    initSelect('palette', themeStack[selectedKey.theme]);
    updateScreenText();
  };
  select.palette.onchange = () => {
    readSelectedKeyFromNode('palette');
    updateScreenText();
  };

  function updateScreenText() {
    const selectedData = data[selectedKey.data];
    const selectedThemeStackSet = themeStack[selectedKey.theme];
    const selectedThemeStack = selectedThemeStackSet[selectedKey.palette];
    const options = {
      themeStack: selectedThemeStack,
      renderer,
    };
    demoScreenTextDiv.innerHTML = Pretty.stringify(selectedData, options);
  }

  initSelects();
  updateScreenText();


})();