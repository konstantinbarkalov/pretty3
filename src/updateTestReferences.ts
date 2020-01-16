import pretty from '../src/index';
import * as fs from 'fs';
import * as path from 'path';
import { AnsiRenderer } from './sml4/renderer/implementation/ansi';
import { HtmlRenderer } from './sml4/renderer/implementation/html';
import { PlainRenderer } from './sml4/renderer/implementation/plain';

const testcaseRootPath = path.resolve(__dirname, '../../test');

const plainRenderer = new PlainRenderer();
const htmlRenderer = new HtmlRenderer();
const ansiRenderer = new AnsiRenderer();

for (let i = 1; i <= 4; i++) {
  const input = JSON.parse(fs.readFileSync(path.resolve(testcaseRootPath, `input0${i}.json`), 'utf8'));
  const plainOutput = pretty.stringifyTree(input, plainRenderer);
  fs.writeFileSync(path.resolve(testcaseRootPath, `reference0${i}.txt`), plainOutput, 'utf8');
  const ansiOutput = pretty.stringifyTree(input, ansiRenderer);
  fs.writeFileSync(path.resolve(testcaseRootPath, `reference0${i}.ansi`), ansiOutput, 'utf8');
  const htmlOutput = pretty.stringifyTree(input, htmlRenderer);
  fs.writeFileSync(path.resolve(testcaseRootPath, `reference0${i}.html`), htmlOutput, 'utf8');
  console.log(`[i]`);
  console.log(plainOutput);
}


