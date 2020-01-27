import { NodeBroadTypeEnum, NodeFineTypeEnumT, nodeTypeTupleT } from './interfaces/nodeType';

export type typeDependentBroadOnlyDictionaryT<TValue extends unknown> = {
  [key in NodeBroadTypeEnum]: TValue;
}
export type typeDependentDictionaryT<TValue extends unknown> = {
  [key in NodeBroadTypeEnum]: typeDependentFineDictionaryT<key, TValue>;
}
export type typeDependentFineDictionaryT<TNodeBroadTypeEnum extends NodeBroadTypeEnum, TValue extends unknown> = {
  [key in NodeFineTypeEnumT<TNodeBroadTypeEnum>]: TValue;
}

export function getFromTypeDependentDictionary<TValue extends unknown>(dictionary: typeDependentDictionaryT<TValue>, key: nodeTypeTupleT): TValue {
  const broadType = key[0];
  const fineType = key[1];
  // dirty hack :( be carefaul, it disables some typechecks,
  // but works fine while fullIconsetT sticks to (meta) types enums
  // TODO: rework!!
  const fineDictionary: typeDependentFineDictionaryT<NodeBroadTypeEnum, TValue> = dictionary[broadType];
  const value = fineDictionary[fineType];
  return value;
}

export function getFromTypeDependentBroadOnlyDictionary<TValue extends unknown>(dictionary: typeDependentBroadOnlyDictionaryT<TValue>, broadType: NodeBroadTypeEnum): TValue {
  return dictionary[broadType];
}