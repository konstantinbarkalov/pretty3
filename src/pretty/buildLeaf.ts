import { anyNodeDescriptionT } from '../interfaces/nodeDescription';
import { FlatNonatomicTextContainer, AtomicTextContainer } from '../text/textContainer';
import { StrictUnicodeText, StrictUnicodeLine } from '../text/strictUnicode';
import { theme } from './defaultTheme';

export function buildLeaf(nodeKey: string | number | undefined, nodeDescription: anyNodeDescriptionT): FlatNonatomicTextContainer<StrictUnicodeText> {
  const space = new AtomicTextContainer(new StrictUnicodeLine(' '));
  const children: AtomicTextContainer[] = [];
  if (nodeDescription.icon) {
    children.push(new AtomicTextContainer(new StrictUnicodeLine(nodeDescription.icon.text), theme.style.icon));
    children.push(space);
  }
  if (nodeKey !== undefined) {
    const nodeKeyString = nodeKey?.toString() || '';
    children.push(new AtomicTextContainer(new StrictUnicodeLine(nodeKeyString), theme.style.key));
    children.push(new AtomicTextContainer(new StrictUnicodeLine(':'), theme.style.keyDots));
    children.push(space);
  }
  if (nodeDescription.value) {
    children.push(new AtomicTextContainer(new StrictUnicodeText(nodeDescription.value)));
    children.push(space);
  }
  if (nodeDescription.info) {
    children.push(new AtomicTextContainer(new StrictUnicodeLine(nodeDescription.info), theme.style.info));
    children.push(space);
  }
  return new FlatNonatomicTextContainer(children);
}
