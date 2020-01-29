import { nodeDescriptionT, guardNodeDescription } from './interfaces/nodeDescription';
import { AtomicTextContainer, AnyTextContainer, NonatomicTextContainer } from '../text/textContainer';
import { StrictUnicodeText, StrictUnicodeLine } from '../text/strictUnicode';

import { NodeBroadTypeEnum } from './interfaces/nodeType';
import { nodePrebuildedThemeT } from './interfaces/prebuildedTheme';


export function nodeDescriptionToLeaf(nodeDescription: nodeDescriptionT, nodeTheme: nodePrebuildedThemeT): NonatomicTextContainer<StrictUnicodeText> {
  type preparedContainerT = {
    icon?: AnyTextContainer;
    keyDelimiter?: AnyTextContainer;
    key?: AnyTextContainer;
    valueDelimiter?: AnyTextContainer;
    value?: AnyTextContainer;
    infoDelimiter?: AnyTextContainer;
    info?: AnyTextContainer;
    remarkDelimiter?: AnyTextContainer;
    remark?: AnyTextContainer;
  }
  const preparedContainer: preparedContainerT = { };

  // icon
  if (nodeTheme.icon) {
    preparedContainer.icon = nodeTheme.icon.container;
  }

  // keyDelimiter
  if (nodeTheme.keyDelimiter) {
    if (nodeTheme.keyDelimiter && nodeTheme.keyDelimiter.container) {
      preparedContainer.keyDelimiter = nodeTheme.keyDelimiter.container;
    }
  }

  // key
  if (nodeDescription.key !== undefined) {
    if (nodeTheme.key) {
      const containers = [];
      if (nodeTheme.key.prefix && nodeTheme.key.prefix.container) {
        containers.push(nodeTheme.key.prefix.container);
      }
      if (nodeTheme.key.content) {
        const nodeKeyString = (nodeDescription.key.toString) ? nodeDescription.key.toString() : String(nodeDescription.key);
        containers.push(new AtomicTextContainer(new StrictUnicodeLine(nodeKeyString), nodeTheme.key.content.style));
      }
      if (nodeTheme.key.postfix && nodeTheme.key.postfix.container) {
        containers.push(nodeTheme.key.postfix.container);
      }
      preparedContainer.key = new NonatomicTextContainer(containers);
    }
  }

  // valueDelimiter
  if (nodeTheme.valueDelimiter) {
    if (nodeTheme.valueDelimiter && nodeTheme.valueDelimiter.container) {
      preparedContainer.valueDelimiter = nodeTheme.valueDelimiter.container;
    }
  }

  // value
  if (!guardNodeDescription(NodeBroadTypeEnum.Dead, nodeDescription)) {
    if (nodeDescription.value !== undefined) {
      if (nodeTheme.value) {
        const containers = [];
        if (nodeTheme.value.prefix && nodeTheme.value.prefix.container) {
          containers.push(nodeTheme.value.prefix.container);
        }
        if (nodeTheme.value.content) {
          const nodeKeyString = (nodeDescription.value.toString) ? nodeDescription.value.toString() : String(nodeDescription.value);
          containers.push(new AtomicTextContainer(new StrictUnicodeLine(nodeKeyString), nodeTheme.value.content.style));
        }
        if (nodeTheme.value.postfix && nodeTheme.value.postfix.container) {
          containers.push(nodeTheme.value.postfix.container);
        }
        preparedContainer.value = new NonatomicTextContainer(containers);
      }
    }
  }

  // infoDelimiter
  if (nodeTheme.infoDelimiter) {
    if (nodeTheme.infoDelimiter && nodeTheme.infoDelimiter.container) {
      preparedContainer.infoDelimiter = nodeTheme.infoDelimiter.container;
    }
  }

  // info
  if (!guardNodeDescription(NodeBroadTypeEnum.Dead, nodeDescription)) {
    if (nodeDescription.info !== undefined) {
      if (nodeTheme.info) {
        const containers = [];
        if (nodeTheme.info.prefix && nodeTheme.info.prefix.container) {
          containers.push(nodeTheme.info.prefix.container);
        }
        if (nodeTheme.info.content) {
          const nodeKeyString = (nodeDescription.info.toString) ? nodeDescription.info.toString() : String(nodeDescription.info);
          containers.push(new AtomicTextContainer(new StrictUnicodeLine(nodeKeyString), nodeTheme.info.content.style));
        }
        if (nodeTheme.info.postfix && nodeTheme.info.postfix.container) {
          containers.push(nodeTheme.info.postfix.container);
        }
        preparedContainer.info = new NonatomicTextContainer(containers);
      }
    }
  }

  // remarkDelimiter
  if (nodeTheme.remarkDelimiter) {
    if (nodeTheme.remarkDelimiter && nodeTheme.remarkDelimiter.container) {
      preparedContainer.remarkDelimiter = nodeTheme.remarkDelimiter.container;
    }
  }

  // remark
  if (!guardNodeDescription(NodeBroadTypeEnum.Dead, nodeDescription)) {
    if (nodeDescription.remark !== undefined) {
      if (nodeTheme.remark) {
        const containers = [];
        if (nodeTheme.remark.prefix && nodeTheme.remark.prefix.container) {
          containers.push(nodeTheme.remark.prefix.container);
        }
        if (nodeTheme.remark.content) {
          const nodeKeyString = (nodeDescription.remark.toString) ? nodeDescription.remark.toString() : String(nodeDescription.remark);
          containers.push(new AtomicTextContainer(new StrictUnicodeLine(nodeKeyString), nodeTheme.remark.content.style));
        }
        if (nodeTheme.remark.postfix && nodeTheme.remark.postfix.container) {
          containers.push(nodeTheme.remark.postfix.container);
        }
        preparedContainer.remark = new NonatomicTextContainer(containers);
      }
    }
  }

  const leafChildren: AnyTextContainer[] = [];

  // pretty hardcode :`)
  if (preparedContainer.icon) {
    leafChildren.push(preparedContainer.icon);
  }
  if (preparedContainer.keyDelimiter) {
    leafChildren.push(preparedContainer.keyDelimiter);
  }
  if (preparedContainer.key) {
    leafChildren.push(preparedContainer.key);
  }
  if (preparedContainer.valueDelimiter && preparedContainer.value) {
    leafChildren.push(preparedContainer.valueDelimiter);
  }
  if (preparedContainer.value) {
    leafChildren.push(preparedContainer.value);
  }
  if (preparedContainer.infoDelimiter && preparedContainer.info) {
    leafChildren.push(preparedContainer.infoDelimiter);
  }
  if (preparedContainer.info) {
    leafChildren.push(preparedContainer.info);
  }
  if (preparedContainer.remarkDelimiter && preparedContainer.remark) {
    leafChildren.push(preparedContainer.remarkDelimiter);
  }
  if (preparedContainer.remark) {
    leafChildren.push(preparedContainer.remark);
  }
  return new NonatomicTextContainer(leafChildren);
}
