
import { printTreeSettingsT, stringifyTreeOptionsT, printTreeOptionsT, textPatternT, logLineCallbackT, itemTextPatternT, paddingPrefixT, maxLineWidthT, textPatternStringT, textPatternString } from './types/general';
import { defaultSettings } from './defaultSettings';
import { anyNodeDescriptionT, NodeMetatypeEnum, SingleNodeTypeEnum, EnumerableNodeTypeEnum } from './types/nodeDescription';
import { AtomicTextContainer, TextContainer, FlatNonatomicTextContainer } from './sml4/textContainer';
import { Style } from './sml4/style';
import { Renderer } from './sml4/renderer/renderer';
import { StrictUnicodeLine, StrictUnicodeText } from './sml4/strictUnicode';

const treeStyleColors = {
  green: {r: 80, g: 160, b: 80},
  darkGreen: {r: 64, g: 128, b: 64},
  blue: {r: 160, g: 160, b: 220},
  darkGray: {r: 64, g: 64, b: 64},
  gray: {r: 128, g: 128, b: 128},
  lightGray: {r: 192, g: 192, b: 192},
  white: {r: 255, g: 255, b: 255},
}

const treeStyle = {
  icon: new Style(treeStyleColors.green),
  dim: new Style(treeStyleColors.darkGray),
  key: new Style(treeStyleColors.green),
  keyDots: new Style(treeStyleColors.darkGreen),
  value: new Style(treeStyleColors.white),
  info: new Style(treeStyleColors.blue),
  branch: new Style(treeStyleColors.darkGray),
}

export function stringifyTree(tree:any, renderer: Renderer, options?:stringifyTreeOptionsT ):string {
  let outputString = '';
  let eol = (options && options.eol) ? options.eol : defaultSettings.eol;
  const overridenOptionsLogLineCallback = (line: string) => { outputString += line + eol ; };
  const overridenPrintTreeOptions:printTreeOptionsT = { logLineCallback: overridenOptionsLogLineCallback };
  const printTreeOptions = Object.assign({}, overridenPrintTreeOptions, options);
  printTree(tree, renderer, printTreeOptions);
  return outputString;
}

export function printTree(tree:any, renderer: Renderer, options?:printTreeOptionsT ):void {
  const settings = Object.assign({}, defaultSettings, options);
  const emptyPaddingPrefix:paddingPrefixT = {first: '', other: ''};
  const emptyTextPattern:textPatternT = {
    first:  textPatternString('   '),
    other: textPatternString('   '),
  }
  printTreeRecursive(undefined, tree, 0, emptyPaddingPrefix, emptyTextPattern, true, renderer, settings);
}

function printTreeRecursive(nodeKey:string | number | undefined,
                            node:any,
                            level:number,
                            basePaddingPrefix: paddingPrefixT,
                            currentTextPattern: textPatternT,
                            isFirst: boolean,
                            renderer: Renderer,
                            settings:printTreeSettingsT ):void {
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
  } else if (typeof node === 'symbol') {
    nodeDescription = {
      metatype: NodeMetatypeEnum.Single,
      type: SingleNodeTypeEnum.Symbol,
      value: node.toLocaleString(),
      icon: {text:'<S>', centerId: 1},
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
      icon: {text:'[ ]', centerId: 1}}
  } else if (typeof node === 'object' && node) {
    let nodeCustomObjectString;
    if (node.toLocaleString) {
      let jsObjectString = node.toLocaleString();
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
      }
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
        icon: {text:'{ }', centerId: 1}}
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
      }
    }
  } else {
    nodeDescription = {
      metatype: NodeMetatypeEnum.Single,
      type: SingleNodeTypeEnum.Unknown,
      value: (typeof node).toLocaleUpperCase(),
      icon: {text:'<X>', centerId: 1},
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
  const oneliner = buildOneliner(nodeKey, nodeDescription, isFirst);
  const width:widthT = {
    first: settings.tabSize,
    other: settings.tabSize,
  }
  if (nodeDescription.icon) {
    width.first -= nodeDescription.icon.centerId;
  }
  const currentPaddingPrefix = buildPaddingPrefix(basePaddingPrefix, currentTextPattern, settings.paddingSpace, width, renderer);
  printTextContainerWrapped(oneliner, currentPaddingPrefix, settings.maxLineWidth, settings.logLineCallback, renderer);
  const childrenPaddingPrefix = {
    first: currentPaddingPrefix.other,
    other: currentPaddingPrefix.other,
  }
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
      printTreeRecursive(subNodeKey, subNode, level + 1, childrenPaddingPrefix, textPattern, false, renderer, settings);
    }
  }
}
function buildOneliner(nodeKey: string | number | undefined, nodeDescription:anyNodeDescriptionT, isFirst:boolean):FlatNonatomicTextContainer<StrictUnicodeText> {
  let space = new AtomicTextContainer(new StrictUnicodeLine(' '));
  let children:AtomicTextContainer[] = [];
  if (nodeDescription.icon) {
    children.push(new AtomicTextContainer(new StrictUnicodeLine(nodeDescription.icon.text), treeStyle.icon));
    children.push(space);
  }
  if (nodeKey !== undefined || !isFirst) {
    let nodeKeyString = nodeKey?.toString() || '';
    children.push(new AtomicTextContainer(new StrictUnicodeLine(nodeKeyString), treeStyle.key));
    children.push(new AtomicTextContainer(new StrictUnicodeLine(':'), treeStyle.keyDots));
    children.push(space);

  }
  if (nodeDescription.value) {
    children.push(new AtomicTextContainer(new StrictUnicodeText(nodeDescription.value)));
    children.push(space);
  }
  if (nodeDescription.info) {
    children.push(new AtomicTextContainer(new StrictUnicodeLine(nodeDescription.info), treeStyle.info));
    children.push(space);
  }
  return new FlatNonatomicTextContainer(children);
}

function printTextContainerWrapped(textContainer:TextContainer, paddingPrefix:paddingPrefixT, maxLineWidth:number, logLineCallback:logLineCallbackT, renderer:Renderer) {
  const actualMaxLineWidth:maxLineWidthT = {
    first: maxLineWidth - paddingPrefix.first.length,
    other: maxLineWidth - paddingPrefix.other.length,
  };
  const wrapped = textContainer.wrap(actualMaxLineWidth.other, actualMaxLineWidth.other - actualMaxLineWidth.first).wrapped;
  const flat = wrapped.flatten();
  const flatLines = flat.splitToFlatLines();
  const message = flatLines.map((flatLine, flatLineId) => {
    const isFirst = (flatLineId === 0);
    const actualPaddingPrefix = isFirst ? paddingPrefix.first : paddingPrefix.other;
    return actualPaddingPrefix + renderer.renderFlatLine(flatLine);
  }).join(renderer.eol);

  logLineCallback(message);
}
type widthT = {first:number, other:number};
function buildPaddingPrefix(basePaddingPrefix: paddingPrefixT, textPattern: textPatternT, paddingSpace:number, width: widthT, renderer: Renderer) {

  const currentPaddingPrefix:paddingPrefixT = {
    first: basePaddingPrefix.first + renderer.render(new AtomicTextContainer(new StrictUnicodeLine(buildPaddingPrefixString(textPattern.first, paddingSpace, width.first)), treeStyle.branch)),
    other: basePaddingPrefix.other + renderer.render(new AtomicTextContainer(new StrictUnicodeLine(buildPaddingPrefixString(textPattern.other, paddingSpace, width.other)), treeStyle.branch)),
  };
  return currentPaddingPrefix;
}
function buildPaddingPrefixString(textPatternString: textPatternStringT, paddingSpace: number, width: number):string {
  let branchWidth = width - paddingSpace;
  let branchRepeatWidth = branchWidth - 2;
  if (branchRepeatWidth < 0) {
    throw new Error('branch is to short for that paddingSpace');
  }
  let paddingPrefixString = textPatternString[0] + textPatternString[1].repeat(branchRepeatWidth) + textPatternString[2] + ' '.repeat(paddingSpace);
  return paddingPrefixString;
}