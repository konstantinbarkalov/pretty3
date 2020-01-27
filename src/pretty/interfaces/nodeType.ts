export enum NodeMetatypeEnum {
  Dead = 'dead',
  Single = 'single',
  Enumerable = 'enumerable',
  Iterable = 'iterable',
}
export enum DeadNodeTypeEnum {
  Elipsis = 'elipsis',
  CircularReference = 'circularReference',
}
export enum SingleNodeTypeEnum {
  Undefined = 'undefined',
  Null = 'null',
  Boolean = 'boolean',
  Number = 'number',
  String = 'string',
  BooleanObject = 'booleanObject',
  NumberObject = 'numberObject',
  StringObject = 'stringObject',
  BigInt = 'bigInt',
  Function = 'function',
  Date = 'date',
  Symbol = 'symbol',
  Unknown = 'unknown',
}
export enum EnumerableNodeTypeEnum {
  Object = 'object',
  Map = 'map',
  WeakMap = 'weakMap',
  Unknown = 'unknown',
}
export enum IterableNodeTypeEnum {
  Array = 'array',
  TypedArray = 'typedArray',
  Set = 'set',
  Unknown = 'unknown',
}
export type NodeTypeEnumT<TNodeMetatypeEnum extends NodeMetatypeEnum = NodeMetatypeEnum> =
  TNodeMetatypeEnum extends NodeMetatypeEnum.Dead
    ? DeadNodeTypeEnum
    : TNodeMetatypeEnum extends NodeMetatypeEnum.Single
      ? SingleNodeTypeEnum
      : TNodeMetatypeEnum extends NodeMetatypeEnum.Enumerable
        ? EnumerableNodeTypeEnum
        : TNodeMetatypeEnum extends NodeMetatypeEnum.Iterable
          ? IterableNodeTypeEnum
          : never;

export type nodeTypeTupleT<TNodeMetatypeEnum extends NodeMetatypeEnum = NodeMetatypeEnum> =
  TNodeMetatypeEnum extends NodeMetatypeEnum.Dead
    ? [TNodeMetatypeEnum, NodeTypeEnumT<NodeMetatypeEnum.Dead>]
    : TNodeMetatypeEnum extends NodeMetatypeEnum.Single
      ? [TNodeMetatypeEnum, NodeTypeEnumT<NodeMetatypeEnum.Single>]
      : TNodeMetatypeEnum extends NodeMetatypeEnum.Enumerable
        ? [TNodeMetatypeEnum, NodeTypeEnumT<NodeMetatypeEnum.Enumerable>]
        : TNodeMetatypeEnum extends NodeMetatypeEnum.Iterable
          ? [TNodeMetatypeEnum, NodeTypeEnumT<NodeMetatypeEnum.Iterable>]
          : never;

export function guardNodeTypeTuple<T extends NodeMetatypeEnum>(metatype: T, nodeTypeTuple: nodeTypeTupleT): nodeTypeTuple is nodeTypeTupleT<T> {
  return (nodeTypeTuple[0] === metatype);
}
