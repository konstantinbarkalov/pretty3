
import { buildMetaTreeSettingsT } from './interfaces/general';
import { MetaNode } from '../meta/node';
import { buildDescriptionTree } from './buildDescriptionTree';
import { nodeDescriptionT, guardNodeDescription } from './interfaces/nodeDescription';
import { EnumerableNodeTypeEnum, NodeMetatypeEnum } from './interfaces/nodeType';
import { nodeDescriptionToLeaf } from './nodeDescriptionToLeaf';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildMetaTree(tree: any, settings: buildMetaTreeSettingsT ): MetaNode {
  const nodeDescriptionTree = buildDescriptionTree(undefined, tree, settings);
  return nodeDescriptionTreeToMetaTreeRecursive(nodeDescriptionTree, settings);
}


function nodeDescriptionTreeToMetaTreeRecursive(nodeDescription: nodeDescriptionT, settings: buildMetaTreeSettingsT): MetaNode {
  const leaf = nodeDescriptionToLeaf(nodeDescription, settings);
  let buildedMetaNode: MetaNode;
  //if (nodeDescription.typeTuple[0] === NodeMetatypeEnum.Enumerable) {
  if (guardNodeDescription(NodeMetatypeEnum.Enumerable, nodeDescription)) {
    if (nodeDescription.typeTuple[1] === EnumerableNodeTypeEnum.Array) {
      buildedMetaNode = new MetaNode(leaf, settings.arrayTemplate.armGenerator, settings.arrayTemplate.armWidthGenerator);
    }
    else if (nodeDescription.typeTuple[1] === EnumerableNodeTypeEnum.Object) {
      buildedMetaNode = new MetaNode(leaf, settings.objectTemplate.armGenerator, settings.objectTemplate.armWidthGenerator);
    }
    else {
      buildedMetaNode = new MetaNode(leaf, settings.otherTemplate.armGenerator, settings.otherTemplate.armWidthGenerator);
    }
  }
  else {
    buildedMetaNode = new MetaNode(leaf, settings.otherTemplate.armGenerator, settings.otherTemplate.armWidthGenerator);
  }
  // TODO: all enum
  //if (nodeDescription.typeTuple[0] === NodeMetatypeEnum.Enumerable) {
  if (guardNodeDescription(NodeMetatypeEnum.Enumerable, nodeDescription)) {
    buildedMetaNode.children = nodeDescription.subEntries.map((childDescription) => {
      return nodeDescriptionTreeToMetaTreeRecursive(childDescription, settings);
    });
  }
  return buildedMetaNode;
}