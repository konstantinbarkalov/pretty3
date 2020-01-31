import {Pretty} from '../index';
import { AnsiRenderer } from '../text/renderer/implementation/ansi';


import tree from './input05';
import { smart, mods } from '../pretty/theme/themes';
//import tree from './input06';
//import tree from './example01';

const maxItemsPerLevel = [30, 10]; // 3;
const maxLevel = 5; // 2;
const maxLineWidth = 80;
const renderer = new AnsiRenderer();
console.log('-----');
const pretty = new Pretty([smart.richFonts, mods.noSimplestIcon]);
pretty.print(tree, {maxItemsPerLevel, maxLevel, maxLineWidth, renderer});
