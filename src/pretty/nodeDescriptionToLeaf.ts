import { nodeDescriptionT, guardNodeDescription } from './interfaces/nodeDescription';
import { AtomicTextContainer, AnyTextContainer, NonatomicTextContainer } from '../text/textContainer';
import { StrictUnicodeText, StrictUnicodeLine } from '../text/strictUnicode';
import { theme } from './defaultTheme';
import { buildMetaTreeSettingsT } from './interfaces/general';
import { iconsetT, fullIconsetT } from './defaultFullIconset';
import { NodeBroadTypeEnum, SingleNodeFineTypeEnum, DeadNodeFineTypeEnum } from './interfaces/nodeType';
import { iconT } from './interfaces/icon';

function getIcon(nodeDescription: nodeDescriptionT, fullIconset: fullIconsetT): iconT | undefined {
  const [broadType, type] = nodeDescription.typeTuple;
  // dirty hack :( be carefaul, it disables some typechecks,
  // but works fine while fullIconsetT sticks to (meta) types enums
  // TODO: rework!!
  const iconset: iconsetT<NodeBroadTypeEnum> | undefined = fullIconset[broadType];
  if (iconset) {
    const icon = iconset[type];
    return icon;
  } else {
    return;
  }
}

export function nodeDescriptionToLeaf(nodeDescription: nodeDescriptionT, settings: buildMetaTreeSettingsT): NonatomicTextContainer<StrictUnicodeText> {
  type preparedContainerT = {
    icon?: AnyTextContainer;
    key?: AnyTextContainer;
    keyDelimiter?: AnyTextContainer;
    value?: AnyTextContainer;
    infoDelimiter?: AnyTextContainer;
    info?: AnyTextContainer;
  }
  const preparedContainer: preparedContainerT = { };

  preparedContainer.icon = getIcon(nodeDescription, settings.fullIconset);

  if (nodeDescription.key !== undefined) {
    const nodeKeyString = (nodeDescription.key.toString) ? nodeDescription.key.toString() : String(nodeDescription.key);
    preparedContainer.key = new AtomicTextContainer(new StrictUnicodeLine(nodeKeyString), theme.style.key);
  }

  if (guardNodeDescription(NodeBroadTypeEnum.Single, nodeDescription)
      && (nodeDescription.typeTuple[1] === SingleNodeFineTypeEnum.Function)) {
    preparedContainer.keyDelimiter = new AtomicTextContainer(new StrictUnicodeLine('()'), theme.style.keyDelimeter);
  } else {
    preparedContainer.keyDelimiter = new AtomicTextContainer(new StrictUnicodeLine(':'), theme.style.keyDelimeter);
  }

  if (guardNodeDescription(NodeBroadTypeEnum.Dead, nodeDescription)) {
    // TODO:
    if (nodeDescription.typeTuple[1] === DeadNodeFineTypeEnum.CircularReference) {
      preparedContainer.value = new AtomicTextContainer(new StrictUnicodeLine('CIRCULAR REFERENCE'), theme.style.warning);
    }
  } else {
    if (nodeDescription.value) {
      if (guardNodeDescription(NodeBroadTypeEnum.Single, nodeDescription)
          && (nodeDescription.typeTuple[1] === SingleNodeFineTypeEnum.Function)
          && (nodeDescription.key !== nodeDescription.value)) {
        preparedContainer.value = new NonatomicTextContainer([new AtomicTextContainer(new StrictUnicodeLine(nodeDescription.value)), new AtomicTextContainer(new StrictUnicodeLine('()'))], theme.style.value);
      } else {
        preparedContainer.value = new AtomicTextContainer(new StrictUnicodeLine(nodeDescription.value), theme.style.value);
      }
    }
  }
  if (nodeDescription.info) {
    preparedContainer.infoDelimiter = new AtomicTextContainer(new StrictUnicodeLine('/'), theme.style.infoDelimeter);
    preparedContainer.info = new AtomicTextContainer(new StrictUnicodeLine(nodeDescription.info), theme.style.info);
  }
  const space = new AtomicTextContainer(new StrictUnicodeLine(' '));
  const leafChildren: AnyTextContainer[] = [];
  let spaceNeed = false;
  if (preparedContainer.icon) {
    leafChildren.push(preparedContainer.icon);
    spaceNeed = true;
  }
  if (preparedContainer.key) {
    if (spaceNeed) { leafChildren.push(space); }
    leafChildren.push(preparedContainer.key);
    spaceNeed = true;
  }
  if (preparedContainer.keyDelimiter && preparedContainer.key && preparedContainer.value) {
    leafChildren.push(preparedContainer.keyDelimiter);
  }
  if (preparedContainer.value) {
    if (spaceNeed) { leafChildren.push(space); }
    leafChildren.push(preparedContainer.value);
    spaceNeed = true;
  }
  if (preparedContainer.infoDelimiter && preparedContainer.info) {
    if (spaceNeed) { leafChildren.push(space); }
    leafChildren.push(preparedContainer.infoDelimiter);
    spaceNeed = true;
  }
  if (preparedContainer.info) {
    if (spaceNeed) { leafChildren.push(space); }
    leafChildren.push(preparedContainer.info);
  }
  return new NonatomicTextContainer(leafChildren);
}
