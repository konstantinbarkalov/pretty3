import pretty from '../src/index';
import * as fs from 'fs';
import * as path from 'path';

const testcaseRootPath = path.resolve(__dirname, '../../test');
for (let i = 1; i <= 4; i++) {
  const input = JSON.parse(fs.readFileSync(path.resolve(testcaseRootPath, `input0${i}.json`), 'utf8'));
  const output = pretty.stringifyTree(input);
  fs.writeFileSync(path.resolve(testcaseRootPath, `reference0${i}.txt`), output, 'utf8');
  console.log(`[i]`);
  console.log(output);
}


