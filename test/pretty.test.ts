import { expect } from 'chai';
import pretty from '../src/index';
import * as path from 'path';
import * as fs from 'fs';

const testcaseRootPath = path.resolve(__dirname);

describe('pretty stringifing tree to string variable', () => {
  it('general tree', () => {
    const input = JSON.parse(fs.readFileSync(path.resolve(testcaseRootPath, 'input01.json'), 'utf8'));
    const reference = fs.readFileSync(path.resolve(testcaseRootPath, 'reference01.txt'), 'utf8');
    const output = pretty.stringifyTree(input);
    expect(output).to.be.equal(reference);
  });
  it('multiline tree', () => {
    const input = JSON.parse(fs.readFileSync(path.resolve(testcaseRootPath, 'input02.json'), 'utf8'));
    const reference = fs.readFileSync(path.resolve(testcaseRootPath, 'reference01.txt'), 'utf8');
    const output = pretty.stringifyTree(input);
    expect(output).to.be.equal(reference);
  });
});



