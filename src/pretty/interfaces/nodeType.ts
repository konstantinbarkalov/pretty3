export enum NodeMetatypeEnum {
  Dead,
  Single,
  Enumerable
}
export enum DeadNodeTypeEnum {
  Elipsis,
  CircularReference
}
export enum SingleNodeTypeEnum {
  Undefined,
  Null,
  Boolean,
  Number,
  String,
  BooleanObject,
  NumberObject,
  StringObject,
  BigInt,
  Function,
  Date,
  Symbol,
  Unknown
}
export enum EnumerableNodeTypeEnum {
  Array,
  TypedArray,
  Set,
  Map,
  WeakMap,
  Object,
  Unknown
}
export type NodeTypeEnumT<TNodeMetatypeEnum extends NodeMetatypeEnum = NodeMetatypeEnum> =
  TNodeMetatypeEnum extends NodeMetatypeEnum.Dead
    ? DeadNodeTypeEnum
    : TNodeMetatypeEnum extends NodeMetatypeEnum.Single
      ? SingleNodeTypeEnum
      : TNodeMetatypeEnum extends NodeMetatypeEnum.Enumerable
        ? EnumerableNodeTypeEnum
        : never;

export type nodeTypeTupleT<TNodeMetatypeEnum extends NodeMetatypeEnum = NodeMetatypeEnum> =
  TNodeMetatypeEnum extends NodeMetatypeEnum.Dead
    ? [TNodeMetatypeEnum, NodeTypeEnumT<NodeMetatypeEnum.Dead>]
    : TNodeMetatypeEnum extends NodeMetatypeEnum.Single
      ? [TNodeMetatypeEnum, NodeTypeEnumT<NodeMetatypeEnum.Single>]
      : TNodeMetatypeEnum extends NodeMetatypeEnum.Enumerable
        ? [TNodeMetatypeEnum, NodeTypeEnumT<NodeMetatypeEnum.Enumerable>]
        : never;

export function guardNodeTypeTuple<T extends NodeMetatypeEnum>(metatype: T, nodeTypeTuple: nodeTypeTupleT): nodeTypeTuple is nodeTypeTupleT<T> {
  return (nodeTypeTuple[0] === metatype);
}
