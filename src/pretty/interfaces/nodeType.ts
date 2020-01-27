export enum NodeBroadTypeEnum {
  Dead = 'dead',
  Single = 'single',
  Enumerable = 'enumerable',
  Iterable = 'iterable',
}
export enum DeadNodeFineTypeEnum {
  Elipsis = 'elipsis',
  CircularReference = 'circularReference',
}
export enum SingleNodeFineTypeEnum {
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
  WeakMap = 'weakMap',
  WeakSet = 'weakSet',
  Symbol = 'symbol',
  Unknown = 'unknown',
}
export enum EnumerableNodeFineTypeEnum {
  Object = 'object',
  Map = 'map',
  Error = 'error',
  Unknown = 'unknown',
}
export enum IterableNodeFineTypeEnum {
  Array = 'array',
  TypedArray = 'typedArray',
  Set = 'set',
  Unknown = 'unknown',
}
export type NodeFineTypeEnumT<TNodeBroadTypeEnum extends NodeBroadTypeEnum = NodeBroadTypeEnum> =
  TNodeBroadTypeEnum extends NodeBroadTypeEnum.Dead
    ? DeadNodeFineTypeEnum
    : TNodeBroadTypeEnum extends NodeBroadTypeEnum.Single
      ? SingleNodeFineTypeEnum
      : TNodeBroadTypeEnum extends NodeBroadTypeEnum.Enumerable
        ? EnumerableNodeFineTypeEnum
        : TNodeBroadTypeEnum extends NodeBroadTypeEnum.Iterable
          ? IterableNodeFineTypeEnum
          : never;

export type nodeTypeTupleT<TNodeBroadTypeEnum extends NodeBroadTypeEnum = NodeBroadTypeEnum> =
  TNodeBroadTypeEnum extends NodeBroadTypeEnum.Dead
    ? [TNodeBroadTypeEnum, NodeFineTypeEnumT<NodeBroadTypeEnum.Dead>]
    : TNodeBroadTypeEnum extends NodeBroadTypeEnum.Single
      ? [TNodeBroadTypeEnum, NodeFineTypeEnumT<NodeBroadTypeEnum.Single>]
      : TNodeBroadTypeEnum extends NodeBroadTypeEnum.Enumerable
        ? [TNodeBroadTypeEnum, NodeFineTypeEnumT<NodeBroadTypeEnum.Enumerable>]
        : TNodeBroadTypeEnum extends NodeBroadTypeEnum.Iterable
          ? [TNodeBroadTypeEnum, NodeFineTypeEnumT<NodeBroadTypeEnum.Iterable>]
          : never;

export function guardNodeTypeTuple<T extends NodeBroadTypeEnum>(broadType: T, nodeTypeTuple: nodeTypeTupleT): nodeTypeTuple is nodeTypeTupleT<T> {
  return (nodeTypeTuple[0] === broadType);
}
