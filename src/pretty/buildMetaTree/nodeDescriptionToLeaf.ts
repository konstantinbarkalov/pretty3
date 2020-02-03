import { nodeDescriptionT, guardNodeDescription } from '../interfaces/nodeDescription';
import { AtomicTextContainer, AnyTextContainer, NonatomicTextContainer } from '../../text/textContainer';
import { StrictUnicodeText, StrictUnicodeLine } from '../../text/strictUnicode';

import { NodeBroadTypeEnum } from '../interfaces/nodeType';
import { nodePrebuildedThemeT } from '../interfaces/prebuildedTheme';
import { Style } from '../../text/style';


export function nodeDescriptionToLeaf(nodeDescription: nodeDescriptionT, nodeTheme: nodePrebuildedThemeT): NonatomicTextContainer<StrictUnicodeText> {
  const preparedPack = prepareTextToPack(nodeDescription, nodeTheme);
  const leaf = preparedPackToLeaf(preparedPack, nodeTheme.style);
  return leaf;
}

// pretty hardcode :`)

type preparedPackItemT = {
  wholeItemWrapperStyle?: Style;
  predelimiter?: AnyTextContainer;
  prefix?: AnyTextContainer;
  content?: AnyTextContainer;
  postfix?: AnyTextContainer;
  postdelimiter?: AnyTextContainer;
}

type preparedPackT = {
  icon?: preparedPackItemT;
  key?: preparedPackItemT;
  value?: preparedPackItemT;
  info?: preparedPackItemT;
  remark?: preparedPackItemT;
}

function prepareTextToPack(nodeDescription: nodeDescriptionT, nodeTheme: nodePrebuildedThemeT): preparedPackT {

  const preparedPack: preparedPackT = { };

  // icon
  if (nodeTheme.icon) {
    const preparedPackItem: preparedPackItemT = {
      wholeItemWrapperStyle: nodeTheme.style,
    };
    if (nodeTheme.icon.predelimiter && nodeTheme.icon.predelimiter.container) {
      preparedPackItem.predelimiter = nodeTheme.icon.predelimiter.container;
    }
    if (nodeTheme.icon.prefix && nodeTheme.icon.prefix.container) {
      preparedPackItem.prefix = nodeTheme.icon.prefix.container;
    }
    if (nodeTheme.icon.content && nodeTheme.icon.content.container) {
      preparedPackItem.content = nodeTheme.icon.content.container;
    }
    if (nodeTheme.icon.postfix && nodeTheme.icon.postfix.container) {
      preparedPackItem.postfix = nodeTheme.icon.postfix.container;
    }
    if (nodeTheme.icon.postdelimiter && nodeTheme.icon.postdelimiter.container) {
      preparedPackItem.postdelimiter = nodeTheme.icon.postdelimiter.container;
    }
    preparedPackItem.wholeItemWrapperStyle = nodeTheme.icon.style,
    preparedPack.icon = preparedPackItem;
  }


  // key
  if (nodeDescription.key !== undefined) {
    if (nodeTheme.key) {
      const preparedPackItem: preparedPackItemT = {
        wholeItemWrapperStyle: nodeTheme.style,
      };
      if (nodeTheme.key.predelimiter && nodeTheme.key.predelimiter.container) {
        preparedPackItem.predelimiter = nodeTheme.key.predelimiter.container;
      }
      if (nodeTheme.key.prefix && nodeTheme.key.prefix.container) {
        preparedPackItem.prefix = nodeTheme.key.prefix.container;
      }
      {
        const nodeKeyString = (nodeDescription.key.toString) ? nodeDescription.key.toString() : String(nodeDescription.key);
        preparedPackItem.content = new AtomicTextContainer(new StrictUnicodeLine(nodeKeyString), nodeTheme.key.content?.style);
      }
      if (nodeTheme.key.postfix && nodeTheme.key.postfix.container) {
        preparedPackItem.postfix = nodeTheme.key.postfix.container;
      }
      if (nodeTheme.key.postdelimiter && nodeTheme.key.postdelimiter.container) {
        preparedPackItem.postdelimiter = nodeTheme.key.postdelimiter.container;
      }
      preparedPackItem.wholeItemWrapperStyle = nodeTheme.key.style,
      preparedPack.key = preparedPackItem;
    }
  }

  // value
  if (!guardNodeDescription(NodeBroadTypeEnum.Dead, nodeDescription)) {
    if (nodeDescription.value !== undefined) {
      if (nodeTheme.value) {
        const preparedPackItem: preparedPackItemT = {
          wholeItemWrapperStyle: nodeTheme.style,
        };
        if (nodeTheme.value.predelimiter && nodeTheme.value.predelimiter.container) {
          preparedPackItem.predelimiter = nodeTheme.value.predelimiter.container;
        }
        if (nodeTheme.value.prefix && nodeTheme.value.prefix.container) {
          preparedPackItem.prefix = nodeTheme.value.prefix.container;
        }
        {
          const nodeKeyString = (nodeDescription.value.toString) ? nodeDescription.value.toString() : String(nodeDescription.value);
          preparedPackItem.content = new AtomicTextContainer(new StrictUnicodeText(nodeKeyString), nodeTheme.value.content?.style);
        }
        if (nodeTheme.value.postfix && nodeTheme.value.postfix.container) {
          preparedPackItem.postfix = nodeTheme.value.postfix.container;
        }
        if (nodeTheme.value.postdelimiter && nodeTheme.value.postdelimiter.container) {
          preparedPackItem.postdelimiter = nodeTheme.value.postdelimiter.container;
        }
        preparedPackItem.wholeItemWrapperStyle = nodeTheme.value.style,
        preparedPack.value = preparedPackItem;
      }
    }
  }

  // info
  if (nodeDescription.info !== undefined) {
    if (nodeTheme.info) {
      const preparedPackItem: preparedPackItemT = {
        wholeItemWrapperStyle: nodeTheme.style,
      };
      if (nodeTheme.info.predelimiter && nodeTheme.info.predelimiter.container) {
        preparedPackItem.predelimiter = nodeTheme.info.predelimiter.container;
      }
      if (nodeTheme.info.prefix && nodeTheme.info.prefix.container) {
        preparedPackItem.prefix = nodeTheme.info.prefix.container;
      }
      {
        const nodeKeyString = (nodeDescription.info.toString) ? nodeDescription.info.toString() : String(nodeDescription.info);
        preparedPackItem.content = new AtomicTextContainer(new StrictUnicodeLine(nodeKeyString), nodeTheme.info.content?.style);
      }
      if (nodeTheme.info.postfix && nodeTheme.info.postfix.container) {
        preparedPackItem.postfix = nodeTheme.info.postfix.container;
      }
      if (nodeTheme.info.postdelimiter && nodeTheme.info.postdelimiter.container) {
        preparedPackItem.postdelimiter = nodeTheme.info.postdelimiter.container;
      }
      preparedPackItem.wholeItemWrapperStyle = nodeTheme.info.style,
      preparedPack.info = preparedPackItem;
    }
  }

  // remark
  if (nodeDescription.remark !== undefined) {
    if (nodeTheme.remark) {
      const preparedPackItem: preparedPackItemT = {
        wholeItemWrapperStyle: nodeTheme.style,
      };
      if (nodeTheme.remark.predelimiter && nodeTheme.remark.predelimiter.container) {
        preparedPackItem.predelimiter = nodeTheme.remark.predelimiter.container;
      }
      if (nodeTheme.remark.prefix && nodeTheme.remark.prefix.container) {
        preparedPackItem.prefix = nodeTheme.remark.prefix.container;
      }
      {
        const nodeKeyString = (nodeDescription.remark.toString) ? nodeDescription.remark.toString() : String(nodeDescription.remark);
        preparedPackItem.content = new AtomicTextContainer(new StrictUnicodeLine(nodeKeyString), nodeTheme.remark.content?.style);
      }
      if (nodeTheme.remark.postfix && nodeTheme.remark.postfix.container) {
        preparedPackItem.postfix = nodeTheme.remark.postfix.container;
      }
      if (nodeTheme.remark.postdelimiter && nodeTheme.remark.postdelimiter.container) {
        preparedPackItem.postdelimiter = nodeTheme.remark.postdelimiter.container;
      }
      preparedPackItem.wholeItemWrapperStyle = nodeTheme.remark.style,
      preparedPack.remark = preparedPackItem;
    }
  }
  return preparedPack;

}

function preparedPackToLeaf(preparedPack: preparedPackT, wholeLeafStyle?: Style): NonatomicTextContainer<StrictUnicodeText> {
  // render line parts to leaf with delimeters when needed
  const leafChildren: AnyTextContainer[] = [];
  let isDelimiterNeed = false;
  const unorederedPreparedItems = Object.values(preparedPack); // TODO: custom order
  for (let itemId = 0; itemId < unorederedPreparedItems.length; itemId++) {
    const preparedPackItem = unorederedPreparedItems[itemId];
    const isFirst = itemId === 0;
    const isLast = itemId === unorederedPreparedItems.length - 1;
    // in fact i really need a isLast, because isFirst is skipped anyway
    // on first run because of isDelimiterNeed = false;
    if (preparedPackItem) {
      const itemChildren: AnyTextContainer[] = [];
      if (preparedPackItem.predelimiter && isDelimiterNeed && !isFirst) {
        itemChildren.push(preparedPackItem.predelimiter);
        isDelimiterNeed = false;
      }
      if (preparedPackItem.prefix) {
        itemChildren.push(preparedPackItem.prefix);
        isDelimiterNeed = true;
      }
      if (preparedPackItem.content) {
        itemChildren.push(preparedPackItem.content);
        isDelimiterNeed = true;
      }
      if (preparedPackItem.postfix) {
        itemChildren.push(preparedPackItem.postfix);
        isDelimiterNeed = true;
      }
      if (preparedPackItem.postdelimiter && isDelimiterNeed && !isLast) {
        itemChildren.push(preparedPackItem.postdelimiter);
        isDelimiterNeed = false;
      }
      if (itemChildren.length > 0) {
        const itemWrapper = new NonatomicTextContainer(itemChildren, preparedPackItem.wholeItemWrapperStyle);
        leafChildren.push(itemWrapper);
      }
    }
  }
  return new NonatomicTextContainer(leafChildren, wholeLeafStyle);
}
