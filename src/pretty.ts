import { EOL } from 'os';
import { printTreeSettingsT, stringifyTreeOptionsT, printTreeOptionsT, textPatternT, logLineCallbackT, itemTextPatternT } from './types/general';
import { defaultSettings } from './defaultSettings';
import { stringToWrappedLines } from './wrap';
import { anyNodeDescriptionT, NodeMetatypeEnum, SingleNodeTypeEnum, EnumerableNodeTypeEnum } from './types/nodeDescription';

export function stringifyTree(tree:any, options?:stringifyTreeOptionsT ):string {
  let outputString = '';
  let eol = (options && options.eol) ? options.eol : defaultSettings.eol;
  const overridenOptionsLogLineCallback = (line: string) => { outputString += line + eol ; };
  const overridenPrintTreeOptions:printTreeOptionsT = { logLineCallback: overridenOptionsLogLineCallback };
  const printTreeOptions = Object.assign({}, overridenPrintTreeOptions, options);
  printTree(tree, printTreeOptions);
  return outputString;
}

export function printTree(tree:any, options?:printTreeOptionsT ):void {
  const settings = Object.assign({}, defaultSettings, options);
  printTreeRecursive(undefined, tree, 0, {first: '', other: '', width:0}, true, settings);
}

function printTreeRecursive(nodeKey:string | number | undefined, node:any, level:number, paddingPrefix: textPatternT, isFirst: boolean, settings:printTreeSettingsT ):void {
  if (level > settings.maxLevel) {
    return;
  }
  let nodeDescription: anyNodeDescriptionT;
  if (typeof node === 'string') {
    nodeDescription = {
      metatype: NodeMetatypeEnum.Single,
      type: SingleNodeTypeEnum.String,
      value: node,
    }
  } else if (typeof node === 'number') {
    nodeDescription = {
      metatype: NodeMetatypeEnum.Single,
      type: SingleNodeTypeEnum.Number,
      value: parseFloat(node.toPrecision(6)).toLocaleString(),
    }
  } else if (typeof node === 'boolean') {
    nodeDescription = {
      metatype: NodeMetatypeEnum.Single,
      type: SingleNodeTypeEnum.Boolean,
      value: node.toLocaleString(),
    }
  } else if (node === null) {
    nodeDescription = {
      metatype: NodeMetatypeEnum.Single,
      type: SingleNodeTypeEnum.Null,
      value: 'NULL',
    }
  } else if (node === undefined) {
    nodeDescription = {
      metatype: NodeMetatypeEnum.Single,
      type: SingleNodeTypeEnum.Undefined,
      value: 'UNDEFINED',
    }
  } else if (Array.isArray(node)) {
    nodeDescription = {
      metatype: NodeMetatypeEnum.Enumerable,
      type: EnumerableNodeTypeEnum.Array,
      subEntries: node.map((sub, subId) => [subId, sub]),
      value: '',
      symbol: '[ ]',
    }
  } else if (typeof node === 'object' && node) {
    let nodeCustomObjectString;
    if (node.toLocaleString) {
      let jsObjectString = node.toLocaleString();
      if (jsObjectString !== '[object Object]') {
        nodeCustomObjectString = jsObjectString;
      }
    }
    if (node.hasOwnProperty) {
      let nodeValue: string;
      if (nodeCustomObjectString) {
        nodeValue = nodeCustomObjectString;
      } else {
        nodeValue = ''; // TODO MABE
      }
      nodeDescription = {
        metatype: NodeMetatypeEnum.Enumerable,
        type: EnumerableNodeTypeEnum.Object,
        subEntries: Object.entries(node),
        value: nodeValue,
        symbol: '{ }',
      }
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
        symbol: '{X}',
        subEntries: [],
      }
    }
  } else {
    nodeDescription = {
      metatype: NodeMetatypeEnum.Single,
      type: SingleNodeTypeEnum.Unknown,
      value: (typeof node).toLocaleUpperCase(),
      symbol: '<X>',
    }
  }

  if (nodeDescription.metatype === NodeMetatypeEnum.Enumerable) {
    const itemsShownCount = Math.min(settings.maxItemsAtLevel, nodeDescription.subEntries.length);
    if (nodeDescription.subEntries.length > itemsShownCount) {
      nodeDescription.info = `${itemsShownCount} shown of ${nodeDescription.subEntries.length} total`;
    } else {
      nodeDescription.info = `${nodeDescription.subEntries.length} entries`;
    }
  }
  let oneliner: string = '';
  if (nodeDescription.symbol) {
    oneliner += nodeDescription.symbol;
  }
  oneliner += ' ';
  if (nodeKey !== undefined || !isFirst) {
    oneliner += nodeKey;
    oneliner += ': ';

  }
  if (nodeDescription.value) {
    oneliner += nodeDescription.value;
    oneliner += ' ';
  }
  if (nodeDescription.info) {
    oneliner += nodeDescription.info;
  }
  printStringWrapped(oneliner, paddingPrefix, settings.maxLineWidth, settings.logLineCallback);

  if (nodeDescription.metatype === NodeMetatypeEnum.Enumerable) {
    const itemsShownCount = Math.min(settings.maxItemsAtLevel, nodeDescription.subEntries.length);
    for (let subNodeIndex = 0; subNodeIndex < itemsShownCount; subNodeIndex++) {
      const subEntry = nodeDescription.subEntries[subNodeIndex];
      const [subNodeKey, subNode] = subEntry;
      const isArray = (nodeDescription.type === EnumerableNodeTypeEnum.Array);
      let itemPattern: itemTextPatternT;
      if (isArray) {
        itemPattern = settings.arrayItemTextPattern;
      } else {
        itemPattern = settings.objectItemTextPattern;
      }
      let textPattern: textPatternT;
      const isLast = subNodeIndex === itemsShownCount - 1;
      if (!isLast) {
        textPattern = itemPattern.other;
      } else {
        textPattern = itemPattern.last;
      }
      const innerPaddingPrefix:textPatternT = {
        first: paddingPrefix.other + textPattern.first.padEnd(settings.tabSize),
        other: paddingPrefix.other + textPattern.other.padEnd(settings.tabSize),
        width: paddingPrefix.width + settings.tabSize,
      };
      printTreeRecursive(subNodeKey, subNode, level + 1, innerPaddingPrefix, false, settings);
    }
  }
}

function printStringWrapped(text:string, paddingPrefix:textPatternT, maxLineWidth:number, logLineCallback:logLineCallbackT) {
  let message = '';
  const actualMaxLineWidth = maxLineWidth - paddingPrefix.width;
  const lines = stringToWrappedLines(text, actualMaxLineWidth);
  for (let i = 0; i < lines.length; i++) {
    const isFirst = (i === 0);
    const isLast = (i === lines.length - 1);
    const line = lines[i];
    const br = isLast ? '' : EOL;
    const actualPaddingPrefix = isFirst ? paddingPrefix.first : paddingPrefix.other;
    message += actualPaddingPrefix + line + br;
  }
  logLineCallback(message);
}

