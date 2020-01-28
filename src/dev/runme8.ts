import {prettyOld, pretty} from '../index';
import { AnsiRenderer } from '../text/renderer/implementation/ansi';
//import tree from './input05';
import tree from './input06';
//import tree from './example01';

const ansiRenderer = new AnsiRenderer();
const ansiOutput = prettyOld.stringifyTree(tree, {renderer: ansiRenderer, maxItemsPerLevel: 3, maxLevel: 2});
console.log(ansiOutput);
console.log('-----');
pretty.print(tree, {maxItemsPerLevel: 3, maxLevel: 2});
