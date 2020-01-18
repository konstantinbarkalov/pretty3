import pretty from '../index';
import * as fs from 'fs';
import { AnsiRenderer } from '../text/renderer/implementation/ansi';
import { HtmlRenderer } from '../text/renderer/implementation/html';
import { PlainRenderer } from '../text/renderer/implementation/plain';
import tree from './input05';
//import tree from './example01';
const ansiRenderer = new AnsiRenderer();
const htmlRenderer = new HtmlRenderer();
const plainRenderer = new PlainRenderer();
const ansiOutput = pretty.stringifyTree(tree, {renderer: ansiRenderer});
const htmlOutput = pretty.stringifyTree(tree, {renderer: htmlRenderer});
const plainOutput = pretty.stringifyTree(tree, {renderer: plainRenderer});
fs.writeFileSync('./src/dev/output/tree.ansi', ansiOutput, 'utf8');
fs.writeFileSync('./src/dev/output/tree.html', htmlOutput, 'utf8');
fs.writeFileSync('./src/dev/output/tree.txt', plainOutput, 'utf8');
console.log(ansiOutput);