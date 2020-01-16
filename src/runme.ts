import pretty from '../src/index';
import * as fs from 'fs';
import { AnsiRenderer } from './text/renderer/implementation/ansi';
import { HtmlRenderer } from './text/renderer/implementation/html';
import { PlainRenderer } from './text/renderer/implementation/plain';

export class ExpampleIterator implements Iterator<string> {
  message: string[];
  constructor(message: string) {
    this.message = message.split(', ');
  }
  next(): IteratorResult<string> {
    return {
      value: this.message.pop()!,
      done: (this.message.length === 0),
    }
  }
}
class ExpampleIterable implements Iterable<string> {
  constructor(private message:string) { };
  [Symbol.iterator](): Iterator<string> {
    return new ExpampleIterator(this.message);
  }
  toString() {
    return 'The olimpic motto is:' + this.message;
  }
}
let weakHepler1 = {};
let weakHepler2 = {};
const tree = {
  simpleText: 'Hello my friend!',
  objectedText: new String('Friend of mine, hello.'),
  nowDate: new Date(),
  someSymbol: Symbol('Fortune'),
  myLongText: 'GitHub is home to over 40 million developers working together to host and review code, manage projects, and build software together. Since question was regarding clunkiness of property checking, and one regular usecase for that being validation of function argument options objects, thought I\'d mention a library-free short way of testing existence of multiple properties. Disclaimer: It does require ECMAScript 5 (but IMO anyone still using IE8 deserves a broken web).',
  capitalCityMap: new Map([['Canada', 'Ottawa'], ['Iceland', 'Reykjavík']]),
  regularArray: [0, 0.25, 0.5, {wow: 'surprize! there is is an object among numbers'}, 0.75],
  powersOfTwoTypedArray: new Uint8ClampedArray([1, 2, 4, 8, 16, 32, 64, 128]),
  phrasedWeakMap: new WeakMap([[weakHepler1, 'so anemic...'], [weakHepler2, 'so fragile...']]),
  jackpotSet: new Set([ 4, 8, 15, 16, 23, 42]),
  olympicIterable: new ExpampleIterable('Citius, Altius, Fortius!'),
  longUnbreakebleText: 'yaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaarrr!',
  arbitraryLib: fs,
}
const ansiRenderer = new AnsiRenderer();
const htmlRenderer = new HtmlRenderer();
const plainRenderer = new PlainRenderer();
const stringifyOptions = {maxItemsAtLevel: 15};
const ansiOutput = pretty.stringifyTree(tree, ansiRenderer, stringifyOptions);
const htmlOutput = pretty.stringifyTree(tree, htmlRenderer, stringifyOptions);
const plainOutput = pretty.stringifyTree(tree, plainRenderer, stringifyOptions);

fs.writeFileSync('tree.html', htmlOutput, 'utf8');
fs.writeFileSync('tree.txt', plainOutput, 'utf8');
console.log(ansiOutput);


