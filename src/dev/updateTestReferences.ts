import pretty from '../index';
import * as fs from 'fs';
import * as path from 'path';
import { AnsiRenderer } from '../text/renderer/implementation/ansi';
import { HtmlRenderer } from '../text/renderer/implementation/html';
import { PlainRenderer } from '../text/renderer/implementation/plain';
const testcaseDataRootPath = path.resolve(__dirname, '../../test/pretty');
const testcaseDataInputPath = path.resolve(testcaseDataRootPath, './input/');
const testcaseDataReferencePath = path.resolve(testcaseDataRootPath, './reference/');

const plainRenderer = new PlainRenderer();
const htmlRenderer = new HtmlRenderer();
const ansiRenderer = new AnsiRenderer();
for (let i = 1; i <= 4; i++) {
  const input = JSON.parse(fs.readFileSync(path.resolve(testcaseDataInputPath, `input0${i}.json`), 'utf8'));
  const plainOutput = pretty.stringifyTree(input, {renderer: plainRenderer});
  fs.writeFileSync(path.resolve(testcaseDataReferencePath, `reference0${i}.txt`), plainOutput, 'utf8');
  const ansiOutput = pretty.stringifyTree(input, {renderer: ansiRenderer});
  fs.writeFileSync(path.resolve(testcaseDataReferencePath, `reference0${i}.ansi`), ansiOutput, 'utf8');
  const htmlOutput = pretty.stringifyTree(input, {renderer: htmlRenderer});
  fs.writeFileSync(path.resolve(testcaseDataReferencePath, `reference0${i}.html`), htmlOutput, 'utf8');
  console.log(`[${i}]`);
  console.log(plainOutput);
}
import input05 from './input05';
{
  const i = 5;
  const input = input05;
  const plainOutput = pretty.stringifyTree(input, {renderer: plainRenderer});
  fs.writeFileSync(path.resolve(testcaseDataReferencePath, `reference0${i}.txt`), plainOutput, 'utf8');
  const ansiOutput = pretty.stringifyTree(input, {renderer: ansiRenderer});
  fs.writeFileSync(path.resolve(testcaseDataReferencePath, `reference0${i}.ansi`), ansiOutput, 'utf8');
  const htmlOutput = pretty.stringifyTree(input, {renderer: htmlRenderer});
  fs.writeFileSync(path.resolve(testcaseDataReferencePath, `reference0${i}.html`), htmlOutput, 'utf8');
  console.log(`[${i}]`);
  console.log(plainOutput);
}

import input06 from './input06';
{
  const i = 6;
  const input = input06;
  {
    const plainOutput = pretty.stringifyTree(input, {renderer: plainRenderer, maxLevel: 2, maxItemsPerLevel: 3});
    fs.writeFileSync(path.resolve(testcaseDataReferencePath, `reference0${i}-2-3.txt`), plainOutput, 'utf8');
    const ansiOutput = pretty.stringifyTree(input, {renderer: ansiRenderer, maxLevel: 2, maxItemsPerLevel: 3});
    fs.writeFileSync(path.resolve(testcaseDataReferencePath, `reference0${i}-2-3.ansi`), ansiOutput, 'utf8');
    const htmlOutput = pretty.stringifyTree(input, {renderer: htmlRenderer, maxLevel: 2, maxItemsPerLevel: 3});
    fs.writeFileSync(path.resolve(testcaseDataReferencePath, `reference0${i}-2-3.html`), htmlOutput, 'utf8');
    console.log(`[${i}]-2-3`);
    console.log(plainOutput);
  }
  {
    const plainOutput = pretty.stringifyTree(input, {renderer: plainRenderer, maxLevel: 2, maxItemsPerLevel: Infinity});
    fs.writeFileSync(path.resolve(testcaseDataReferencePath, `reference0${i}-2-inf.txt`), plainOutput, 'utf8');
    const ansiOutput = pretty.stringifyTree(input, {renderer: ansiRenderer, maxLevel: 2, maxItemsPerLevel: Infinity});
    fs.writeFileSync(path.resolve(testcaseDataReferencePath, `reference0${i}-2-inf.ansi`), ansiOutput, 'utf8');
    const htmlOutput = pretty.stringifyTree(input, {renderer: htmlRenderer, maxLevel: 2, maxItemsPerLevel: Infinity});
    fs.writeFileSync(path.resolve(testcaseDataReferencePath, `reference0${i}-2-inf.html`), htmlOutput, 'utf8');
    console.log(`[${i}]-2-inf`);
    console.log(plainOutput);
  }
  {
    const plainOutput = pretty.stringifyTree(input, {renderer: plainRenderer, maxLevel: Infinity, maxItemsPerLevel: 3});
    fs.writeFileSync(path.resolve(testcaseDataReferencePath, `reference0${i}-inf-3.txt`), plainOutput, 'utf8');
    const ansiOutput = pretty.stringifyTree(input, {renderer: ansiRenderer, maxLevel: Infinity, maxItemsPerLevel: 3});
    fs.writeFileSync(path.resolve(testcaseDataReferencePath, `reference0${i}-inf-3.ansi`), ansiOutput, 'utf8');
    const htmlOutput = pretty.stringifyTree(input, {renderer: htmlRenderer, maxLevel: Infinity, maxItemsPerLevel: 3});
    fs.writeFileSync(path.resolve(testcaseDataReferencePath, `reference0${i}-inf-3.html`), htmlOutput, 'utf8');
    console.log(`[${i}]-inf-3`);
    console.log(plainOutput);
  }
}