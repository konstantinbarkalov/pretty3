import { nodeThemeT, nodePredefinableItemThemeT, nodeItemThemeT, nodeSuffixedSemipredefinableItemThemeT } from '../interfaces/nodeTheme';
import { nodePrebuildedThemeT, nodePredefinableItemPrebuildedThemeT, nodeItemPrebuildedThemeT, nodeSuffixedSemipredefinableItemPrebuildedThemeT } from '../interfaces/nodePrebuildedTheme';
import { MatrixDrivenArmGenerator, MatrixDrivenArmWidthGenerator } from '../../meta/matrix/matrixDrivenArmGenerator';
import { ArmPatternMatrix } from '../../meta/matrix/armPatternMatrix';
import { ArmWidthMatrix } from '../../meta/matrix/armWidthMatrix';
import { spacedArmWidthT } from '../../meta/interfaces/arm/armWidth';
import { FlatNonatomicTextContainer, AtomicTextContainer } from '../../text/textContainer';
import { StrictUnicodeLine } from '../../text/strictUnicode';




function prebuildItemTheme(itemTheme: nodeItemThemeT | undefined): nodeItemPrebuildedThemeT | undefined {
  if (itemTheme) {
    if (itemTheme.isHidden) {
      const style = itemTheme.style;
      return { style };
    }
  }
  return undefined;
}

function prebuildPredefinableItemTheme(itemTheme: nodePredefinableItemThemeT | undefined): nodePredefinableItemPrebuildedThemeT | undefined {
  if (itemTheme) {
    if (itemTheme.isHidden) {
      if (itemTheme.line) {
        const atomics = [];
        atomics.push(new AtomicTextContainer(new StrictUnicodeLine(itemTheme.line), itemTheme.style));
        const container = new FlatNonatomicTextContainer(atomics);
        return { container };
      }
    }
  }
  return undefined;
}

function prebuildNodeSuffixedSemipredefinableItemTheme(suffixedItemTheme: nodeSuffixedSemipredefinableItemThemeT | undefined): nodeSuffixedSemipredefinableItemPrebuildedThemeT | undefined {
  if (suffixedItemTheme) {
    let prebuidedPrefix;
    let prebuidedContent;
    let prebuidedPostfix;
    if (suffixedItemTheme.prefix) {
      prebuidedPrefix = prebuildPredefinableItemTheme(suffixedItemTheme.prefix);
    }
    if (suffixedItemTheme.content) {
      prebuidedContent = prebuildItemTheme(suffixedItemTheme.content);
    }
    if (suffixedItemTheme.postfix) {
      prebuidedPostfix = prebuildPredefinableItemTheme(suffixedItemTheme.postfix);
    }
    if ( prebuidedPrefix ||
         prebuidedContent ||
         prebuidedPostfix) {
      const prebuilded = { prefix: prebuidedPrefix, content: prebuidedContent, postfix: prebuidedPostfix};
      return prebuilded;
    }
  }
  return undefined;
}

function prebuildIconNodeTheme(nodeIconTheme: nodeThemeT['icon']): nodePrebuildedThemeT['icon'] | undefined {
  if (nodeIconTheme) {
    if (!nodeIconTheme.isHidden) {
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

function prebuildNodeTheme(theme: nodeThemeT): nodePrebuildedThemeT {

  // root
  const armStyle = theme.arm?.style;
  const armWidth = (theme.arm?.width !== undefined) ? theme.arm.width : 12;
  const spacedArmWidth: spacedArmWidthT = { preSpace: 1, arm: armWidth, postSpace: 1 };
  const fertileLeafNonfirstLineSpacedArmWidth = { preSpace: 1, arm: 0, postSpace: 1 };

  const prebuilded: nodePrebuildedThemeT = {
    arm: {
      armGenerator: new MatrixDrivenArmGenerator(ArmPatternMatrix.fromCommonChars('qwe','sdf','dfg', armStyle)),
      armWidthGenerator: new MatrixDrivenArmWidthGenerator(ArmWidthMatrix.fromCommonWidth(spacedArmWidth, fertileLeafNonfirstLineSpacedArmWidth)),
    },
    icon: prebuildIconNodeTheme(theme.icon),
    key: prebuildNodeSuffixedSemipredefinableItemTheme(theme.key),
    valueDelimiter: prebuildPredefinableItemTheme(theme.valueDelimiter),
    value: prebuildNodeSuffixedSemipredefinableItemTheme(theme.value),
    infoDelimiter: prebuildPredefinableItemTheme(theme.infoDelimiter),
    info: prebuildNodeSuffixedSemipredefinableItemTheme(theme.info),
    remarkDelimiter: prebuildPredefinableItemTheme(theme.remarkDelimiter),
    remark: prebuildNodeSuffixedSemipredefinableItemTheme(theme.remark),
  };
  return prebuilded;
}

