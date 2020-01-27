import { SingleNodeTypeEnum, EnumerableNodeTypeEnum, NodeMetatypeEnum, DeadNodeTypeEnum, NodeTypeEnumT, IterableNodeTypeEnum } from './interfaces/nodeType';
import { iconT } from './interfaces/icon';
import { AtomicTextContainer } from '../text/textContainer';
import { StrictUnicodeLine } from '../text/strictUnicode';
import { theme } from './defaultTheme';


export type fullIconsetT = {
  [key in NodeMetatypeEnum]: iconsetT<key>;
}
export type iconsetT<T extends NodeMetatypeEnum> = {
  [key in NodeTypeEnumT<T>]: iconT;
}

export const fullIconset: fullIconsetT = {
  [NodeMetatypeEnum.Dead]: {
    [DeadNodeTypeEnum.CircularReference]: new AtomicTextContainer(new StrictUnicodeLine('>∞<'), theme.style.icon),
    [DeadNodeTypeEnum.Elipsis]:           new AtomicTextContainer(new StrictUnicodeLine('...'), theme.style.icon),
  },
  [NodeMetatypeEnum.Single]: {
    [SingleNodeTypeEnum.BigInt]:          new AtomicTextContainer(new StrictUnicodeLine('<I>'), theme.style.icon),
    [SingleNodeTypeEnum.Boolean]:         new AtomicTextContainer(new StrictUnicodeLine('<B>'), theme.style.icon),
    [SingleNodeTypeEnum.BooleanObject]:   new AtomicTextContainer(new StrictUnicodeLine('{B}'), theme.style.icon),
    [SingleNodeTypeEnum.Date]:            new AtomicTextContainer(new StrictUnicodeLine('<D>'), theme.style.icon),
    [SingleNodeTypeEnum.Function]:        new AtomicTextContainer(new StrictUnicodeLine('<F>'), theme.style.icon),
    [SingleNodeTypeEnum.Null]:            new AtomicTextContainer(new StrictUnicodeLine('<X>'), theme.style.icon),
    [SingleNodeTypeEnum.Number]:          new AtomicTextContainer(new StrictUnicodeLine('<N>'), theme.style.icon),
    [SingleNodeTypeEnum.NumberObject]:    new AtomicTextContainer(new StrictUnicodeLine('{N}'), theme.style.icon),
    [SingleNodeTypeEnum.String]:          new AtomicTextContainer(new StrictUnicodeLine('<T>'), theme.style.icon),
    [SingleNodeTypeEnum.StringObject]:    new AtomicTextContainer(new StrictUnicodeLine('{T}'), theme.style.icon),
    [SingleNodeTypeEnum.Symbol]:          new AtomicTextContainer(new StrictUnicodeLine('<S>'), theme.style.icon),
    [SingleNodeTypeEnum.Undefined]:       new AtomicTextContainer(new StrictUnicodeLine('< >'), theme.style.icon),
    [SingleNodeTypeEnum.Unknown]:         new AtomicTextContainer(new StrictUnicodeLine('<?>'), theme.style.icon),
  },
  [NodeMetatypeEnum.Enumerable]: {
    [EnumerableNodeTypeEnum.Map]:         new AtomicTextContainer(new StrictUnicodeLine('«M»'), theme.style.icon),
    [EnumerableNodeTypeEnum.Object]:      new AtomicTextContainer(new StrictUnicodeLine('{ }'), theme.style.icon),
    [EnumerableNodeTypeEnum.Unknown]:     new AtomicTextContainer(new StrictUnicodeLine('«?»'), theme.style.icon),
    [EnumerableNodeTypeEnum.WeakMap]:     new AtomicTextContainer(new StrictUnicodeLine('«W»'), theme.style.icon),
  },
  [NodeMetatypeEnum.Iterable]: {
    [IterableNodeTypeEnum.Array]:         new AtomicTextContainer(new StrictUnicodeLine('[ ]'), theme.style.icon),
    [IterableNodeTypeEnum.Set]:           new AtomicTextContainer(new StrictUnicodeLine('[S]'), theme.style.icon),
    [IterableNodeTypeEnum.TypedArray]:    new AtomicTextContainer(new StrictUnicodeLine('[T]'), theme.style.icon),
    [IterableNodeTypeEnum.Unknown]:       new AtomicTextContainer(new StrictUnicodeLine('[T]'), theme.style.icon),
  },
};