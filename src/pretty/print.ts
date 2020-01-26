import { renderMetaNode } from '../meta/render/render';
import { printTreeOptionsT } from '../interfaces/general';
import { buildMetaTree } from './buildMetaTree';
import { defaultSettings } from './defaultSettings';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function print(tree: any, options?: printTreeOptionsT ): void {
  const settings = Object.assign({}, defaultSettings, options);
  const metaTree = buildMetaTree(tree, settings);
  renderMetaNode(metaTree, settings.maxLineWidth, settings.renderer, settings.logLineCallback);
}