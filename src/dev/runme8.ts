import {Pretty} from '../index';
import { AnsiRenderer } from '../text/renderer/implementation/ansi';


import tree from './input05';
//import { smart, plating, mods } from '../pretty/theme/themes';
import { plating } from '../pretty/theme/themes';
//import tree from './input06';
//import tree from './example01';

const maxItemsPerLevel = [30, 10]; // 3;
const maxLevel = 5; // 2;
const maxLineWidth = 80;
const renderer = new AnsiRenderer();
console.log('-----');
const pretty = new Pretty([plating.alternative]); // mods.noSimplestIcon
pretty.print(tree, 'root', {maxItemsPerLevel, maxLevel, maxLineWidth, renderer});
