import pretty from '../src/index';
import * as fs from 'fs';
import * as path from 'path';
import { AnsiRenderer } from './text/renderer/implementation/ansi';
import { HtmlRenderer } from './text/renderer/implementation/html';
import { PlainRenderer } from './text/renderer/implementation/plain';

const testcaseRootPath = path.resolve(__dirname, '../../test');

const plainRenderer = new PlainRenderer();
const htmlRenderer = new HtmlRenderer();
const ansiRenderer = new AnsiRenderer();

for (let i = 1; i <= 4; i++) {
  const input = JSON.parse(fs.readFileSync(path.resolve(testcaseRootPath, `input0${i}.json`), 'utf8'));
  const plainOutput = pretty.stringifyTree(input, {renderer: plainRenderer});
  fs.writeFileSync(path.resolve(testcaseRootPath, `reference0${i}.txt`), plainOutput, 'utf8');
  const ansiOutput = pretty.stringifyTree(input, {renderer: ansiRenderer});
  fs.writeFileSync(path.resolve(testcaseRootPath, `reference0${i}.ansi`), ansiOutput, 'utf8');
  const htmlOutput = pretty.stringifyTree(input, {renderer: htmlRenderer});
  fs.writeFileSync(path.resolve(testcaseRootPath, `reference0${i}.html`), htmlOutput, 'utf8');
  console.log(`[${i}]`);
  console.log(plainOutput);
}
import input05 from '../test/input05';
{
  const i = 5;
  const input = input05;
  const plainOutput = pretty.stringifyTree(input, {renderer: plainRenderer});
  fs.writeFileSync(path.resolve(testcaseRootPath, `reference0${i}.txt`), plainOutput, 'utf8');
  const ansiOutput = pretty.stringifyTree(input, {renderer: ansiRenderer});
  fs.writeFileSync(path.resolve(testcaseRootPath, `reference0${i}.ansi`), ansiOutput, 'utf8');
  const htmlOutput = pretty.stringifyTree(input, {renderer: htmlRenderer});
  fs.writeFileSync(path.resolve(testcaseRootPath, `reference0${i}.html`), htmlOutput, 'utf8');
  console.log(`[${i}]`);
  console.log(plainOutput);

}

