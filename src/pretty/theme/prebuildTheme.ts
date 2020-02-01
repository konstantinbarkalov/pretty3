import { nodeThemeT, nodeBasicItemThemeT, nodePredefinableItemThemeT, nodeSuffixedSemipredefinableItemThemeT, themeT, nodeSuffixedPredefinableItemThemeT } from '../interfaces/theme';
import { nodeItemPrebuildedThemeT, nodePredefinableItemPrebuildedThemeT, nodeSuffixedSemipredefinableItemPrebuildedThemeT, nodePrebuildedThemeT, nodeSuffixedPredefinableItemPrebuildedThemeT } from '../interfaces/prebuildedTheme';
import { AtomicTextContainer } from '../../text/textContainer';
import { StrictUnicodeLine } from '../../text/strictUnicode';
import { spacedArmWidthT, armWidthT } from '../../meta/interfaces/arm/armWidth';
import { MatrixDrivenArmGenerator, MatrixDrivenArmWidthGenerator } from '../../meta/matrix/matrixDrivenArmGenerator';
import { ArmPatternMatrix } from '../../meta/matrix/armPatternMatrix';
import { ArmWidthMatrix } from '../../meta/matrix/armWidthMatrix';
import { NodeBroadTypeEnum, DeadNodeFineTypeEnum, NodeFineTypeEnumT, EnumerableNodeFineTypeEnum, IterableNodeFineTypeEnum, SingleNodeFineTypeEnum, nodeTypeTupleT } from '../interfaces/nodeType';
import { getFromTypeDependentPartialDictionary, getFromTypeDependentBroadOnlyPartialDictionary } from '../typeDependentDictionary';
import { typeDependentDictionaryT, typeDependentPartialDictionaryT, typeDependentPartialFineDictionaryT } from '../interfaces/typeDependentDictionary';

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
    // icon.predelimiter
    flatCollapsed.icon.predelimiter = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.icon?.predelimiter);
    // icon.prefix
    flatCollapsed.icon.prefix = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.icon?.prefix);
    // icon.content
    flatCollapsed.icon.content = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.icon?.content);
    // icon.postfix
    flatCollapsed.icon.postfix = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.icon?.postfix);
    // icon.postdelimiter
    flatCollapsed.icon.postdelimiter = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.icon?.postdelimiter);
  }


  // key
  flatCollapsed.key = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.key);

  if (flatCollapsed.key) {
    // key.predelimiter
    flatCollapsed.key.predelimiter = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.key?.predelimiter);
    // key.prefix
    flatCollapsed.key.prefix = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.key?.prefix);
    // key.content
    flatCollapsed.key.content = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.key?.content);
    // key.postfix
    flatCollapsed.key.postfix = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.key?.postfix);
    // key.postdelimiter
    flatCollapsed.key.postdelimiter = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.key?.postdelimiter);
  }

  // value
  flatCollapsed.value = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.value);

  if (flatCollapsed.value) {
    // value.predelimiter
    flatCollapsed.value.predelimiter = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.value?.predelimiter);
    // value.prefix
    flatCollapsed.value.prefix = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.value?.prefix);
    // value.content
    flatCollapsed.value.content = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.value?.content);
    // value.postfix
    flatCollapsed.value.postfix = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.value?.postfix);
    // value.postdelimiter
    flatCollapsed.value.postdelimiter = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.value?.postdelimiter);
  }

  // info
  flatCollapsed.info = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.info);

  if (flatCollapsed.info) {
    // info.predelimiter
    flatCollapsed.info.predelimiter = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.info?.predelimiter);
    // info.prefix
    flatCollapsed.info.prefix = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.info?.prefix);
    // info.content
    flatCollapsed.info.content = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.info?.content);
    // info.postfix
    flatCollapsed.info.postfix = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.info?.postfix);
    // info.postdelimiter
    flatCollapsed.info.postdelimiter = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.info?.postdelimiter);
  }

  // remark
  flatCollapsed.remark = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.remark);

  if (flatCollapsed.remark) {
    // remark.predelimiter
    flatCollapsed.remark.predelimiter = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.remark?.predelimiter);
    // remark.prefix
    flatCollapsed.remark.prefix = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.remark?.prefix);
    // remark.content
    flatCollapsed.remark.content = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.remark?.content);
    // remark.postfix
    flatCollapsed.remark.postfix = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.remark?.postfix);
    // remark.postdelimiter
    flatCollapsed.remark.postdelimiter = mapFilterCollapseStack(nodeThemeStack, (nodeTheme) => nodeTheme.remark?.postdelimiter);
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
    let prebuidedPredelimiter;
    let prebuidedPrefix;
    let prebuidedContent;
    let prebuidedPostfix;
    let prebuidedPostdelimiter;
    // TODO: deep fallback to prebuided-fallback subparts instead just not creating it if no theme for it
    if (suffixedItemTheme.predelimiter) {
      prebuidedPredelimiter = prebuildPredefinableItemTheme(suffixedItemTheme.predelimiter) || undefined;
    }
    if (suffixedItemTheme.prefix) {
      prebuidedPrefix = prebuildPredefinableItemTheme(suffixedItemTheme.prefix) || undefined;
    }
    if (suffixedItemTheme.content) {
      prebuidedContent = prebuildItemTheme(suffixedItemTheme.content) || undefined;
    }
    if (suffixedItemTheme.postfix) {
      prebuidedPostfix = prebuildPredefinableItemTheme(suffixedItemTheme.postfix) || undefined;
    }
    if (suffixedItemTheme.postdelimiter) {
      prebuidedPostdelimiter = prebuildPredefinableItemTheme(suffixedItemTheme.postdelimiter) || undefined;
    }

    const style = suffixedItemTheme.style;
    const prebuilded = { predelimiter: prebuidedPredelimiter, prefix: prebuidedPrefix, content: prebuidedContent, postfix: prebuidedPostfix, postdelimiter: prebuidedPostdelimiter, style };
    return prebuilded;
  }
  return undefined;
}

function prebuildNodeSuffixedPredefinableItemTheme(suffixedItemTheme: nodeSuffixedPredefinableItemThemeT): nodeSuffixedPredefinableItemPrebuildedThemeT | false | undefined {
  if (suffixedItemTheme) {
    if (suffixedItemTheme.visibility === false) {
      return false;
    }
    let prebuidedPredelimiter;
    let prebuidedPrefix;
    let prebuidedContent;
    let prebuidedPostfix;
    let prebuidedPostdelimiter;
    // TODO: deep fallback to prebuided-fallback subparts instead just not creating it if no theme for it
    if (suffixedItemTheme.predelimiter) {
      prebuidedPredelimiter = prebuildPredefinableItemTheme(suffixedItemTheme.predelimiter) || undefined;
    }
    if (suffixedItemTheme.prefix) {
      prebuidedPrefix = prebuildPredefinableItemTheme(suffixedItemTheme.prefix) || undefined;
    }
    if (suffixedItemTheme.content) {
      prebuidedContent = prebuildPredefinableItemTheme(suffixedItemTheme.content) || undefined;
    }
    if (suffixedItemTheme.postfix) {
      prebuidedPostfix = prebuildPredefinableItemTheme(suffixedItemTheme.postfix) || undefined;
    }
    if (suffixedItemTheme.postdelimiter) {
      prebuidedPostdelimiter = prebuildPredefinableItemTheme(suffixedItemTheme.postdelimiter) || undefined;
    }

    const style = suffixedItemTheme.style;
    const prebuilded = { predelimiter: prebuidedPredelimiter, prefix: prebuidedPrefix, content: prebuidedContent, postfix: prebuidedPostfix, postdelimiter: prebuidedPostdelimiter, style };
    return prebuilded;
  }
  return undefined;
}
function isSpacedArmWidth(armWidth: armWidthT): armWidth is spacedArmWidthT {
  return (typeof armWidth === 'object');

  //return armWidth.
}
function prebuildArmNodeTheme(nodeArmTheme: nodeThemeT['arm']): nodePrebuildedThemeT['arm'] | undefined {
  if (nodeArmTheme) {
    const armStyle = nodeArmTheme.style;
    if (nodeArmTheme.width !== undefined) {
      const armWidth = nodeArmTheme.width;

      let spacedArmWidth: spacedArmWidthT;
      if (isSpacedArmWidth(armWidth)) {
        spacedArmWidth = armWidth;
      } else {
        spacedArmWidth = { preSpace: 1, arm: armWidth, postSpace: 1 };
      }

      const fertileLeafNonfirstLineSpacedArmWidth = { preSpace: spacedArmWidth.preSpace, arm: Math.sign(spacedArmWidth.arm), postSpace: spacedArmWidth.postSpace };
      const commonChars = nodeArmTheme.commonChars;
      if (commonChars) {
        return {
          armGenerator: new MatrixDrivenArmGenerator(ArmPatternMatrix.fromCommonChars(commonChars[0], commonChars[1], commonChars[2], armStyle)),
          armWidthGenerator: new MatrixDrivenArmWidthGenerator(ArmWidthMatrix.fromCommonWidth(spacedArmWidth, fertileLeafNonfirstLineSpacedArmWidth)),
        };
      }

    }
  }
  return undefined;
}
export function prebuildNodeTheme(themeStack: nodeThemeT[], fallback: nodePrebuildedThemeT): nodePrebuildedThemeT {
  const nodeTheme = collapseNodeThemeStack(themeStack);
  const prebuilded: nodePrebuildedThemeT = {
    // TODO strictly check for false & hide if it is (check root nodeTheme.visibility too)
    arm: prebuildArmNodeTheme(nodeTheme.arm) || fallback.arm,
    icon: prebuildNodeSuffixedPredefinableItemTheme(nodeTheme.icon) || fallback.icon,
    key: prebuildNodeSuffixedSemipredefinableItemTheme(nodeTheme.key) || fallback.key,
    value: prebuildNodeSuffixedSemipredefinableItemTheme(nodeTheme.value) || fallback.value,
    info: prebuildNodeSuffixedSemipredefinableItemTheme(nodeTheme.info) || fallback.info,
    remark: prebuildNodeSuffixedSemipredefinableItemTheme(nodeTheme.remark) || fallback.remark,
    style: nodeTheme.style,
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
      const nodeThemeStack: nodeThemeT[] = [];
      themeStack.forEach((theme) => {
        if (theme.global) {
          nodeThemeStack.push(theme.global);
        }
        if (theme.broad) {
          const broad = getFromTypeDependentBroadOnlyPartialDictionary(theme.broad, broadType);
          if (broad) {
            nodeThemeStack.push(broad);
          }
        }
        if (theme.fine) {
          const fine = getFromTypeDependentPartialDictionary(theme.fine, typeTuple);
          if (fine) {
            nodeThemeStack.push(fine);
          }
        }


        theme.global;
      });
      prebuildedThemeFinePartial[fineType] = prebuildNodeTheme(nodeThemeStack, fallback);
    }
    prebuildedThemePartial[broadType] = prebuildedThemeFinePartial;
  }
  return prebuildedThemePartial as typeDependentDictionaryT<nodePrebuildedThemeT>;
}