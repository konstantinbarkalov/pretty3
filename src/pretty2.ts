/* eslint-disable @typescript-eslint/no-explicit-any */
import { StrictUnicodeLine, StrictUnicodeText } from './text/strictUnicode';
import { Style } from './text/style';
import { AtomicTextContainer, FlatNonatomicTextContainer } from './text/textContainer';
import { buildMetaTreeSettingsT, renderTreeSettingsT, renderTreeOptionsT } from './interfaces/general';
import { MetaNode } from './meta/node';
import { MatrixDrivenArmGenerator, MatrixDrivenArmWidthGenerator } from './meta/matrix/matrixDrivenArmGenerator';
import { ArmPatternMatrix } from './meta/matrix/armPatternMatrix';
import { spacedArmWidthT } from './meta/interfaces/arm/armWidth';
import { ArmWidthMatrix } from './meta/matrix/armWidthMatrix';
import { anyNodeDescriptionT, NodeMetatypeEnum, SingleNodeTypeEnum, EnumerableNodeTypeEnum } from './interfaces/nodeDescription';
import { AnsiRenderer } from './text/renderer/implementation';
import { renderMetaNode } from './meta/render/render';

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


const armPatternMatrix = ArmPatternMatrix.fromArray([
  '┬─)', '│  ', '│  ',
  '┬─>', '│  ', '│  ',
  '├──', '│  ', '│  ',
  '├──', '│  ', '│  ',
  '└──', '   ', '   ',
], treeStyle.branch);

const armWidth: spacedArmWidthT = {preSpace: 1, postSpace: 1, arm: 4};
const smallArmWidth: spacedArmWidthT = {preSpace: 1, postSpace: 1, arm: 8};
const armWidthMatrix = ArmWidthMatrix.fromArray([
  0,        0,        0,
  0,        smallArmWidth, smallArmWidth,
  armWidth, armWidth, armWidth,
  armWidth, armWidth, armWidth,
  armWidth, armWidth, armWidth,
]);


const newDefaultSettings: renderTreeSettingsT = {
  renderer: new AnsiRenderer(),
  logLineCallback: (line) => { console.log(line); },
  maxLevel: 6,
  maxItemsPerLevel: [30, 10],
  maxLineWidth: 80,
  arrayTemplate: {
    armGenerator: new MatrixDrivenArmGenerator(armPatternMatrix),
    armWidthGenerator: new MatrixDrivenArmWidthGenerator(armWidthMatrix),
  },
  objectTemplate: {
    armGenerator: new MatrixDrivenArmGenerator(armPatternMatrix),
    armWidthGenerator: new MatrixDrivenArmWidthGenerator(armWidthMatrix),
  },
};
export function buildMetaTree(tree: any, settings: buildMetaTreeSettingsT ): MetaNode {
  return buildMetaTreeRecursive(undefined, tree, 0, settings);
}

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
  const leaf = buildLeaf(nodeKey, nodeDescription);
  const buildedMetaNode = new MetaNode(leaf, settings.objectTemplate.armGenerator, settings.objectTemplate.armWidthGenerator);
  if (nodeDescription.metatype === NodeMetatypeEnum.Enumerable) {
    nodeDescription.subEntries.forEach(([subEntryKey, subEntry]) => {
      const subMetaNode = buildMetaTreeRecursive(subEntryKey, subEntry, level + 1, settings);
      buildedMetaNode.children.push(subMetaNode);
    });
  }
  return buildedMetaNode;
}


function buildLeaf(nodeKey: string | number | undefined, nodeDescription: anyNodeDescriptionT): FlatNonatomicTextContainer<StrictUnicodeText> {
  const space = new AtomicTextContainer(new StrictUnicodeLine(' '));
  const children: AtomicTextContainer[] = [];
  if (nodeDescription.icon) {
    children.push(new AtomicTextContainer(new StrictUnicodeLine(nodeDescription.icon.text), treeStyle.icon));
    children.push(space);
  }
  if (nodeKey !== undefined) {
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

export function renderTree(tree: any, options?: renderTreeOptionsT ): void {
  const settings = Object.assign({}, newDefaultSettings, options);
  const metaTree = buildMetaTree(tree, settings);
  renderMetaNode(metaTree, settings.maxLineWidth, settings.renderer, settings.logLineCallback);
}