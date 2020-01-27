import { renderMetaNode } from '../meta/render/render';
import { printTreeOptionsT, stringifyTreeOptionsT } from './interfaces/general';
import { buildMetaTree } from './buildMetaTree';
import { defaultSettings } from './defaultSettings';


/**
 * Print formatted tree-representation of any javacript data. Use options
 * to customize output.
 *
 * @remarks
 *
 * Use `options.logLineCallback` for custom `console.log` handler, or
 * `pretty.stringifyTree` to render tree to a `string`.
 *
 * @remarks
 *
 * Cycle-referencing is allowed, while capping output
 * with finite `options.maxLevel` and `options.maxItemsPerLevel`.
 *
 * @export
 * @param {*} tree
 * @param {printTreeOptionsT} [options]
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function print(tree: any, options?: printTreeOptionsT ): void {
  const settings = Object.assign({}, defaultSettings, options);
  const metaTree = buildMetaTree(tree, settings);
  renderMetaNode(metaTree, settings.maxLineWidth, settings.renderer, settings.logLineCallback);
}


/**
 * Render formatted tree-representation of any javacript data to string.
 * Use options to customize output.
 *
 * @remarks
 *
 * Works same as `pretty.print`, but use predefined `logLineCallback`
 * for dumping output to `string`. Consider Using `pretty.print` if
 * you need a per-line callback model, or if you just want a simple oneliner
 * with default `options.logLineCallback`
 *
 * @remarks
 *
 * Cycle-referencing is allowed, while capping output
 * with finite `options.maxLevel` and `options.maxItemsPerLevel`.
 *
 *
 * @export
 * @param {*} tree
 * @param {stringifyTreeOptionsT} [options]
 * @returns {string}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function stringify(tree: any, options?: stringifyTreeOptionsT ): string {
  let stringBuffer = '';
  const printTreeOptions = Object.assign({}, options, {
    logLineCallback(line: string) { stringBuffer += line; },
  });
  print(tree, printTreeOptions);
  return stringBuffer;
}