'use strict';
const eol = '\n';
const richInputFn = function getData() {
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
  return {
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
}
const mediumInputFn = function getData() {
  return {
    longText: 'GitHub is home to over 40 million developers working together to host and review code, manage projects, and build software together. Since question was regarding clunkiness of property checking, and one regular usecase for that being validation of function argument options objects, thought I\'d mention a library-free short way of testing existence of multiple properties. Disclaimer: It does require ECMAScript 5 (but IMO anyone still using IE8 deserves a broken web).',
    maynardBirthDate: new Date('1964-04-17'),
    someSymbol: Symbol('Fortune'),
    capitalCityMap: new Map([['Canada', 'Ottawa'], ['Iceland', 'Reykjavík']]),
    regularArray: [0, 0.25, 0.5, { wow: 'surprize! there is is an object among numbers' }, 0.75],
    funError: new RangeError('Pizza size is too big'),
  };
}
const longInputFn = function getData() {
  return {
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
}

const simpleInputFn = function getData() {
  return {
    feeling: 'love',
    infinity: Infinity,
    pi: Math.PI,
    e: Math.E,
  };
}



const predefinedInputData = {
  simple: {
    fn: simpleInputFn,
    source: simpleInputFn.toString(),
  },
  medium: {
    fn: mediumInputFn,
    source: mediumInputFn.toString(),
  },
  long: {
    fn: longInputFn,
    source: longInputFn.toString(),
  },
  rich: {
    fn: richInputFn,
    source: richInputFn.toString(),
  },
};

