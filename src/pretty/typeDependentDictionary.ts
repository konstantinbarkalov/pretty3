import { NodeBroadTypeEnum, NodeFineTypeEnumT } from './interfaces/nodeType';

export type typeDependentBroadOnlyDictionaryT<TValue extends unknown> = {
  [key in NodeBroadTypeEnum]: TValue;
}
export type typeDependentDictionaryT<TValue extends unknown> = {
  [key in NodeBroadTypeEnum]: typeDependentFineDictionaryT<key, TValue>;
}
export type typeDependentFineDictionaryT<TNodeBroadTypeEnum extends NodeBroadTypeEnum, TValue extends unknown> = {
  [key in NodeFineTypeEnumT<TNodeBroadTypeEnum>]: TValue;
}
