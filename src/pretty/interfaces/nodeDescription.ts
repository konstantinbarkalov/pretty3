import { NodeMetatypeEnum, nodeTypeTupleT, guardNodeTypeTuple, } from './nodeType';

export type nodeDescriptionKeyT = string | number | bigint | object | undefined;

type deadNodeDescriptionT = {
  typeTuple: nodeTypeTupleT<NodeMetatypeEnum.Dead>;
  key?: nodeDescriptionKeyT;
  info?: string | undefined;
}
type singleNodeDescriptionT = {
  typeTuple: nodeTypeTupleT<NodeMetatypeEnum.Single>;
  key: nodeDescriptionKeyT;
  value: string;
  info?: string | undefined;
}
type enumerableNodeDescriptionT = {
  typeTuple: nodeTypeTupleT<NodeMetatypeEnum.Enumerable>;
  key: nodeDescriptionKeyT;
  value: string;
  subEntries: nodeDescriptionT[];
  info?: string | undefined;
}
type iterableNodeDescriptionT = {
  typeTuple: nodeTypeTupleT<NodeMetatypeEnum.Iterable>;
  key: nodeDescriptionKeyT;
  value: string;
  subEntries: nodeDescriptionT[];
  info?: string | undefined;
}

export type nodeDescriptionT<TNodeMetatypeEnum extends NodeMetatypeEnum = NodeMetatypeEnum> =
  TNodeMetatypeEnum extends NodeMetatypeEnum.Dead
    ? deadNodeDescriptionT
    : TNodeMetatypeEnum extends NodeMetatypeEnum.Single
      ? singleNodeDescriptionT
      : TNodeMetatypeEnum extends NodeMetatypeEnum.Enumerable
        ? enumerableNodeDescriptionT
        : TNodeMetatypeEnum extends NodeMetatypeEnum.Iterable
          ? iterableNodeDescriptionT
          : never;



export type nodeDescriptionTemplateT<TNodeMetatypeEnum extends NodeMetatypeEnum = NodeMetatypeEnum> =
  Partial<nodeDescriptionT<TNodeMetatypeEnum>>;

export function guardNodeDescription<T extends NodeMetatypeEnum>(metatype: T, nodeDescription: nodeDescriptionT): nodeDescription is nodeDescriptionT<T> {
  return guardNodeTypeTuple(metatype, nodeDescription.typeTuple);
  // same or same
  //return (nodeDescription.typeTuple[0] === metatype);
}

