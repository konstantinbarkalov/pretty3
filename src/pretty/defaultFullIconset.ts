import { SingleNodeFineTypeEnum, EnumerableNodeFineTypeEnum, NodeBroadTypeEnum, DeadNodeFineTypeEnum, IterableNodeFineTypeEnum } from './interfaces/nodeType';
import { iconT } from './interfaces/icon';
import { AtomicTextContainer } from '../text/textContainer';
import { StrictUnicodeLine } from '../text/strictUnicode';
import { theme } from './defaultTheme';
import { typeDependentDictionaryT } from './typeDependentDictionary';


export const iconDictionary: typeDependentDictionaryT<iconT> = {
  [NodeBroadTypeEnum.Dead]: {
    [DeadNodeFineTypeEnum.CircularReference]: new AtomicTextContainer(new StrictUnicodeLine('>∞<'), theme.style.icon),
    [DeadNodeFineTypeEnum.Elipsis]:           new AtomicTextContainer(new StrictUnicodeLine('...'), theme.style.icon),
  },
  [NodeBroadTypeEnum.Single]: {
    [SingleNodeFineTypeEnum.BigInt]:          new AtomicTextContainer(new StrictUnicodeLine('<I>'), theme.style.icon),
    [SingleNodeFineTypeEnum.Boolean]:         new AtomicTextContainer(new StrictUnicodeLine('<B>'), theme.style.icon),
    [SingleNodeFineTypeEnum.BooleanObject]:   new AtomicTextContainer(new StrictUnicodeLine('{B}'), theme.style.icon),
    [SingleNodeFineTypeEnum.Date]:            new AtomicTextContainer(new StrictUnicodeLine('<D>'), theme.style.icon),
    [SingleNodeFineTypeEnum.Function]:        new AtomicTextContainer(new StrictUnicodeLine('<F>'), theme.style.icon),
    [SingleNodeFineTypeEnum.Null]:            new AtomicTextContainer(new StrictUnicodeLine('<X>'), theme.style.icon),
    [SingleNodeFineTypeEnum.Number]:          new AtomicTextContainer(new StrictUnicodeLine('<N>'), theme.style.icon),
    [SingleNodeFineTypeEnum.NumberObject]:    new AtomicTextContainer(new StrictUnicodeLine('{N}'), theme.style.icon),
    [SingleNodeFineTypeEnum.String]:          new AtomicTextContainer(new StrictUnicodeLine('<T>'), theme.style.icon),
    [SingleNodeFineTypeEnum.StringObject]:    new AtomicTextContainer(new StrictUnicodeLine('{T}'), theme.style.icon),
    [SingleNodeFineTypeEnum.Symbol]:          new AtomicTextContainer(new StrictUnicodeLine('<S>'), theme.style.icon),
    [SingleNodeFineTypeEnum.Undefined]:       new AtomicTextContainer(new StrictUnicodeLine('< >'), theme.style.icon),
    [SingleNodeFineTypeEnum.Unknown]:         new AtomicTextContainer(new StrictUnicodeLine('<?>'), theme.style.icon),
  },
  [NodeBroadTypeEnum.Enumerable]: {
    [EnumerableNodeFineTypeEnum.Map]:         new AtomicTextContainer(new StrictUnicodeLine('«M»'), theme.style.icon),
    [EnumerableNodeFineTypeEnum.Object]:      new AtomicTextContainer(new StrictUnicodeLine('{ }'), theme.style.icon),
    [EnumerableNodeFineTypeEnum.Unknown]:     new AtomicTextContainer(new StrictUnicodeLine('«?»'), theme.style.icon),
    [EnumerableNodeFineTypeEnum.WeakMap]:     new AtomicTextContainer(new StrictUnicodeLine('«W»'), theme.style.icon),
  },
  [NodeBroadTypeEnum.Iterable]: {
    [IterableNodeFineTypeEnum.Array]:         new AtomicTextContainer(new StrictUnicodeLine('[ ]'), theme.style.icon),
    [IterableNodeFineTypeEnum.Set]:           new AtomicTextContainer(new StrictUnicodeLine('[S]'), theme.style.icon),
    [IterableNodeFineTypeEnum.TypedArray]:    new AtomicTextContainer(new StrictUnicodeLine('[T]'), theme.style.icon),
    [IterableNodeFineTypeEnum.Unknown]:       new AtomicTextContainer(new StrictUnicodeLine('[T]'), theme.style.icon),
  },
};