import { buildMetaTreeSettingsT } from './interfaces/general';
import { nodeDescriptionKeyT, nodeDescriptionT, guardNodeDescription } from './interfaces/nodeDescription';
import { NodeMetatypeEnum, SingleNodeTypeEnum, EnumerableNodeTypeEnum, DeadNodeTypeEnum } from './interfaces/nodeType';

type TypedArrayT =
  Int8Array |
  Uint8Array |
  Uint8ClampedArray |
  Int16Array |
  Uint16Array |
  Int32Array |
  Uint32Array |
  Float32Array |
  Float64Array |
  BigInt64Array |
  BigUint64Array;

const TypedArray = Object.getPrototypeOf(Int8Array);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildDescriptionTreeRecursive(nodeKey: any, node: any, level: number, settings: buildMetaTreeSettingsT): nodeDescriptionT {
  const currentLevelMaxItems = (level >= settings.maxLevel)
    ? 0
    : Array.isArray(settings.maxItemsPerLevel)
      ? settings.maxItemsPerLevel[Math.min(level, settings.maxItemsPerLevel.length - 1)]
      : settings.maxItemsPerLevel;
  let nodeDescription: nodeDescriptionT;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let unwrappedSubEntries: [nodeDescriptionKeyT, any][] = [];
  if (node === undefined) {
    nodeDescription = {
      key: nodeKey,
      typeTuple: [NodeMetatypeEnum.Single, SingleNodeTypeEnum.Undefined],
      value: 'UNDEFINED',
    };
  } else if (node === null) {
    nodeDescription = {
      key: nodeKey,
      typeTuple: [NodeMetatypeEnum.Single, SingleNodeTypeEnum.Null],
      value: 'NULL',
    };
  } else if (typeof node === 'string') {
    nodeDescription = {
      key: nodeKey,
      typeTuple: [NodeMetatypeEnum.Single, SingleNodeTypeEnum.String],
      value: node,
    };
  }
  else if (typeof node === 'number') {
    nodeDescription = {
      key: nodeKey,
      typeTuple: [NodeMetatypeEnum.Single, SingleNodeTypeEnum.Number],
      value: parseFloat(node.toPrecision(6)).toLocaleString(),
    };
  }
  else if (typeof node === 'bigint') {
    nodeDescription = {
      key: nodeKey,
      typeTuple: [NodeMetatypeEnum.Single, SingleNodeTypeEnum.BigInt],
      value: node.toLocaleString(),
    };
  }
  else if (typeof node === 'boolean') {
    nodeDescription = {
      key: nodeKey,
      typeTuple: [NodeMetatypeEnum.Single, SingleNodeTypeEnum.Boolean],
      value: node.toLocaleString(),
    };
  }
  else if (typeof node === 'symbol') {
    nodeDescription = {
      key: nodeKey,
      typeTuple: [NodeMetatypeEnum.Single, SingleNodeTypeEnum.Symbol],
      value: node.toLocaleString(),
    };
  }
  else if (typeof node === 'function') {
    nodeDescription = {
      key: nodeKey,
      typeTuple: [NodeMetatypeEnum.Single, SingleNodeTypeEnum.Function],
      value: node.name,
    };
  }
  else if (Array.isArray(node)) {
    nodeDescription = {
      key: nodeKey,
      typeTuple: [NodeMetatypeEnum.Enumerable, EnumerableNodeTypeEnum.Array],
      value: '',
      subEntries: [],
    };
    unwrappedSubEntries = node.map((sub, subId) => [subId, sub]);
  }
  else if (typeof node === 'object' && node) {
    let nodeCustomObjectString;
    if (node.toLocaleString) {
      const jsObjectString = node.toLocaleString();
      if (jsObjectString !== '[object Object]') {
        nodeCustomObjectString = jsObjectString;
      }
    }
    if (node instanceof String) {
      nodeDescription = {
        key: nodeKey,
        typeTuple: [NodeMetatypeEnum.Single, SingleNodeTypeEnum.StringObject],
        value: node.toLocaleString(),
      };
    } else if (node instanceof Number) {
      nodeDescription = {
        key: nodeKey,
        typeTuple: [NodeMetatypeEnum.Single, SingleNodeTypeEnum.NumberObject],
        value: node.toLocaleString(),
      };
    } else if (node instanceof Boolean) {
      nodeDescription = {
        key: nodeKey,
        typeTuple: [NodeMetatypeEnum.Single, SingleNodeTypeEnum.BooleanObject],
        value: node.toLocaleString(),
      };
    } else if (node instanceof Date) {
      nodeDescription = {
        key: nodeKey,
        typeTuple: [NodeMetatypeEnum.Single, SingleNodeTypeEnum.Date],
        value: node.toLocaleString(),
      };
    } else if (node instanceof TypedArray) {
      nodeDescription = {
        key: nodeKey,
        typeTuple: [NodeMetatypeEnum.Enumerable, EnumerableNodeTypeEnum.TypedArray],
        value: node.toLocaleString(),
        subEntries: [],
      };
      const typedArray = node as TypedArrayT;
      const array = Array.from<number | bigint>(typedArray);
      unwrappedSubEntries = array.map((sub, subId) => {return [subId, sub];});
    } else if (node.hasOwnProperty) {
      let nodeValue: string;
      if (nodeCustomObjectString) {
        nodeValue = nodeCustomObjectString;
      }
      else {
        nodeValue = ''; // TODO!!
      }
      nodeDescription = {
        key: nodeKey,
        typeTuple: [NodeMetatypeEnum.Enumerable, EnumerableNodeTypeEnum.Object],
        subEntries: [],
        value: nodeValue,
      };
      unwrappedSubEntries = Object.entries(node);
    } else {
      let nodeValue: string;
      if (nodeCustomObjectString) {
        nodeValue = nodeCustomObjectString;
      }
      else {
        nodeValue = 'DETAILLESS OBJECT';
      }
      nodeDescription = {
        key: nodeKey,
        typeTuple: [NodeMetatypeEnum.Enumerable, EnumerableNodeTypeEnum.Unknown],
        value: nodeValue,
        subEntries: [],
      };
      unwrappedSubEntries = [];
    }
  }
  else {
    nodeDescription = {
      key: nodeKey,
      typeTuple: [NodeMetatypeEnum.Single, SingleNodeTypeEnum.Unknown],
      value: (typeof node).toLocaleUpperCase(),
    };
  }
  if (guardNodeDescription(NodeMetatypeEnum.Enumerable, nodeDescription)) {
    const itemsShownCount = Math.min(currentLevelMaxItems, unwrappedSubEntries.length);
    for (let i = 0; i < itemsShownCount; i++) {
      const [subEntryKey, subEntry] = unwrappedSubEntries[i];
      // TODO limits ??
      const childDesctiption = buildDescriptionTreeRecursive(subEntryKey, subEntry, level + 1, settings);
      nodeDescription.subEntries.push(childDesctiption);
    }
    if (nodeDescription.subEntries.length < unwrappedSubEntries.length) {
      const elipsisDescription: nodeDescriptionT<NodeMetatypeEnum.Dead> = {
        typeTuple: [NodeMetatypeEnum.Dead, DeadNodeTypeEnum.Elipsis],
      };
      nodeDescription.subEntries.push(elipsisDescription);
    }
    if (nodeDescription.subEntries.length < unwrappedSubEntries.length) {
      nodeDescription.info = `${nodeDescription.subEntries.length} shown of ${unwrappedSubEntries.length} total`;
    }
    else {
      nodeDescription.info = `${nodeDescription.subEntries.length} entries`;
    }
  }
  return nodeDescription;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildDescriptionTree(nodeKey: any, node: any, settings: buildMetaTreeSettingsT): nodeDescriptionT {
  return buildDescriptionTreeRecursive(nodeKey, node, 0, settings);
}