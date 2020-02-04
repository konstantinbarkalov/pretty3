
import { buildMetaTreeSettingsT } from '../interfaces/general';
import { MetaNode } from '../../meta/node';
import { buildDescriptionTree } from './buildDescriptionTree';
import { nodeDescriptionT, guardNodeDescription } from '../interfaces/nodeDescription';
import { NodeBroadTypeEnum } from '../interfaces/nodeType';
import { nodeDescriptionToLeaf } from './nodeDescriptionToLeaf';
import { getFromTypeDependentDictionary } from '../typeDependentDictionary';
import { prebuildedThemeT, nodePrebuildedThemeT } from '../interfaces/prebuildedTheme';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildMetaTree(tree: any, rootKey: any, theme: prebuildedThemeT, settings: buildMetaTreeSettingsT ): MetaNode {
  const nodeDescriptionTree = buildDescriptionTree(rootKey, tree, settings);
  return nodeDescriptionTreeToMetaTreeRecursive(nodeDescriptionTree, theme, settings);
}


function getNodePrebuildedTheme(nodeDescription: nodeDescriptionT, theme: prebuildedThemeT): nodePrebuildedThemeT {
  return getFromTypeDependentDictionary(theme, nodeDescription.typeTuple );
}

function nodeDescriptionTreeToMetaTreeRecursive(nodeDescription: nodeDescriptionT, theme: prebuildedThemeT, settings: buildMetaTreeSettingsT): MetaNode {

  const nodePrebuildedTheme = getNodePrebuildedTheme(nodeDescription, theme);
  const leaf = nodeDescriptionToLeaf(nodeDescription, nodePrebuildedTheme);
  const buildedMetaNode = new MetaNode(leaf, nodePrebuildedTheme.arm.armGenerator, nodePrebuildedTheme.arm.armWidthGenerator);

  if (guardNodeDescription(NodeBroadTypeEnum.Enumerable, nodeDescription) ||
      guardNodeDescription(NodeBroadTypeEnum.Iterable, nodeDescription)) {
    buildedMetaNode.children = nodeDescription.subEntries.map((childDescription) => {
      return nodeDescriptionTreeToMetaTreeRecursive(childDescription, theme, settings);
    });
  }
  return buildedMetaNode;
}
