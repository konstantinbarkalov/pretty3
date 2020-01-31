import { NodeBroadTypeEnum, nodeTypeTupleT } from './interfaces/nodeType';
import { typeDependentDictionaryT, typeDependentFineDictionaryT, typeDependentBroadOnlyDictionaryT, typeDependentPartialDictionaryT, typeDependentBroadOnlyPartialDictionaryT } from './interfaces/typeDependentDictionary';

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


export function getFromTypeDependentPartialDictionary<TValue extends unknown>(dictionary: typeDependentPartialDictionaryT<TValue>, key: nodeTypeTupleT): TValue | undefined {
  const broadType = key[0];
  const fineType = key[1];
  // dirty hack :( be carefaul, it disables some typechecks,
  // but works fine while fullIconsetT sticks to (meta) types enums
  // TODO: rework!!
  const fineDictionary: Partial<typeDependentFineDictionaryT<NodeBroadTypeEnum, TValue>> | undefined = dictionary[broadType];
  if (fineDictionary) {
    const value = fineDictionary[fineType];
    return value;
  }
  return undefined;
}
export function getFromTypeDependentBroadOnlyPartialDictionary<TValue extends unknown>(dictionary: typeDependentBroadOnlyPartialDictionaryT<TValue>, broadType: NodeBroadTypeEnum): TValue | undefined {
  return dictionary[broadType];
}