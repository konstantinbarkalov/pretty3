import pretty from '../src/index';
import * as fs from 'fs';

// import * as path from 'path';
// const testcaseRootPath = path.resolve(__dirname, '../../test');
// for (let i = 1; i <= 4; i++) {
//   const input = JSON.parse(fs.readFileSync(path.resolve(testcaseRootPath, `input0${i}.json`), 'utf8'));
//   const output = pretty.stringifyTree(input);
//   fs.writeFileSync(path.resolve(testcaseRootPath, `reference0${i}.txt`), output, 'utf8');
//   console.log(`[i]`);
//   console.log(output);
// }

let weakHepler = {};
const daInput = {
  nowDate: new Date(),
  mySymbol: Symbol(),
  myMap: new Map([['a', 'abc'], ['A', 'ABC']]),
  myArray: [0, 0.25, 0.5, 0.75],
  myTypedArray: new Uint8ClampedArray([0, 64, 128, 192]),
  myWeakMap: new WeakMap([[weakHepler, 'so weak...']]),
  mySet: new Set([11, 22, 33]),
  flow: 'rapping text',
  thaLib: fs,
}
const daOutput = pretty.stringifyTree(daInput);
console.log(daOutput);

