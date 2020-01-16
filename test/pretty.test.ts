import { expect } from 'chai';
import pretty from '../src/index';
import * as path from 'path';
import * as fs from 'fs';
import { PlainRenderer } from '../src/sml4/renderer/implementation/plain';


const testcaseRootPath = path.resolve(__dirname);

const plainRenderer = new PlainRenderer();

describe('pretty stringifing tree to string variable', () => {
  it('general tree', () => {
    const input = JSON.parse(fs.readFileSync(path.resolve(testcaseRootPath, 'input01.json'), 'utf8'));
    const reference = fs.readFileSync(path.resolve(testcaseRootPath, 'reference01.txt'), 'utf8');
    const output = pretty.stringifyTree(input, plainRenderer);
    expect(output).to.be.equal(reference);
  });
  it('multiline node', () => {
    const input = JSON.parse(fs.readFileSync(path.resolve(testcaseRootPath, 'input02.json'), 'utf8'));
    const reference = fs.readFileSync(path.resolve(testcaseRootPath, 'reference02.txt'), 'utf8');
    const output = pretty.stringifyTree(input, plainRenderer);
    expect(output).to.be.equal(reference);
  });
  it('array-based root', () => {
    const input = JSON.parse(fs.readFileSync(path.resolve(testcaseRootPath, 'input03.json'), 'utf8'));
    const reference = fs.readFileSync(path.resolve(testcaseRootPath, 'reference03.txt'), 'utf8');
    const output = pretty.stringifyTree(input, plainRenderer);
    expect(output).to.be.equal(reference);
  });
  it('long lists', () => {
    const input = JSON.parse(fs.readFileSync(path.resolve(testcaseRootPath, 'input04.json'), 'utf8'));
    const reference = fs.readFileSync(path.resolve(testcaseRootPath, 'reference04.txt'), 'utf8');
    const output = pretty.stringifyTree(input, plainRenderer);
    expect(output).to.be.equal(reference);
  });

});



