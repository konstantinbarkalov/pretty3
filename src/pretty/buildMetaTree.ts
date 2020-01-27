
import { buildMetaTreeSettingsT } from './interfaces/general';
import { MetaNode } from '../meta/node';
import { buildDescriptionTree } from './buildDescriptionTree';
import { nodeDescriptionT, guardNodeDescription } from './interfaces/nodeDescription';
import { EnumerableNodeFineTypeEnum, NodeBroadTypeEnum, IterableNodeFineTypeEnum } from './interfaces/nodeType';
import { nodeDescriptionToLeaf } from './nodeDescriptionToLeaf';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildMetaTree(tree: any, settings: buildMetaTreeSettingsT ): MetaNode {
  const nodeDescriptionTree = buildDescriptionTree(undefined, tree, settings);
  return nodeDescriptionTreeToMetaTreeRecursive(nodeDescriptionTree, settings);
}


function nodeDescriptionTreeToMetaTreeRecursive(nodeDescription: nodeDescriptionT, settings: buildMetaTreeSettingsT): MetaNode {
  const leaf = nodeDescriptionToLeaf(nodeDescription, settings);
  let buildedMetaNode: MetaNode;
  if (guardNodeDescription(NodeBroadTypeEnum.Iterable, nodeDescription)) {
    // TODO:!!!!!!!!!!!!!
    if (nodeDescription.typeTuple[1] === IterableNodeFineTypeEnum.Array) {
      buildedMetaNode = new MetaNode(leaf, settings.arrayTemplate.armGenerator, settings.arrayTemplate.armWidthGenerator);
    } else {
      buildedMetaNode = new MetaNode(leaf, settings.otherTemplate.armGenerator, settings.otherTemplate.armWidthGenerator);
    }
  } else if (guardNodeDescription(NodeBroadTypeEnum.Enumerable, nodeDescription)) {
    if (nodeDescription.typeTuple[1] === EnumerableNodeFineTypeEnum.Object) {
      buildedMetaNode = new MetaNode(leaf, settings.objectTemplate.armGenerator, settings.objectTemplate.armWidthGenerator);
    } else {
      buildedMetaNode = new MetaNode(leaf, settings.otherTemplate.armGenerator, settings.otherTemplate.armWidthGenerator);
    }
  }
  else {
    buildedMetaNode = new MetaNode(leaf, settings.otherTemplate.armGenerator, settings.otherTemplate.armWidthGenerator);
  }
  // TODO: all enum
  //if (nodeDescription.typeTuple[0] === NodeBroadTypeEnum.Enumerable) {
  if (guardNodeDescription(NodeBroadTypeEnum.Enumerable, nodeDescription)) {
    buildedMetaNode.children = nodeDescription.subEntries.map((childDescription) => {
      return nodeDescriptionTreeToMetaTreeRecursive(childDescription, settings);
    });
  }
  return buildedMetaNode;
}
