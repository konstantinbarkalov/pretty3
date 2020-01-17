import { expect } from 'chai';
import pretty from '../src/index';
import * as path from 'path';
import * as fs from 'fs';
import { PlainRenderer, HtmlRenderer, AnsiRenderer } from '../src/text/renderer/implementation';

import input05 from './input05';

const testcaseRootPath = path.resolve(__dirname);



describe('basic pretty stringifing', () => {
  const plainRenderer = new PlainRenderer();
  describe('to plain string', () => {
    it('general tree', () => {
      const input = JSON.parse(fs.readFileSync(path.resolve(testcaseRootPath, 'input01.json'), 'utf8'));
      const reference = fs.readFileSync(path.resolve(testcaseRootPath, 'reference01.txt'), 'utf8');
      const output = pretty.stringifyTree(input, {renderer: plainRenderer});
      expect(output).to.be.equal(reference);
    });
    it('multiline node', () => {
      const input = JSON.parse(fs.readFileSync(path.resolve(testcaseRootPath, 'input02.json'), 'utf8'));
      const reference = fs.readFileSync(path.resolve(testcaseRootPath, 'reference02.txt'), 'utf8');
      const output = pretty.stringifyTree(input, {renderer: plainRenderer});
      expect(output).to.be.equal(reference);
    });
    it('array-based root', () => {
      const input = JSON.parse(fs.readFileSync(path.resolve(testcaseRootPath, 'input03.json'), 'utf8'));
      const reference = fs.readFileSync(path.resolve(testcaseRootPath, 'reference03.txt'), 'utf8');
      const output = pretty.stringifyTree(input, {renderer: plainRenderer});
      expect(output).to.be.equal(reference);
    });
    it('long lists', () => {
      const input = JSON.parse(fs.readFileSync(path.resolve(testcaseRootPath, 'input04.json'), 'utf8'));
      const reference = fs.readFileSync(path.resolve(testcaseRootPath, 'reference04.txt'), 'utf8');
      const output = pretty.stringifyTree(input, {renderer: plainRenderer});
      expect(output).to.be.equal(reference);
    });
  });
});
describe('basic pretty stringifing', () => {
  const htmlRenderer = new HtmlRenderer();
  describe('to html string', () => {
    it('general tree', () => {
      const input = JSON.parse(fs.readFileSync(path.resolve(testcaseRootPath, 'input01.json'), 'utf8'));
      const reference = fs.readFileSync(path.resolve(testcaseRootPath, 'reference01.html'), 'utf8');
      const output = pretty.stringifyTree(input, {renderer: htmlRenderer});
      expect(output).to.be.equal(reference);
    });
    it('multiline node', () => {
      const input = JSON.parse(fs.readFileSync(path.resolve(testcaseRootPath, 'input02.json'), 'utf8'));
      const reference = fs.readFileSync(path.resolve(testcaseRootPath, 'reference02.html'), 'utf8');
      const output = pretty.stringifyTree(input, {renderer: htmlRenderer});
      expect(output).to.be.equal(reference);
    });
    it('array-based root', () => {
      const input = JSON.parse(fs.readFileSync(path.resolve(testcaseRootPath, 'input03.json'), 'utf8'));
      const reference = fs.readFileSync(path.resolve(testcaseRootPath, 'reference03.html'), 'utf8');
      const output = pretty.stringifyTree(input, {renderer: htmlRenderer});
      expect(output).to.be.equal(reference);
    });
    it('long lists', () => {
      const input = JSON.parse(fs.readFileSync(path.resolve(testcaseRootPath, 'input04.json'), 'utf8'));
      const reference = fs.readFileSync(path.resolve(testcaseRootPath, 'reference04.html'), 'utf8');
      const output = pretty.stringifyTree(input, {renderer: htmlRenderer});
      expect(output).to.be.equal(reference);
    });
  });
});

describe('basic pretty stringifing', () => {
  const ansiRenderer = new AnsiRenderer();
  describe('to ansi string', () => {
    it('general tree', () => {
      const input = JSON.parse(fs.readFileSync(path.resolve(testcaseRootPath, 'input01.json'), 'utf8'));
      const reference = fs.readFileSync(path.resolve(testcaseRootPath, 'reference01.ansi'), 'utf8');
      const output = pretty.stringifyTree(input, {renderer: ansiRenderer});
      expect(output).to.be.equal(reference);
    });
    it('multiline node', () => {
      const input = JSON.parse(fs.readFileSync(path.resolve(testcaseRootPath, 'input02.json'), 'utf8'));
      const reference = fs.readFileSync(path.resolve(testcaseRootPath, 'reference02.ansi'), 'utf8');
      const output = pretty.stringifyTree(input, {renderer: ansiRenderer});
      expect(output).to.be.equal(reference);
    });
    it('array-based root', () => {
      const input = JSON.parse(fs.readFileSync(path.resolve(testcaseRootPath, 'input03.json'), 'utf8'));
      const reference = fs.readFileSync(path.resolve(testcaseRootPath, 'reference03.ansi'), 'utf8');
      const output = pretty.stringifyTree(input, {renderer: ansiRenderer});
      expect(output).to.be.equal(reference);
    });
    it('long lists', () => {
      const input = JSON.parse(fs.readFileSync(path.resolve(testcaseRootPath, 'input04.json'), 'utf8'));
      const reference = fs.readFileSync(path.resolve(testcaseRootPath, 'reference04.ansi'), 'utf8');
      const output = pretty.stringifyTree(input, {renderer: ansiRenderer});
      expect(output).to.be.equal(reference);
    });
  });
});

describe('pretty stringifing rich tree', () => {
  const plainRenderer = new PlainRenderer();
  const htmlRenderer = new HtmlRenderer();
  const ansiRenderer = new AnsiRenderer();
  describe('to plain string', () => {
    it('general tree with rich amount of types', () => {
      const reference = fs.readFileSync(path.resolve(testcaseRootPath, 'reference05.txt'), 'utf8');
      const output = pretty.stringifyTree(input05, {renderer: plainRenderer});
      expect(output).to.be.equal(reference);
    });
  });
  describe('to html string', () => {
    it('general tree with rich amount of types', () => {
      const reference = fs.readFileSync(path.resolve(testcaseRootPath, 'reference05.html'), 'utf8');
      const output = pretty.stringifyTree(input05, {renderer: htmlRenderer});
      expect(output).to.be.equal(reference);
    });
  });
  describe('to ansi string', () => {
    it('general tree with rich amount of types', () => {
      const reference = fs.readFileSync(path.resolve(testcaseRootPath, 'reference05.ansi'), 'utf8');
      const output = pretty.stringifyTree(input05, {renderer: ansiRenderer});
      expect(output).to.be.equal(reference);
    });
  });
});
