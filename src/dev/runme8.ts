import {prettyOld, Pretty} from '../index';
import { AnsiRenderer } from '../text/renderer/implementation/ansi';
//import { theme } from '../pretty/theme/themes/smart';

import tree from './input05';
//import tree from './input06';
//import tree from './example01';

const maxItemsPerLevel = [30, 10]; // 3;
const maxLevel = 5; // 2;

const ansiRenderer = new AnsiRenderer();
const ansiOutput = prettyOld.stringifyTree(tree, {renderer: ansiRenderer, maxItemsPerLevel, maxLevel});
console.log(ansiOutput);
console.log('-----');
const pretty = new Pretty([]);
pretty.print(tree, {maxItemsPerLevel, maxLevel});
