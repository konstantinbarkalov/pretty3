import { prebuildedThemeT } from './interfaces/prebuildedTheme';
import { prebuildTheme } from './theme/prebuildTheme';
import { themeT } from './interfaces/theme';
import { fallback } from './theme/fallback';
import { printTreeOptionsT, stringifyTreeOptionsT, oneshotPrintTreeOptionsT, oneshotStringifyTreeOptionsT } from './interfaces/general';
import { buildMetaTree } from './buildMetaTree/buildMetaTree';
import { renderMetaNode } from '../meta/render/render';
import { defaultSettings } from './defaultSettings';

export class Pretty {
  protected readonly theme: prebuildedThemeT;
  constructor (themeStack?: themeT[]) {
    this.theme = prebuildTheme(themeStack || [], fallback);
  }
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
  print(tree: any, options?: printTreeOptionsT ): void {
    const settings = Object.assign({}, defaultSettings, options);
    const metaTree = buildMetaTree(tree, this.theme, settings);
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
  stringify(tree: any, options?: stringifyTreeOptionsT ): string {
    let stringBuffer = '';
    const printTreeOptions = Object.assign({}, options, {
      logLineCallback(line: string) { stringBuffer += line; },
    });
    this.print(tree, printTreeOptions);
    return stringBuffer;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static print(tree: any, options?: oneshotPrintTreeOptionsT): void {
    const settings = Object.assign({}, defaultSettings, options);
    const oneshotPretty = new Pretty(settings.themeStack);
    oneshotPretty.print(tree, settings);

  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static stringify(tree: any, options?: oneshotStringifyTreeOptionsT ): string {
    const settings = Object.assign({}, defaultSettings, options);
    const oneshotPretty = new Pretty(settings.themeStack);
    return oneshotPretty.stringify(tree, settings);

  }
}