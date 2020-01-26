
import { buildMetaTreeSettingsT } from '../interfaces/general';
import { MetaNode } from '../meta/node';
import { anyNodeDescriptionT, NodeMetatypeEnum, SingleNodeTypeEnum, EnumerableNodeTypeEnum } from '../interfaces/nodeDescription';
import { nodeDescriptionToLeaf } from './nodeDescriptionToLeaf';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildMetaTree(tree: any, settings: buildMetaTreeSettingsT ): MetaNode {
  return buildMetaTreeRecursive(undefined, tree, 0, settings);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildMetaTreeRecursive(nodeKey: any, node: any, level: number, settings: buildMetaTreeSettingsT): MetaNode {

  const currentLevelMaxItems =
    (level >= settings.maxLevel)
      ? 0
      : Array.isArray(settings.maxItemsPerLevel)
        ? settings.maxItemsPerLevel[Math.min(level, settings.maxItemsPerLevel.length - 1)]
        : settings.maxItemsPerLevel;


  let nodeDescription: anyNodeDescriptionT;
  if (typeof node === 'string') {
    nodeDescription = {
      metatype: NodeMetatypeEnum.Single,
      type: SingleNodeTypeEnum.String,
      value: node,
    };
  } else if (typeof node === 'number') {
    nodeDescription = {
      metatype: NodeMetatypeEnum.Single,
      type: SingleNodeTypeEnum.Number,
      value: parseFloat(node.toPrecision(6)).toLocaleString(),
    };
  } else if (typeof node === 'boolean') {
    nodeDescription = {
      metatype: NodeMetatypeEnum.Single,
      type: SingleNodeTypeEnum.Boolean,
      value: node.toLocaleString(),
    };
  } else if (typeof node === 'symbol') {
    nodeDescription = {
      metatype: NodeMetatypeEnum.Single,
      type: SingleNodeTypeEnum.Symbol,
      value: node.toLocaleString(),
      icon: {text:'<S>', centerId: 1},
    };
  } else if (node === null) {
    nodeDescription = {
      metatype: NodeMetatypeEnum.Single,
      type: SingleNodeTypeEnum.Null,
      value: 'NULL',
    };
  } else if (node === undefined) {
    nodeDescription = {
      metatype: NodeMetatypeEnum.Single,
      type: SingleNodeTypeEnum.Undefined,
      value: 'UNDEFINED',
    };
  } else if (Array.isArray(node)) {
    nodeDescription = {
      metatype: NodeMetatypeEnum.Enumerable,
      type: EnumerableNodeTypeEnum.Array,
      subEntries: node.map((sub, subId) => [subId, sub]),
      value: '',
      icon: {text:'[ ]', centerId: 1}};
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
        metatype: NodeMetatypeEnum.Enumerable,
        type: EnumerableNodeTypeEnum.Object,
        subEntries: Object.entries(node),
        value: nodeValue,
        icon: {text:'{ }', centerId: 1}};
    } else {
      let nodeValue: string;
      if (nodeCustomObjectString) {
        nodeValue = nodeCustomObjectString;
      } else {
        nodeValue = 'DETAILLESS OBJECT';
      }
      nodeDescription = {
        metatype: NodeMetatypeEnum.Enumerable,
        type: EnumerableNodeTypeEnum.Unknown,
        value: nodeValue,
        icon: {text:'{X}', centerId: 1},
        subEntries: [],
      };
    }
  } else {
    nodeDescription = {
      metatype: NodeMetatypeEnum.Single,
      type: SingleNodeTypeEnum.Unknown,
      value: (typeof node).toLocaleUpperCase(),
      icon: {text:'<X>', centerId: 1},
    };
  }

  if (nodeDescription.metatype === NodeMetatypeEnum.Enumerable) {
    const itemsShownCount = Math.min(currentLevelMaxItems, nodeDescription.subEntries.length);
    if (nodeDescription.subEntries.length > itemsShownCount) {
      nodeDescription.info = `${itemsShownCount} shown of ${nodeDescription.subEntries.length} total`;
    } else {
      nodeDescription.info = `${nodeDescription.subEntries.length} entries`;
    }
  }
  const leaf = nodeDescriptionToLeaf(nodeKey, nodeDescription);
  const buildedMetaNode = new MetaNode(leaf, settings.objectTemplate.armGenerator, settings.objectTemplate.armWidthGenerator);
  if (nodeDescription.metatype === NodeMetatypeEnum.Enumerable) {
    nodeDescription.subEntries.forEach(([subEntryKey, subEntry]) => {
      // TODO limits
      const subMetaNode = buildMetaTreeRecursive(subEntryKey, subEntry, level + 1, settings);
      buildedMetaNode.children.push(subMetaNode);
    });
  }
  return buildedMetaNode;
}


function buildDescriptionTreeRecursive(nodeKey: any, node: any, level: number, settings: buildMetaTreeSettingsT): MetaNode {

  const currentLevelMaxItems =
    (level >= settings.maxLevel)
      ? 0
      : Array.isArray(settings.maxItemsPerLevel)
        ? settings.maxItemsPerLevel[Math.min(level, settings.maxItemsPerLevel.length - 1)]
        : settings.maxItemsPerLevel;


  let nodeDescription: anyNodeDescriptionT;
  let unwrappedSubEntries:
  if (typeof node === 'string') {
    nodeDescription = {
      metatype: NodeMetatypeEnum.Single,
      type: SingleNodeTypeEnum.String,
      value: node,
    };
  } else if (typeof node === 'number') {
    nodeDescription = {
      metatype: NodeMetatypeEnum.Single,
      type: SingleNodeTypeEnum.Number,
      value: parseFloat(node.toPrecision(6)).toLocaleString(),
    };
  } else if (typeof node === 'boolean') {
    nodeDescription = {
      metatype: NodeMetatypeEnum.Single,
      type: SingleNodeTypeEnum.Boolean,
      value: node.toLocaleString(),
    };
  } else if (typeof node === 'symbol') {
    nodeDescription = {
      metatype: NodeMetatypeEnum.Single,
      type: SingleNodeTypeEnum.Symbol,
      value: node.toLocaleString(),
      icon: {text:'<S>', centerId: 1},
    };
  } else if (node === null) {
    nodeDescription = {
      metatype: NodeMetatypeEnum.Single,
      type: SingleNodeTypeEnum.Null,
      value: 'NULL',
    };
  } else if (node === undefined) {
    nodeDescription = {
      metatype: NodeMetatypeEnum.Single,
      type: SingleNodeTypeEnum.Undefined,
      value: 'UNDEFINED',
    };
  } else if (Array.isArray(node)) {
    nodeDescription = {
      metatype: NodeMetatypeEnum.Enumerable,
      type: EnumerableNodeTypeEnum.Array,
      subEntries: node.map((sub, subId) => [subId, sub]),
      value: '',
      icon: {text:'[ ]', centerId: 1}};
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
        metatype: NodeMetatypeEnum.Enumerable,
        type: EnumerableNodeTypeEnum.Object,
        subEntries: Object.entries(node),
        value: nodeValue,
        icon: {text:'{ }', centerId: 1}};
    } else {
      let nodeValue: string;
      if (nodeCustomObjectString) {
        nodeValue = nodeCustomObjectString;
      } else {
        nodeValue = 'DETAILLESS OBJECT';
      }
      nodeDescription = {
        metatype: NodeMetatypeEnum.Enumerable,
        type: EnumerableNodeTypeEnum.Unknown,
        value: nodeValue,
        icon: {text:'{X}', centerId: 1},
        subEntries: [],
      };
    }
  } else {
    nodeDescription = {
      metatype: NodeMetatypeEnum.Single,
      type: SingleNodeTypeEnum.Unknown,
      value: (typeof node).toLocaleUpperCase(),
      icon: {text:'<X>', centerId: 1},
    };
  }

  if (nodeDescription.metatype === NodeMetatypeEnum.Enumerable) {
    const itemsShownCount = Math.min(currentLevelMaxItems, nodeDescription.subEntries.length);
    if (nodeDescription.subEntries.length > itemsShownCount) {
      nodeDescription.info = `${itemsShownCount} shown of ${nodeDescription.subEntries.length} total`;
    } else {
      nodeDescription.info = `${nodeDescription.subEntries.length} entries`;
    }
  }
  if (nodeDescription.metatype === NodeMetatypeEnum.Enumerable) {
    nodeDescription.subEntries.forEach(([subEntryKey, subEntry]) => {
      // TODO limits
      const subMetaNode = buildDescriptionTreeRecursive(subEntryKey, subEntry, level + 1, settings);
      buildedMetaNode.children.push(subMetaNode);
    });
  }
  return buildedMetaNode;
}
