
import { buildMetaTreeSettingsT } from '../interfaces/general';
import { MetaNode } from '../meta/node';
import { anyNodeDescriptionT, NodeMetatypeEnum, SingleNodeTypeEnum, EnumerableNodeTypeEnum, nodeDescriptionKeyT } from '../interfaces/nodeDescription';
import { nodeDescriptionToLeaf } from './nodeDescriptionToLeaf';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildMetaTree(tree: any, settings: buildMetaTreeSettingsT ): MetaNode {
  const nodeDescriptionTree = buildDescriptionTreeRecursive(undefined, tree, 0, settings);
  return nodeDescriptionTreeToMetaTreeRecursive(nodeDescriptionTree, settings);
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildDescriptionTreeRecursive(nodeKey: any, node: any, level: number, settings: buildMetaTreeSettingsT): anyNodeDescriptionT {

  const currentLevelMaxItems =
    (level >= settings.maxLevel)
      ? 0
      : Array.isArray(settings.maxItemsPerLevel)
        ? settings.maxItemsPerLevel[Math.min(level, settings.maxItemsPerLevel.length - 1)]
        : settings.maxItemsPerLevel;


  let nodeDescription: anyNodeDescriptionT;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let unwrappedSubEntries: [nodeDescriptionKeyT, any][] = [];
  if (typeof node === 'string') {
    nodeDescription = {
      key: nodeKey,
      metatype: NodeMetatypeEnum.Single,
      type: SingleNodeTypeEnum.String,
      value: node,
    };
  } else if (typeof node === 'number') {
    nodeDescription = {
      key: nodeKey,
      metatype: NodeMetatypeEnum.Single,
      type: SingleNodeTypeEnum.Number,
      value: parseFloat(node.toPrecision(6)).toLocaleString(),
    };
  } else if (typeof node === 'boolean') {
    nodeDescription = {
      key: nodeKey,
      metatype: NodeMetatypeEnum.Single,
      type: SingleNodeTypeEnum.Boolean,
      value: node.toLocaleString(),
    };
  } else if (typeof node === 'symbol') {
    nodeDescription = {
      key: nodeKey,
      metatype: NodeMetatypeEnum.Single,
      type: SingleNodeTypeEnum.Symbol,
      value: node.toLocaleString(),
      icon: {text:'<S>', centerId: 1},
    };
  } else if (node === null) {
    nodeDescription = {
      key: nodeKey,
      metatype: NodeMetatypeEnum.Single,
      type: SingleNodeTypeEnum.Null,
      value: 'NULL',
    };
  } else if (node === undefined) {
    nodeDescription = {
      key: nodeKey,
      metatype: NodeMetatypeEnum.Single,
      type: SingleNodeTypeEnum.Undefined,
      value: 'UNDEFINED',
    };
  } else if (Array.isArray(node)) {
    nodeDescription = {
      key: nodeKey,
      metatype: NodeMetatypeEnum.Enumerable,
      type: EnumerableNodeTypeEnum.Array,
      value: '',
      subEntries: [],
      icon: {text:'[ ]', centerId: 1}
    };
    unwrappedSubEntries = node.map((sub, subId) => [subId, sub]);
  } else if (typeof node === 'object' && node) {
    let nodeCustomObjectString;
    if (node.toLocaleString) {
      const jsObjectString = node.toLocaleString();
      if (jsObjectString !== '[object Object]') {
        nodeCustomObjectString = jsObjectString;
      }
    }
    if (node instanceof Date) {
      nodeDescription = {
        key: nodeKey,
        metatype: NodeMetatypeEnum.Single,
        type: SingleNodeTypeEnum.Date,
        value: node.toLocaleString(),
        icon: {text:'{D}', centerId: 1},
      };
    } else if (node.hasOwnProperty) {
      let nodeValue: string;
      if (nodeCustomObjectString) {
        nodeValue = nodeCustomObjectString;
      } else {
        nodeValue = ''; // TODO!!
      }
      nodeDescription = {
        key: nodeKey,
        metatype: NodeMetatypeEnum.Enumerable,
        type: EnumerableNodeTypeEnum.Object,
        subEntries: [],
        value: nodeValue,
        icon: {text:'{ }', centerId: 1}
      };
      unwrappedSubEntries = Object.entries(node);
    } else {
      let nodeValue: string;
      if (nodeCustomObjectString) {
        nodeValue = nodeCustomObjectString;
      } else {
        nodeValue = 'DETAILLESS OBJECT';
      }
      nodeDescription = {
        key: nodeKey,
        metatype: NodeMetatypeEnum.Enumerable,
        type: EnumerableNodeTypeEnum.Unknown,
        value: nodeValue,
        icon: {text:'{X}', centerId: 1},
        subEntries: [],
      };
      unwrappedSubEntries = [];
    }
  } else {
    nodeDescription = {
      key: nodeKey,
      metatype: NodeMetatypeEnum.Single,
      type: SingleNodeTypeEnum.Unknown,
      value: (typeof node).toLocaleUpperCase(),
      icon: {text:'<X>', centerId: 1},
    };
  }
  if (nodeDescription.metatype === NodeMetatypeEnum.Enumerable) {
    const itemsShownCount = Math.min(currentLevelMaxItems, unwrappedSubEntries.length);
    for (let i = 0; i < itemsShownCount; i++) {
      const [subEntryKey, subEntry] = unwrappedSubEntries[i];
      // TODO limits ??
      const childDesctiption = buildDescriptionTreeRecursive(subEntryKey, subEntry, level + 1, settings);
      nodeDescription.subEntries.push(childDesctiption);
    }

    if (nodeDescription.subEntries.length < unwrappedSubEntries.length) {
      nodeDescription.info = `${nodeDescription.subEntries.length} shown of ${unwrappedSubEntries.length} total`;
    } else {
      nodeDescription.info = `${nodeDescription.subEntries.length} entries`;
    }
  }
  return nodeDescription;
}

function nodeDescriptionTreeToMetaTreeRecursive(nodeDescription: anyNodeDescriptionT, settings: buildMetaTreeSettingsT): MetaNode {
  const leaf = nodeDescriptionToLeaf(nodeDescription);
  const buildedMetaNode = new MetaNode(leaf, settings.objectTemplate.armGenerator, settings.objectTemplate.armWidthGenerator);
  if (nodeDescription.metatype === NodeMetatypeEnum.Enumerable) {
    buildedMetaNode.children = nodeDescription.subEntries.map((childDescription) => {
      return nodeDescriptionTreeToMetaTreeRecursive(childDescription, settings);
    });
  }
  return buildedMetaNode;
}