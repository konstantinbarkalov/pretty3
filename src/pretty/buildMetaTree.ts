
import { buildMetaTreeSettingsT, metaNodeTemplateT } from './interfaces/general';
import { MetaNode } from '../meta/node';
import { buildDescriptionTree } from './buildDescriptionTree';
import { nodeDescriptionT, guardNodeDescription } from './interfaces/nodeDescription';
import { NodeBroadTypeEnum } from './interfaces/nodeType';
import { nodeDescriptionToLeaf } from './nodeDescriptionToLeaf';
import { typeDependentBroadOnlyDictionaryT, getFromTypeDependentBroadOnlyDictionary } from './typeDependentDictionary';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildMetaTree(tree: any, settings: buildMetaTreeSettingsT ): MetaNode {
  const nodeDescriptionTree = buildDescriptionTree(undefined, tree, settings);
  return nodeDescriptionTreeToMetaTreeRecursive(nodeDescriptionTree, settings);
}

function getTemplate(nodeDescription: nodeDescriptionT, templateDictionary: typeDependentBroadOnlyDictionaryT<metaNodeTemplateT>): metaNodeTemplateT {
  return getFromTypeDependentBroadOnlyDictionary(templateDictionary, nodeDescription.typeTuple[0] );
}

function nodeDescriptionTreeToMetaTreeRecursive(nodeDescription: nodeDescriptionT, settings: buildMetaTreeSettingsT): MetaNode {
  const leaf = nodeDescriptionToLeaf(nodeDescription, settings);

  const template = getTemplate(nodeDescription, settings.templateDictionary);
  const buildedMetaNode = new MetaNode(leaf, template.armGenerator, template.armWidthGenerator);

  if (guardNodeDescription(NodeBroadTypeEnum.Enumerable, nodeDescription) ||
      guardNodeDescription(NodeBroadTypeEnum.Iterable, nodeDescription)) {
    buildedMetaNode.children = nodeDescription.subEntries.map((childDescription) => {
      return nodeDescriptionTreeToMetaTreeRecursive(childDescription, settings);
    });
  }
  return buildedMetaNode;
}
