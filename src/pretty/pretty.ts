import { prebuildedThemeT } from './interfaces/prebuildedTheme';
import { prebuildTheme } from './theme/prebuildTheme';
import { themeT } from './interfaces/theme';
import { fallback } from './theme/fallback';
import { printTreeOptionsT, stringifyTreeOptionsT, oneshotPrintTreeOptionsT, oneshotStringifyTreeOptionsT } from './interfaces/general';
import { buildMetaTree } from './buildMetaTree/buildMetaTree';
import { renderMetaNode } from '../meta/render/render';
import { defaultSettings } from './defaultSettings';
/**
  * Utility to print pretty formatted tree-representation of any javacript data.

 * This class represens basic API and works both ways:
 * - as a constructable via `new Pretty(themeStack)` instance,
 * - or as a static class with oneshot functions `Pretty.print` and `Pretty.stringify`
 *
 * @export
 * @class Pretty
 */
export class Pretty {
  protected readonly theme: prebuildedThemeT;
  constructor (themeStack?: themeT[]) {
    this.theme = prebuildTheme(themeStack || [], fallback);
  }
  /**
   * Prints pretty formatted tree-representation of any javacript data. Use options
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
   * @param {*} tree Any javacript data
   * @param {*} [rootKey] Optional key name of tree root
   * @param {printTreeOptionsT} [options]
   * @memberof Pretty
   */
  print(tree: any, rootKey?: any, options?: printTreeOptionsT ): void {
    const settings = Object.assign({}, defaultSettings, options);
    const metaTree = buildMetaTree(tree, rootKey, this.theme, settings);
    renderMetaNode(metaTree, settings.maxLineWidth, settings.renderer, settings.logLineCallback);
  }

  /**
   * Renders pretty formatted tree-representation of any javacript data to string.
   * Use options to customize output.
   *
   * @remarks
   *
   * Works same as `pretty.print`, but use predefined `logLineCallback`
   * for dumping output to `string`. Consider Using `pretty.print` if
   * you need a per-line callback API, or if you just want a simple oneliner
   * with default `options.logLineCallback`
   *
   * @remarks
   *
   * Cycle-referencing is allowed, while capping output
   * with finite `options.maxLevel` and `options.maxItemsPerLevel`.
   *
   *
   * @param {*} tree Any javacript data
   * @param {*} [rootKey] Optional key name of tree root
   * @param {stringifyTreeOptionsT} [options]
   * @returns {string}
   * @memberof Pretty
   */
  stringify(tree: any, rootKey?: any, options?: stringifyTreeOptionsT ): string {
    let stringBuffer = '';
    const printTreeOptions = Object.assign<printTreeOptionsT, printTreeOptionsT, printTreeOptionsT>({}, options || {}, {
      logLineCallback(line: string, trailingEol: string) { stringBuffer += line + trailingEol; },
    });
    this.print(tree, rootKey, printTreeOptions);
    return stringBuffer;
  }

  /**
   * Prints pretty formatted tree-representation of any javacript data. Use options
   * to customize output.
   *
   * @remarks
   *
   * Static "oneshot" version of `pretty.print`.
   * Easier to use, because no need to create `new Pretty()`,
   * but it prebuilds theme **each time** it starts,
   * while long-living `new Pretty()` keep prebuilded theme
   * and reused it.
   *
   * @remarks
   *
   * Options are populated with `themeStack` property, that is intended for
   * `Pretty` constructor to create short-living `new Pretty(themeStack)`
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
   * @static
   * @param {*} tree Any javacript data
   * @param {*} [rootKey] Optional key name of tree root
   * @param {oneshotPrintTreeOptionsT} [options] same as `printTreeOptionsT` but with `themeStack`
   * @memberof Pretty
   */
  static print(tree: any, rootKey?: any, options?: oneshotPrintTreeOptionsT): void {
    const settings = Object.assign({}, defaultSettings, options);
    const oneshotPretty = new Pretty(settings.themeStack);
    oneshotPretty.print(tree, rootKey, settings);

  }
  /**
   * Renders pretty formatted tree-representation of any javacript data to string.
   * Use options to customize output.
   *
   * @remarks
   *
   * Static "oneshot" version of `pretty.print`.
   * Easier to use, because no need to create `new Pretty()`,
   * but it prebuilds theme **each time** it starts,
   * while long-living `new Pretty()` keep prebuilded theme
   * and reused it.
   *
   * @remarks
   *
   * Options are populated with `themeStack` property, that is intended for
   * `Pretty` constructor to create short-living `new Pretty(themeStack)`
   *
   * @remarks
   *
   * Works same as `pretty.print`, but use predefined `logLineCallback`
   * for dumping output to `string`. Consider Using `pretty.print` if
   * you need a per-line callback API, or if you just want a simple oneliner
   * with default `options.logLineCallback`
   *
   * @remarks
   *
   * Cycle-referencing is allowed, while capping output
   * with finite `options.maxLevel` and `options.maxItemsPerLevel`.
   *
   *
   * @static
   * @param {*} tree Any javacript data
   * @param {*} [rootKey] Optional key name of tree root
   * @param {oneshotStringifyTreeOptionsT} [options] same as `stringifyTreeOptionsT` but with `themeStack`
   * @returns {string}
   * @memberof Pretty
   */
  static stringify(tree: any, rootKey?: any, options?: oneshotStringifyTreeOptionsT ): string {
    const settings = Object.assign({}, defaultSettings, options);
    const oneshotPretty = new Pretty(settings.themeStack);
    return oneshotPretty.stringify(tree, rootKey, settings);

  }
}