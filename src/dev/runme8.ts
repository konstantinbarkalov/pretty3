import {prettyOld, Pretty} from '../index';
import { AnsiRenderer } from '../text/renderer/implementation/ansi';
import { theme } from '../pretty/theme/themes/smart';
import { theme as nosi } from '../pretty/theme/themes/mods/noSimplestIcon';

import tree from './input05';
//import tree from './input06';
//import tree from './example01';

const maxItemsPerLevel = [30, 10]; // 3;
const maxLevel = 5; // 2;
const maxLineWidth = 80;
const ansiRenderer = new AnsiRenderer();
const ansiOutput = prettyOld.stringifyTree(tree, {renderer: ansiRenderer, maxItemsPerLevel, maxLevel, maxLineWidth});
console.log(ansiOutput);
console.log('-----');
const pretty = new Pretty([theme, nosi]);
pretty.print(tree, {maxItemsPerLevel, maxLevel, maxLineWidth});
