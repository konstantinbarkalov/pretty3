import pretty from '../src/index';
import * as fs from 'fs';
import { AnsiRenderer } from './sml4/renderer/implementation/ansi';
import { HtmlRenderer } from './sml4/renderer/implementation/html';
import { PlainRenderer } from './sml4/renderer/implementation/plain';

let weakHepler = {};
const tree = {
  simpleText: 'hello my friend',
  nowDate: new Date(),
  mySymbol: Symbol(),
  myLongText: 'GitHub is home to over 40 million developers working together to host and review code, manage projects, and build software together. Since question was regarding clunkiness of property checking, and one regular usecase for that being validation of function argument options objects, thought I\'d mention a library-free short way of testing existence of multiple properties. Disclaimer: It does require ECMAScript 5 (but IMO anyone still using IE8 deserves a broken web).',
  myMap: new Map([['a', 'abc'], ['A', 'ABC']]),
  myArray: [0, 0.25, 0.5, {wow: 'surprize!'}, 0.75],
  myTypedArray: new Uint8ClampedArray([0, 64, 128, 192]),
  myWeakMap: new WeakMap([[weakHepler, 'so weak...']]),
  mySet: new Set([11, 22, 33]),
  myLongUnbreakebleText: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  thaLib: fs,
}
const ansiRenderer = new AnsiRenderer();
const htmlRenderer = new HtmlRenderer();
const plainRenderer = new PlainRenderer();
const ansiOutput = pretty.stringifyTree(tree, ansiRenderer);
const htmlOutput = pretty.stringifyTree(tree, htmlRenderer);
const plainOutput = pretty.stringifyTree(tree, plainRenderer);

fs.writeFileSync('tree.html', htmlOutput, 'utf8');
fs.writeFileSync('tree.txt', plainOutput, 'utf8');
console.log(ansiOutput);


