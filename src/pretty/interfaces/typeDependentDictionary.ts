import { NodeBroadTypeEnum, NodeFineTypeEnumT } from './nodeType';
export type typeDependentBroadOnlyDictionaryT<TValue extends unknown> = {
  [key in NodeBroadTypeEnum]: TValue;
};
export type typeDependentDictionaryT<TValue extends unknown> = {
  [key in NodeBroadTypeEnum]: typeDependentFineDictionaryT<key, TValue>;
};
export type typeDependentFineDictionaryT<TNodeBroadTypeEnum extends NodeBroadTypeEnum, TValue extends unknown> = {
  [key in NodeFineTypeEnumT<TNodeBroadTypeEnum>]: TValue;
};
export type typeDependentPartialDictionaryT<TValue extends unknown> = {
  [key in NodeBroadTypeEnum]?: Partial<typeDependentFineDictionaryT<key, TValue>>;
};
export type typeDependentPartialFineDictionaryT<TNodeBroadTypeEnum extends NodeBroadTypeEnum, TValue extends unknown> = {
  [key in NodeFineTypeEnumT<TNodeBroadTypeEnum>]?: TValue;
};
export type typeDependentBroadOnlyPartialDictionaryT<TValue extends unknown> = Partial<typeDependentBroadOnlyDictionaryT<TValue>>;
