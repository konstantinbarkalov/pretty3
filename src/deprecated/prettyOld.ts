/* eslint-disable @typescript-eslint/no-explicit-any */
import defaultSettings from './defaultSettingsOld';
import { Renderer } from '../text/renderer/abstract/renderer';
import { StrictUnicodeLine, StrictUnicodeText } from '../text/strictUnicode';
import { Style } from '../text/style';
import { AtomicTextContainer, FlatNonatomicTextContainer, AnyTextContainer } from '../text/textContainer';
import { itemTextPatternT, logLineCallbackT, maxLineWidthT, paddingPrefixT, printTreeOptionsOldT, printTreeSettingsOldT, stringifyTreeOptionsOldT, textPatternString, textPatternStringT, textPatternT } from './generalOld';
import { anyNodeDescriptionT, EnumerableNodeTypeEnum, NodeMetatypeEnum, SingleNodeTypeEnum } from './nodeDescriptionOld';


const treeStyleColors = {
  green: {r: 80, g: 160, b: 80},
  darkGreen: {r: 64, g: 128, b: 64},
  blue: {r: 160, g: 160, b: 220},
  darkGray: {r: 64, g: 64, b: 64},
  gray: {r: 128, g: 128, b: 128},
  lightGray: {r: 192, g: 192, b: 192},
  white: {r: 255, g: 255, b: 255},
};

const treeStyle = {
  icon: new Style(treeStyleColors.green),
  dim: new Style(treeStyleColors.darkGray),
  key: new Style(treeStyleColors.green),
  keyDots: new Style(treeStyleColors.darkGreen),
  value: new Style(treeStyleColors.white),
  info: new Style(treeStyleColors.blue),
  branch: new Style(treeStyleColors.darkGray),
};
/**
 * Render formatted tree-representation of any javacript data to string.
 * Use options to customize output.
 *
 * @remarks
 *
 * Works same as `pretty.printTree`, but use predefined `logLineCallback`
 * for dumping output to `string`. Consider Using `pretty.printTree` if
 * you need a per-line callback model, or if you just want a simple oneliner
 * with default `options.logLineCallback`
 *
 * @remarks
 *
 * Cycle-referencing is allowed, while capping output
 * with finite `options.maxLevel` and `options.maxItemsPerLevel`.
 *
 * @export
 * @param {*} tree any javasctript entity
 * @param {stringifyTreeOptionsOldT} [options]
 * @see stringifyTreeOptionsT
 * @returns {string}
 */
export function stringifyTree(tree: any, options?: stringifyTreeOptionsOldT ): string {
  let outputString = '';
  const eol = (options && options.renderer) ? options.renderer.eol : defaultSettings.renderer.eol;
  const overridenOptionsLogLineCallback: logLineCallbackT = (line: string) => { outputString += line + eol ; };
  const overridenPrintTreeOptions: printTreeOptionsOldT = { logLineCallback: overridenOptionsLogLineCallback };
  const printTreeOptions = Object.assign({}, overridenPrintTreeOptions, options);
  printTree(tree, printTreeOptions);
  return outputString;
}

/**
 * Print formatted tree-representation of any javacript data. Use options
 * to customize output.
 *
 * @remarks
 *
 * Use `options.logLineCallback` for custom `console.log` handler, or
 * `pretty.stringifyTree` to render tree to a `string`.
 *
 * @remarks
 *
 * Cycle-referencing is allowed, while capping output
 * with finite `options.maxLevel` and `options.maxItemsPerLevel`.
 *
 * @export
 * @param {*} tree any javasctript entity
 * @param {printTreeOptionsOldT} [options]
 */
export function printTree(tree: any, options?: printTreeOptionsOldT ): void {
  const settings = Object.assign({}, defaultSettings, options);
  const emptyPaddingPrefix: paddingPrefixT = {
    first: new FlatNonatomicTextContainer<StrictUnicodeLine>([new AtomicTextContainer(new StrictUnicodeLine(''))]),
    other: new FlatNonatomicTextContainer<StrictUnicodeLine>([new AtomicTextContainer(new StrictUnicodeLine(''))]),
  };
  const emptyTextPattern: textPatternT = {
    first:  textPatternString('   '),
    other: textPatternString('   '),
  };
  printTreeRecursive(undefined, tree, 0, emptyPaddingPrefix, emptyTextPattern, true, settings);
}

function printTreeRecursive(
  nodeKey: string | number | undefined,
  node: any,
  level: number,
  basePaddingPrefix: paddingPrefixT,
  currentTextPattern: textPatternT,
  isFirst: boolean,
  settings: printTreeSettingsOldT ): void {

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
  const oneliner = buildOneliner(nodeKey, nodeDescription, isFirst);
  const width: widthT = {
    first: settings.tabSize,
    other: settings.tabSize,
  };
  if (nodeDescription.icon) {
    width.first -= nodeDescription.icon.centerId;
  }
  const currentPaddingPrefix = buildPaddingPrefix(basePaddingPrefix, currentTextPattern, settings.paddingSpace, width);
  printTextContainerWrapped(oneliner, currentPaddingPrefix, settings.maxLineWidth, settings.logLineCallback, settings.renderer);
  if (nodeDescription.metatype === NodeMetatypeEnum.Enumerable) {
    const itemsShownCount = Math.min(currentLevelMaxItems, nodeDescription.subEntries.length);
    let itemPattern: itemTextPatternT;
    const isArray = (nodeDescription.type === EnumerableNodeTypeEnum.Array);
    if (isArray) {
      itemPattern = settings.arrayItemTextPattern;
    } else {
      itemPattern = settings.objectItemTextPattern;
    }
    for (let subNodeIndex = 0; subNodeIndex < itemsShownCount; subNodeIndex++) {
      const subEntry = nodeDescription.subEntries[subNodeIndex];
      const [subNodeKey, subNode] = subEntry;
      let textPattern: textPatternT;
      const isLast = subNodeIndex === nodeDescription.subEntries.length - 1;
      if (!isLast) {
        textPattern = itemPattern.other;
      } else {
        textPattern = itemPattern.last;
      }
      const childrenPaddingPrefix = {
        first: currentPaddingPrefix.other,
        other: currentPaddingPrefix.other,
      };
      printTreeRecursive(subNodeKey, subNode, level + 1, childrenPaddingPrefix, textPattern, false, settings);
    }
    // elipsis at tail
    if (nodeDescription.subEntries.length > itemsShownCount) {
      const textPattern = itemPattern.last;
      const childrenPaddingPrefix = {
        first: currentPaddingPrefix.other,
        other: currentPaddingPrefix.other,
      };
      printEliplsisLine(childrenPaddingPrefix, textPattern, settings);
    }
  }
}

function printEliplsisLine(
  basePaddingPrefix: paddingPrefixT,
  currentTextPattern: textPatternT,
  settings: printTreeSettingsOldT ): void {
  const width: widthT = {
    first: settings.tabSize,
    other: settings.tabSize,
  };
  const currentPaddingPrefix = buildPaddingPrefix(basePaddingPrefix, currentTextPattern, settings.paddingSpace, width);
  const elipsisTextContainer = new AtomicTextContainer(new StrictUnicodeLine('...'));
  printTextContainerWrapped(elipsisTextContainer, currentPaddingPrefix, settings.maxLineWidth, settings.logLineCallback, settings.renderer);
}

function buildOneliner(nodeKey: string | number | undefined, nodeDescription: anyNodeDescriptionT, isFirst: boolean): FlatNonatomicTextContainer<StrictUnicodeText> {
  const space = new AtomicTextContainer(new StrictUnicodeLine(' '));
  const children: AtomicTextContainer[] = [];
  if (nodeDescription.icon) {
    children.push(new AtomicTextContainer(new StrictUnicodeLine(nodeDescription.icon.text), treeStyle.icon));
    children.push(space);
  }
  if (nodeKey !== undefined || !isFirst) {
    const nodeKeyString = nodeKey?.toString() || '';
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

function printTextContainerWrapped(textContainer: AnyTextContainer, paddingPrefix: paddingPrefixT, maxLineWidth: number, logLineCallback: logLineCallbackT, renderer: Renderer): void {
  const actualMaxLineWidth: maxLineWidthT = {
    first: maxLineWidth - paddingPrefix.first.calcSize().width.first,
    other: maxLineWidth - paddingPrefix.other.calcSize().width.first,
  };
  const wrapped = textContainer.wrap(actualMaxLineWidth.other, actualMaxLineWidth.other - actualMaxLineWidth.first).wrapped;
  const flat = wrapped.flatten();
  const flatLines = flat.splitToFlatLines();
  const message = flatLines.map((flatLine, flatLineId) => {
    const isFirst = (flatLineId === 0);
    const actualPaddingPrefix = isFirst ? paddingPrefix.first : paddingPrefix.other;
    const joinedLine = new FlatNonatomicTextContainer(actualPaddingPrefix.children.concat(flatLine.children));
    return renderer.renderFlatLine(joinedLine);
  }).join(renderer.eol);

  logLineCallback(message);
}

type widthT = {first: number; other: number};
function buildPaddingPrefix(basePaddingPrefix: paddingPrefixT, textPattern: textPatternT, paddingSpace: number, width: widthT): paddingPrefixT {

  const currentPaddingPrefix: paddingPrefixT = {
    first: new FlatNonatomicTextContainer(basePaddingPrefix.first.children.concat(new AtomicTextContainer(new StrictUnicodeLine(buildPaddingPrefixString(textPattern.first, paddingSpace, width.first)), treeStyle.branch))),
    other: new FlatNonatomicTextContainer(basePaddingPrefix.other.children.concat(new AtomicTextContainer(new StrictUnicodeLine(buildPaddingPrefixString(textPattern.other, paddingSpace, width.other)), treeStyle.branch))),
  };
  return currentPaddingPrefix;
}

function buildPaddingPrefixString(textPatternString: textPatternStringT, paddingSpace: number, width: number): string {
  const branchWidth = width - paddingSpace;
  const branchRepeatWidth = branchWidth - 2;
  if (branchRepeatWidth < 0) {
    throw new Error('branch is to short for that paddingSpace');
  }
  const paddingPrefixString = textPatternString[0] + textPatternString[1].repeat(branchRepeatWidth) + textPatternString[2] + ' '.repeat(paddingSpace);
  return paddingPrefixString;
}

