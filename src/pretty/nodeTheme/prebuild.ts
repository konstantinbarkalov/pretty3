import { nodeThemeT, nodeBasicItemThemeT, nodePredefinableItemThemeT, nodeSuffixedSemipredefinableItemThemeT, themeT } from '../interfaces/theme';
import { nodeItemPrebuildedThemeT, nodePredefinableItemPrebuildedThemeT, nodeSuffixedSemipredefinableItemPrebuildedThemeT, nodePrebuildedThemeT } from '../interfaces/prebuildedTheme';
import { AtomicTextContainer, FlatNonatomicTextContainer } from '../../text/textContainer';
import { StrictUnicodeLine } from '../../text/strictUnicode';
import { spacedArmWidthT } from '../../meta/interfaces/arm/armWidth';
import { MatrixDrivenArmGenerator, MatrixDrivenArmWidthGenerator } from '../../meta/matrix/matrixDrivenArmGenerator';
import { ArmPatternMatrix } from '../../meta/matrix/armPatternMatrix';
import { ArmWidthMatrix } from '../../meta/matrix/armWidthMatrix';
import { NodeBroadTypeEnum, DeadNodeFineTypeEnum, NodeFineTypeEnumT, EnumerableNodeFineTypeEnum, IterableNodeFineTypeEnum, SingleNodeFineTypeEnum, nodeTypeTupleT } from '../interfaces/nodeType';
import { getFromTypeDependentPartialDictionary, getFromTypeDependentBroadOnlyPartialDictionary, typeDependentDictionaryT, typeDependentPartialDictionaryT, typeDependentPartialFineDictionaryT } from '../typeDependentDictionary';

// deep-assign and collapse
type mapFilterCallbackfnT<TIn, TOut> = (input: TIn) => TOut | undefined;

function mapFilterUndefined<TIn, TOut>(array: TIn[], callbackfn: mapFilterCallbackfnT<TIn, TOut>): TOut[] {
  // typecheck workaround
  const mapped = array.map(callbackfn);
  function filterFn<T>(element: T | undefined): element is T {
    return element !== undefined;
  }
  const filtered = mapped.filter<TOut>(filterFn);
  return filtered;
}
function collapseStack<T>(stack: T[]): T | undefined {
  let collapsed: T | undefined;
  if (stack.length > 0) {
    collapsed = Object.assign({}, ...stack);
  }
  return collapsed;
}
function mapFilterCollapseStack<TIn, TOut>(stack: TIn[], callbackfn: mapFilterCallbackfnT<TIn, TOut>): TOut | undefined {
  const filteredStack = mapFilterUndefined<TIn, TOut>(stack, callbackfn);
  const collapsed = collapseStack<TOut>(filteredStack);
  return collapsed;

}

function collapseNodeThemeStack(nodeThemeStack: nodeThemeT[]): nodeThemeT {
  // root
  const flatCollapsed: nodeThemeT = Object.assign({}, ...nodeThemeStack);

  // arm
  flatCollapsed.arm = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.arm);

  // icon
  flatCollapsed.icon = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.icon);

  if (flatCollapsed.icon) {
    // icon.prefix
    flatCollapsed.icon.prefix = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.icon?.prefix);
    // icon.content
    flatCollapsed.icon.content = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.icon?.content);
    // icon.postfix
    flatCollapsed.icon.postfix = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.icon?.postfix);
  }

  // keyDelimiter
  flatCollapsed.keyDelimiter = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.keyDelimiter);


  // key
  flatCollapsed.key = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.key);

  if (flatCollapsed.key) {
    // key.prefix
    flatCollapsed.key.prefix = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.key?.prefix);
    // key.content
    flatCollapsed.key.content = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.key?.content);
    // key.postfix
    flatCollapsed.key.postfix = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.key?.postfix);
  }

  // valueDelimiter
  flatCollapsed.valueDelimiter = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.valueDelimiter);

  // value
  flatCollapsed.value = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.value);

  if (flatCollapsed.value) {
    // value.prefix
    flatCollapsed.value.prefix = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.value?.prefix);
    // value.content
    flatCollapsed.value.content = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.value?.content);
    // value.postfix
    flatCollapsed.value.postfix = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.value?.postfix);
  }

  // infoDelimiter
  flatCollapsed.infoDelimiter = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.infoDelimiter);

  // info
  flatCollapsed.info = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.info);

  if (flatCollapsed.info) {
    // info.prefix
    flatCollapsed.info.prefix = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.info?.prefix);
    // info.content
    flatCollapsed.info.content = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.info?.content);
    // info.postfix
    flatCollapsed.info.postfix = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.info?.postfix);
  }

  // remarkDelimiter
  flatCollapsed.remarkDelimiter = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.remarkDelimiter);

  // remark
  flatCollapsed.remark = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.remark);

  if (flatCollapsed.remark) {
    // remark.prefix
    flatCollapsed.remark.prefix = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.remark?.prefix);
    // remark.content
    flatCollapsed.remark.content = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.remark?.content);
    // remark.postfix
    flatCollapsed.remark.postfix = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.remark?.postfix);
  }
  return flatCollapsed;
}




// node theme prebuild
function prebuildItemTheme(itemTheme: nodeBasicItemThemeT): nodeItemPrebuildedThemeT | false | undefined {
  if (itemTheme) {
    if (itemTheme.visibility === false) {
      return false;
    } else {
      const style = itemTheme.style;
      return { style };
    }
  }
  return undefined;
}

function prebuildPredefinableItemTheme(itemTheme: nodePredefinableItemThemeT): nodePredefinableItemPrebuildedThemeT | false | undefined {
  if (itemTheme) {
    if (itemTheme.visibility === false) {
      return false;
    } else {
      if (itemTheme.line) {
        const container = new AtomicTextContainer(new StrictUnicodeLine(itemTheme.line), itemTheme.style);
        return { container };
      }
    }
  }
  return undefined;
}

function prebuildNodeSuffixedSemipredefinableItemTheme(suffixedItemTheme: nodeSuffixedSemipredefinableItemThemeT): nodeSuffixedSemipredefinableItemPrebuildedThemeT | false | undefined {
  if (suffixedItemTheme) {
    if (suffixedItemTheme.visibility === false) {
      return false;
    }
    let prebuidedPrefix;
    let prebuidedContent;
    let prebuidedPostfix;
    if (suffixedItemTheme.prefix) {
      prebuidedPrefix = prebuildPredefinableItemTheme(suffixedItemTheme.prefix) || undefined;
    }
    if (suffixedItemTheme.content) {
      prebuidedContent = prebuildItemTheme(suffixedItemTheme.content) || undefined;
    }
    if (suffixedItemTheme.postfix) {
      prebuidedPostfix = prebuildPredefinableItemTheme(suffixedItemTheme.postfix) || undefined;
    }
    const prebuilded = { prefix: prebuidedPrefix, content: prebuidedContent, postfix: prebuidedPostfix};
    return prebuilded;
  }
  return undefined;
}

function prebuildIconNodeTheme(nodeIconTheme: nodeThemeT['icon']): nodePrebuildedThemeT['icon'] | undefined {
  if (nodeIconTheme) {
    if (nodeIconTheme.visibility) {
      const chars = [
        nodeIconTheme.chars?.[0],
        nodeIconTheme.chars?.[1],
        nodeIconTheme.chars?.[2],
      ];
      const hasAnyChars = chars.some((char) => !!char);
      if (hasAnyChars) {
        const atomics =[];
        if (chars[0]) {
          atomics.push(new AtomicTextContainer(new StrictUnicodeLine(chars[0]), nodeIconTheme.prefix?.style));
        }
        if (chars[1]) {
          atomics.push(new AtomicTextContainer(new StrictUnicodeLine(chars[1]), nodeIconTheme.content?.style));
        }
        if (chars[2]) {
          atomics.push(new AtomicTextContainer(new StrictUnicodeLine(chars[2]), nodeIconTheme.postfix?.style));
        }
        const container = new FlatNonatomicTextContainer(atomics);
        return { container };
      }
    }
  }
  return undefined;
}

function prebuildArmNodeTheme(nodeArmTheme: nodeThemeT['arm']): nodePrebuildedThemeT['arm'] | undefined {
  if (nodeArmTheme) {
    const armStyle = nodeArmTheme.style;
    if (nodeArmTheme.width !== undefined) {
      const armWidth = nodeArmTheme.width;
      const spacedArmWidth: spacedArmWidthT = { preSpace: 1, arm: armWidth, postSpace: 1 };
      const fertileLeafNonfirstLineSpacedArmWidth = { preSpace: 1, arm: 0, postSpace: 1 };
      return {
        armGenerator: new MatrixDrivenArmGenerator(ArmPatternMatrix.fromCommonChars('qwe','sdf','dfg', armStyle)),
        armWidthGenerator: new MatrixDrivenArmWidthGenerator(ArmWidthMatrix.fromCommonWidth(spacedArmWidth, fertileLeafNonfirstLineSpacedArmWidth)),
      };
    }
  }

  return undefined;
}
export function prebuildNodeTheme(themeStack: nodeThemeT[], fallback: nodePrebuildedThemeT): nodePrebuildedThemeT {
  const nodeTheme = collapseNodeThemeStack(themeStack);
  const prebuilded: nodePrebuildedThemeT = {
    arm: prebuildArmNodeTheme(nodeTheme.arm) || fallback.arm,
    icon: prebuildIconNodeTheme(nodeTheme.icon) || fallback.icon,
    key: prebuildNodeSuffixedSemipredefinableItemTheme(nodeTheme.key) || fallback.key,
    valueDelimiter: prebuildPredefinableItemTheme(nodeTheme.valueDelimiter) || fallback.valueDelimiter,
    value: prebuildNodeSuffixedSemipredefinableItemTheme(nodeTheme.value) || fallback.value,
    infoDelimiter: prebuildPredefinableItemTheme(nodeTheme.infoDelimiter) || fallback.infoDelimiter,
    info: prebuildNodeSuffixedSemipredefinableItemTheme(nodeTheme.info) || fallback.info,
    remarkDelimiter: prebuildPredefinableItemTheme(nodeTheme.remarkDelimiter) || fallback.remarkDelimiter,
    remark: prebuildNodeSuffixedSemipredefinableItemTheme(nodeTheme.remark) || fallback.remark,
  };
  return prebuilded;
}

export function prebuildTheme(themeStack: themeT[], fallback: nodePrebuildedThemeT): typeDependentDictionaryT<nodePrebuildedThemeT> {
  const prebuildedThemePartial: typeDependentPartialDictionaryT<nodePrebuildedThemeT> = {};
  const broadKeys = Object.values(NodeBroadTypeEnum);
  for (const broadKeySting of broadKeys) {
    const broadType = broadKeySting as NodeBroadTypeEnum;

    const prebuildedThemeFinePartial: typeDependentPartialFineDictionaryT<NodeBroadTypeEnum, nodePrebuildedThemeT> = {};

    let fineEnum;
    switch (broadType) {
    case NodeBroadTypeEnum.Dead:
      fineEnum = DeadNodeFineTypeEnum;
      break;
    case NodeBroadTypeEnum.Enumerable:
      fineEnum = EnumerableNodeFineTypeEnum;
      break;
    case NodeBroadTypeEnum.Iterable:
      fineEnum = IterableNodeFineTypeEnum;
      break;
    case NodeBroadTypeEnum.Single:
      fineEnum = SingleNodeFineTypeEnum;
      break;
    }
    const fineKeys = Object.values(fineEnum);
    for (const fineTypeSting of fineKeys) {
      const fineType = fineTypeSting as NodeFineTypeEnumT;
      const typeTuple = [broadType, fineType] as nodeTypeTupleT;
      const qwe: nodeThemeT[] = [];
      themeStack.forEach((theme) => {
        if (theme.fine) {
          const fine = getFromTypeDependentPartialDictionary(theme.fine, typeTuple);
          if (fine) {
            qwe.push(fine);
          }
        }
        if (theme.broad) {
          const broad = getFromTypeDependentBroadOnlyPartialDictionary(theme.broad, broadType);
          if (broad) {
            qwe.push(broad);
          }
        }
        if (theme.global) {
          qwe.push(theme.global);
        }
        theme.global;
      });
      prebuildedThemeFinePartial[fineType] = prebuildNodeTheme(qwe, fallback);
    }
    prebuildedThemePartial[broadType] = prebuildedThemeFinePartial;
  }
  return prebuildedThemePartial as typeDependentDictionaryT<nodePrebuildedThemeT>;
}