import { expect } from 'chai';
import pretty from '../src/index';
import * as path from 'path';
import * as fs from 'fs';
import { PlainRenderer, HtmlRenderer, AnsiRenderer } from '../src/text/renderer/implementation';

import input05 from './pretty/input/input05';
import input06 from './pretty/input/input06';

const testcaseDataRootPath = path.resolve(__dirname, './pretty');
const testcaseDataInputPath = path.resolve(testcaseDataRootPath, './input/');
const testcaseDataReferencePath = path.resolve(testcaseDataRootPath, './reference/');

describe('basic pretty stringifing', () => {
  describe('to plain string', () => {
    const plainRenderer = new PlainRenderer();
    it('general tree', () => {
      const input = JSON.parse(fs.readFileSync(path.resolve(testcaseDataInputPath, 'input01.json'), 'utf8'));
      const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference01.txt'), 'utf8');
      const output = pretty.stringifyTree(input, {renderer: plainRenderer});
      expect(output).to.be.equal(reference);
    });
    it('multiline node', () => {
      const input = JSON.parse(fs.readFileSync(path.resolve(testcaseDataInputPath, 'input02.json'), 'utf8'));
      const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference02.txt'), 'utf8');
      const output = pretty.stringifyTree(input, {renderer: plainRenderer});
      expect(output).to.be.equal(reference);
    });
    it('array-based root', () => {
      const input = JSON.parse(fs.readFileSync(path.resolve(testcaseDataInputPath, 'input03.json'), 'utf8'));
      const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference03.txt'), 'utf8');
      const output = pretty.stringifyTree(input, {renderer: plainRenderer});
      expect(output).to.be.equal(reference);
    });
    it('long lists', () => {
      const input = JSON.parse(fs.readFileSync(path.resolve(testcaseDataInputPath, 'input04.json'), 'utf8'));
      const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference04.txt'), 'utf8');
      const output = pretty.stringifyTree(input, {renderer: plainRenderer});
      expect(output).to.be.equal(reference);
    });
  });
  describe('to html string', () => {
    const htmlRenderer = new HtmlRenderer();
    it('general tree', () => {
      const input = JSON.parse(fs.readFileSync(path.resolve(testcaseDataInputPath, 'input01.json'), 'utf8'));
      const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference01.html'), 'utf8');
      const output = pretty.stringifyTree(input, {renderer: htmlRenderer});
      expect(output).to.be.equal(reference);
    });
    it('multiline node', () => {
      const input = JSON.parse(fs.readFileSync(path.resolve(testcaseDataInputPath, 'input02.json'), 'utf8'));
      const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference02.html'), 'utf8');
      const output = pretty.stringifyTree(input, {renderer: htmlRenderer});
      expect(output).to.be.equal(reference);
    });
    it('array-based root', () => {
      const input = JSON.parse(fs.readFileSync(path.resolve(testcaseDataInputPath, 'input03.json'), 'utf8'));
      const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference03.html'), 'utf8');
      const output = pretty.stringifyTree(input, {renderer: htmlRenderer});
      expect(output).to.be.equal(reference);
    });
    it('long lists', () => {
      const input = JSON.parse(fs.readFileSync(path.resolve(testcaseDataInputPath, 'input04.json'), 'utf8'));
      const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference04.html'), 'utf8');
      const output = pretty.stringifyTree(input, {renderer: htmlRenderer});
      expect(output).to.be.equal(reference);
    });
  });
  describe('to ansi string', () => {
    const ansiRenderer = new AnsiRenderer();
    it('general tree', () => {
      const input = JSON.parse(fs.readFileSync(path.resolve(testcaseDataInputPath, 'input01.json'), 'utf8'));
      const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference01.ansi'), 'utf8');
      const output = pretty.stringifyTree(input, {renderer: ansiRenderer});
      expect(output).to.be.equal(reference);
    });
    it('multiline node', () => {
      const input = JSON.parse(fs.readFileSync(path.resolve(testcaseDataInputPath, 'input02.json'), 'utf8'));
      const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference02.ansi'), 'utf8');
      const output = pretty.stringifyTree(input, {renderer: ansiRenderer});
      expect(output).to.be.equal(reference);
    });
    it('array-based root', () => {
      const input = JSON.parse(fs.readFileSync(path.resolve(testcaseDataInputPath, 'input03.json'), 'utf8'));
      const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference03.ansi'), 'utf8');
      const output = pretty.stringifyTree(input, {renderer: ansiRenderer});
      expect(output).to.be.equal(reference);
    });
    it('long lists', () => {
      const input = JSON.parse(fs.readFileSync(path.resolve(testcaseDataInputPath, 'input04.json'), 'utf8'));
      const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference04.ansi'), 'utf8');
      const output = pretty.stringifyTree(input, {renderer: ansiRenderer});
      expect(output).to.be.equal(reference);
    });
  });
});

describe('pretty stringifing rich tree', () => {
  describe('to plain string', () => {
    const plainRenderer = new PlainRenderer();
    it('general tree with rich amount of types', () => {
      const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference05.txt'), 'utf8');
      const output = pretty.stringifyTree(input05, {renderer: plainRenderer});
      expect(output).to.be.equal(reference);
    });
  });
  describe('to html string', () => {
    const htmlRenderer = new HtmlRenderer();
    it('general tree with rich amount of types', () => {
      const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference05.html'), 'utf8');
      const output = pretty.stringifyTree(input05, {renderer: htmlRenderer});
      expect(output).to.be.equal(reference);
    });
  });
  describe('to ansi string', () => {
    const ansiRenderer = new AnsiRenderer();
    it('general tree with rich amount of types', () => {
      const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference05.ansi'), 'utf8');
      const output = pretty.stringifyTree(input05, {renderer: ansiRenderer});
      expect(output).to.be.equal(reference);
    });
  });
});

describe('pretty stringifing huge tree', () => {
  describe('to plain string', () => {
    const plainRenderer = new PlainRenderer();
    it('huge tree chopped both in depth, and by items count', () => {
      const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference06-2-3.txt'), 'utf8');
      const output = pretty.stringifyTree(input06, {renderer: plainRenderer, maxLevel: 2, maxItemsPerLevel: 3});
      expect(output).to.be.equal(reference);
    });
    it('huge tree chopped in depth, but unchopped by items count', () => {
      const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference06-2-inf.txt'), 'utf8');
      const output = pretty.stringifyTree(input06, {renderer: plainRenderer, maxLevel: 2, maxItemsPerLevel: Infinity});
      expect(output).to.be.equal(reference);
    });
    it('huge tree unchopped in depth but сhopped by items max', () => {
      const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference06-inf-3.txt'), 'utf8');
      const output = pretty.stringifyTree(input06, {renderer: plainRenderer, maxLevel: Infinity, maxItemsPerLevel: 3});
      expect(output).to.be.equal(reference);
    });
  });
  describe('to html string', () => {
    const htmlRenderer = new HtmlRenderer();
    it('huge tree chopped both in depth, and by items count', () => {
      const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference06-2-3.html'), 'utf8');
      const output = pretty.stringifyTree(input06, {renderer: htmlRenderer, maxLevel: 2, maxItemsPerLevel: 3});
      expect(output).to.be.equal(reference);
    });
    it('huge tree chopped in depth, but unchopped by items count', () => {
      const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference06-2-inf.html'), 'utf8');
      const output = pretty.stringifyTree(input06, {renderer: htmlRenderer, maxLevel: 2, maxItemsPerLevel: Infinity});
      expect(output).to.be.equal(reference);
    });
    it('huge tree unchopped in depth but сhopped by items max', () => {
      const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference06-inf-3.html'), 'utf8');
      const output = pretty.stringifyTree(input06, {renderer: htmlRenderer, maxLevel: Infinity, maxItemsPerLevel: 3});
      expect(output).to.be.equal(reference);
    });
  });
  describe('to ansi string', () => {
    const ansiRenderer = new AnsiRenderer();
    it('huge tree chopped both in depth, and by items count', () => {
      const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference06-2-3.ansi'), 'utf8');
      const output = pretty.stringifyTree(input06, {renderer: ansiRenderer, maxLevel: 2, maxItemsPerLevel: 3});
      expect(output).to.be.equal(reference);
    });
    it('huge tree chopped in depth, but unchopped by items count', () => {
      const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference06-2-inf.ansi'), 'utf8');
      const output = pretty.stringifyTree(input06, {renderer: ansiRenderer, maxLevel: 2, maxItemsPerLevel: Infinity});
      expect(output).to.be.equal(reference);
    });
    it('huge tree unchopped in depth but сhopped by items max', () => {
      const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference06-inf-3.ansi'), 'utf8');
      const output = pretty.stringifyTree(input06, {renderer: ansiRenderer, maxLevel: Infinity, maxItemsPerLevel: 3});
      expect(output).to.be.equal(reference);
    });
  });
});
