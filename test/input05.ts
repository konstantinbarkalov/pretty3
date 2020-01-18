import fs from 'fs';

class ExpampleIterator implements Iterator<string> {
  message: string[];
  constructor(message: string) {
    this.message = message.split(', ');
  }
  next(): IteratorResult<string> {
    return {
      value: this.message.pop()!,
      done: (this.message.length === 0),
    };
  }
}
class ExpampleIterable implements Iterable<string> {
  constructor(private message: string) { }
  [Symbol.iterator](): Iterator<string> {
    return new ExpampleIterator(this.message);
  }
  toString(): string {
    return 'The olimpic motto is:' + this.message;
  }
}
const weakHepler1 = {};
const weakHepler2 = {};
const longArray = [];
for (let i = 0; i < 1000; i++) {
  longArray[i] = i * 10;
}
export default {
  simpleText: 'Hello my friend!',
  objectedText: new String('Friend of mine, hello.'),
  maynardBirthDate: new Date('1964-04-17'),
  someSymbol: Symbol('Fortune'),
  longText: 'GitHub is home to over 40 million developers working together to host and review code, manage projects, and build software together. Since question was regarding clunkiness of property checking, and one regular usecase for that being validation of function argument options objects, thought I\'d mention a library-free short way of testing existence of multiple properties. Disclaimer: It does require ECMAScript 5 (but IMO anyone still using IE8 deserves a broken web).',
  capitalCityMap: new Map([['Canada', 'Ottawa'], ['Iceland', 'Reykjavík']]),
  regularArray: [0, 0.25, 0.5, {wow: 'surprize! there is is an object among numbers'}, 0.75],
  powersOfTwoTypedArray: new Uint8ClampedArray([1, 2, 4, 8, 16, 32, 64, 128]),
  phrasedWeakMap: new WeakMap([[weakHepler1, 'so anemic...'], [weakHepler2, 'so fragile...']]),
  jackpotSet: new Set([ 4, 8, 15, 16, 23, 42]),
  olympicIterable: new ExpampleIterable('Citius, Altius, Fortius!'),
  longArray: longArray,
  proxiedLongArray: new Proxy(longArray, {}),
  funError: new RangeError('Pizza size is too big'),
  longUnbreakebleText: 'yaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaarrr!',
  silence: '',
  '': 'with no key',
  666:'with number key',
  [777]:'with number key too',
  [Symbol('Luck')]:'with luck symbol key',
  emptyObject: {},
  fate: null,
  rock: true,
  rap: false,
  whyWeAreHere: undefined,
  arbitraryLib: fs,
};