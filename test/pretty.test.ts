import { expect } from 'chai';
import { Pretty } from '../src/index';
import * as path from 'path';
import * as fs from 'fs';
import { PlainRenderer, HtmlRenderer, AnsiRenderer } from '../src/text/renderer/implementation';
import input05 from './pretty/input/input05';
import input06 from './pretty/input/input06';

const testcaseDataRootPath = path.resolve(__dirname, './pretty');
const testcaseDataInputPath = path.resolve(testcaseDataRootPath, './input/');
const testcaseDataReferencePath = path.resolve(testcaseDataRootPath, './reference/');

const rendererRuns = {
  plain: {
    renderer: new PlainRenderer(),
    referenceExtention: '.txt',
  },
  html: {
    renderer: new HtmlRenderer(),
    referenceExtention: '.html',
  },
  ansi: {
    renderer: new AnsiRenderer(),
    referenceExtention: '.ansi',
  },
};

describe('pretty', () => {
  for (const [rendererRunKey, rendererRun] of Object.entries(rendererRuns)) {
    describe(`${rendererRunKey} renderer`, () => {
      describe('starting', () => {
        it('must not fail on empty run', () => {
          expect(() => {
            Pretty.stringify(undefined);
          }).not.to.throw();
        });
        it('must synchronously use system console log when options aren\'t overriden', () => {
          let logArgs: unknown[] | undefined;
          const originalLog = console.log;
          // eslint-disable-next-line no-global-assign
          console.log = function(...args: unknown[]): void {
            logArgs = args;
          };
          Pretty.print('log me');
          expect(logArgs).to.be.deep.equal(['log me']);
          console.log = originalLog;
        });
        it('multiline node', () => {
          const input = JSON.parse(fs.readFileSync(path.resolve(testcaseDataInputPath, 'input02.json'), 'utf8'));
          const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference02' + rendererRun.referenceExtention), 'utf8');
          const output = Pretty.stringify(input, undefined, {renderer: rendererRun.renderer});
          expect(output).to.be.equal(reference);
        });
        it('array-based root', () => {
          const input = JSON.parse(fs.readFileSync(path.resolve(testcaseDataInputPath, 'input03.json'), 'utf8'));
          const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference03' + rendererRun.referenceExtention), 'utf8');
          const output = Pretty.stringify(input, undefined, {renderer: rendererRun.renderer});
          expect(output).to.be.equal(reference);
        });
        it('long lists', () => {
          const input = JSON.parse(fs.readFileSync(path.resolve(testcaseDataInputPath, 'input04.json'), 'utf8'));
          const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference04' + rendererRun.referenceExtention), 'utf8');
          const output = Pretty.stringify(input, undefined, {renderer: rendererRun.renderer});
          expect(output).to.be.equal(reference);
        });
      });
      describe('basic stringifing', () => {
        it('general tree', () => {
          const input = JSON.parse(fs.readFileSync(path.resolve(testcaseDataInputPath, 'input01.json'), 'utf8'));
          const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference01' + rendererRun.referenceExtention), 'utf8');
          const output = Pretty.stringify(input, undefined, {renderer: rendererRun.renderer});
          expect(output).to.be.equal(reference);
        });
        it('multiline node', () => {
          const input = JSON.parse(fs.readFileSync(path.resolve(testcaseDataInputPath, 'input02.json'), 'utf8'));
          const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference02' + rendererRun.referenceExtention), 'utf8');
          const output = Pretty.stringify(input, undefined, {renderer: rendererRun.renderer});
          expect(output).to.be.equal(reference);
        });
        it('array-based root', () => {
          const input = JSON.parse(fs.readFileSync(path.resolve(testcaseDataInputPath, 'input03.json'), 'utf8'));
          const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference03' + rendererRun.referenceExtention), 'utf8');
          const output = Pretty.stringify(input, undefined, {renderer: rendererRun.renderer});
          expect(output).to.be.equal(reference);
        });
        it('long lists', () => {
          const input = JSON.parse(fs.readFileSync(path.resolve(testcaseDataInputPath, 'input04.json'), 'utf8'));
          const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference04' + rendererRun.referenceExtention), 'utf8');
          const output = Pretty.stringify(input, undefined, {renderer: rendererRun.renderer});
          expect(output).to.be.equal(reference);
        });
      });
      describe('rich types stringifing', () => {
        it('general tree with rich amount of types', () => {
          const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference05' + rendererRun.referenceExtention), 'utf8');
          const output = Pretty.stringify(input05, undefined, {renderer: rendererRun.renderer});
          expect(output).to.be.equal(reference);
        });
      });
      describe('huge tree stringifing', () => {
        it('huge tree chopped both in depth, and by items count', () => {
          const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference06-2-3' + rendererRun.referenceExtention), 'utf8');
          const output = Pretty.stringify(input06, undefined, {renderer: rendererRun.renderer, maxLevel: 2, maxItemsPerLevel: 3});
          expect(output).to.be.equal(reference);
        });
        it('huge tree chopped in depth, but unchopped by items count', () => {
          const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference06-2-inf' + rendererRun.referenceExtention), 'utf8');
          const output = Pretty.stringify(input06, undefined, {renderer: rendererRun.renderer, maxLevel: 2, maxItemsPerLevel: Infinity});
          expect(output).to.be.equal(reference);
        });
        it('huge tree unchopped in depth but сhopped by items max', () => {
          const reference = fs.readFileSync(path.resolve(testcaseDataReferencePath, 'reference06-inf-3' + rendererRun.referenceExtention), 'utf8');
          const output = Pretty.stringify(input06, undefined, {renderer: rendererRun.renderer, maxLevel: Infinity, maxItemsPerLevel: 3});
          expect(output).to.be.equal(reference);
        });
      });
    });

  }
});