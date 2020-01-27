import { nodeDescriptionT, guardNodeDescription } from './interfaces/nodeDescription';
import { AtomicTextContainer, AnyTextContainer, NonatomicTextContainer } from '../text/textContainer';
import { StrictUnicodeText, StrictUnicodeLine } from '../text/strictUnicode';
import { theme } from './defaultTheme';
import { buildMetaTreeSettingsT } from './interfaces/general';
import { iconsetT } from './defaultFullIconset';
import { NodeMetatypeEnum } from './interfaces/nodeType';

export function nodeDescriptionToLeaf(nodeDescription: nodeDescriptionT, settings: buildMetaTreeSettingsT): NonatomicTextContainer<StrictUnicodeText> {
  const space = new AtomicTextContainer(new StrictUnicodeLine(' '));
  const children: AnyTextContainer[] = [];
  const [metatype, type] = nodeDescription.typeTuple;
  // dirty hack :( be carefaul, it disables some typechecks,
  // but works fine while fullIconsetT sticks to (meta) types enums
  // TODO: rework!!
  const iconset: iconsetT<NodeMetatypeEnum> = settings.fullIconset[metatype];
  const icon = iconset[type];
  if (icon) {
    children.push(icon);
    children.push(space);
  }
  if (guardNodeDescription(NodeMetatypeEnum.Dead, nodeDescription)) {
    children.push(new AtomicTextContainer(new StrictUnicodeLine('...'), theme.style.keyDots));
    children.push(space);
  } else {
    if (nodeDescription.key !== undefined) {
      const nodeKeyString = (nodeDescription.key.toString) ? nodeDescription.key.toString() : String(nodeDescription.key);
      children.push(new AtomicTextContainer(new StrictUnicodeLine(nodeKeyString), theme.style.key));
      children.push(new AtomicTextContainer(new StrictUnicodeLine(':'), theme.style.keyDots));
      children.push(space);
    }
    if (nodeDescription.value) {
      children.push(new AtomicTextContainer(new StrictUnicodeText(nodeDescription.value)));
      children.push(space);
    }
  }

  if (nodeDescription.info) {
    children.push(new AtomicTextContainer(new StrictUnicodeLine(nodeDescription.info), theme.style.info));
    children.push(space);
  }
  return new NonatomicTextContainer(children);
}
