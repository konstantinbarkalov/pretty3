import { NodeBroadTypeEnum, nodeTypeTupleT, guardNodeTypeTuple, } from './nodeType';

export type nodeDescriptionKeyT = string | number | bigint | object | undefined;

type deadNodeDescriptionT = {
  typeTuple: nodeTypeTupleT<NodeBroadTypeEnum.Dead>;
  key?: nodeDescriptionKeyT;
  info?: string | undefined;
}
type singleNodeDescriptionT = {
  typeTuple: nodeTypeTupleT<NodeBroadTypeEnum.Single>;
  key: nodeDescriptionKeyT;
  value: string;
  info?: string | undefined;
}
type enumerableNodeDescriptionT = {
  typeTuple: nodeTypeTupleT<NodeBroadTypeEnum.Enumerable>;
  key: nodeDescriptionKeyT;
  value: string;
  subEntries: nodeDescriptionT[];
  info?: string | undefined;
}
type iterableNodeDescriptionT = {
  typeTuple: nodeTypeTupleT<NodeBroadTypeEnum.Iterable>;
  key: nodeDescriptionKeyT;
  value: string;
  subEntries: nodeDescriptionT[];
  info?: string | undefined;
}

export type nodeDescriptionT<TNodeBroadTypeEnum extends NodeBroadTypeEnum = NodeBroadTypeEnum> =
  TNodeBroadTypeEnum extends NodeBroadTypeEnum.Dead
    ? deadNodeDescriptionT
    : TNodeBroadTypeEnum extends NodeBroadTypeEnum.Single
      ? singleNodeDescriptionT
      : TNodeBroadTypeEnum extends NodeBroadTypeEnum.Enumerable
        ? enumerableNodeDescriptionT
        : TNodeBroadTypeEnum extends NodeBroadTypeEnum.Iterable
          ? iterableNodeDescriptionT
          : never;



export type nodeDescriptionTemplateT<TNodeBroadTypeEnum extends NodeBroadTypeEnum = NodeBroadTypeEnum> =
  Partial<nodeDescriptionT<TNodeBroadTypeEnum>>;

export function guardNodeDescription<T extends NodeBroadTypeEnum>(broadType: T, nodeDescription: nodeDescriptionT): nodeDescription is nodeDescriptionT<T> {
  return guardNodeTypeTuple(broadType, nodeDescription.typeTuple);
  // same or same
  //return (nodeDescription.typeTuple[0] === broadType);
}

