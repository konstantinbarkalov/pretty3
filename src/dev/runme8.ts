import {prettyOld, pretty} from '../index';
import { AnsiRenderer } from '../text/renderer/implementation/ansi';
import tree from './input05';
//import tree from './example01';

const ansiRenderer = new AnsiRenderer();
const ansiOutput = prettyOld.stringifyTree(tree, {renderer: ansiRenderer});
console.log(ansiOutput);
console.log('-----');
pretty.print(tree);
