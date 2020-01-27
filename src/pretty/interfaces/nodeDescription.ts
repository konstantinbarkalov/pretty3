import { NodeMetatypeEnum, nodeTypeTupleT, guardNodeTypeTuple, } from './nodeType';

export type nodeDescriptionKeyT = string | number | bigint | object | undefined;

type deadNodeDescriptionT<T extends NodeMetatypeEnum.Dead> = {
  typeTuple: nodeTypeTupleT<T>;
  key?: nodeDescriptionKeyT;
  info?: string | undefined;
}
type singleNodeDescriptionT<T extends NodeMetatypeEnum.Single> = {
  typeTuple: nodeTypeTupleT<T>;
  key: nodeDescriptionKeyT;
  value: string;
  info?: string | undefined;
}
type enumerableNodeDescriptionT<T extends NodeMetatypeEnum.Enumerable> = {
  typeTuple: nodeTypeTupleT<T>;
  key: nodeDescriptionKeyT;
  value: string;
  subEntries: nodeDescriptionT[];
  info?: string | undefined;
}


export type nodeDescriptionT<TNodeMetatypeEnum extends NodeMetatypeEnum = NodeMetatypeEnum> =
  TNodeMetatypeEnum extends NodeMetatypeEnum.Dead
    ? deadNodeDescriptionT<TNodeMetatypeEnum>
    : TNodeMetatypeEnum extends NodeMetatypeEnum.Single
      ? singleNodeDescriptionT<TNodeMetatypeEnum>
      : TNodeMetatypeEnum extends NodeMetatypeEnum.Enumerable
        ? enumerableNodeDescriptionT<TNodeMetatypeEnum>
        : never;



export type nodeDescriptionTemplateT<TNodeMetatypeEnum extends NodeMetatypeEnum = NodeMetatypeEnum> =
  Partial<nodeDescriptionT<TNodeMetatypeEnum>>;

export function guardNodeDescription<T extends NodeMetatypeEnum>(metatype: T, nodeDescription: nodeDescriptionT): nodeDescription is nodeDescriptionT<T> {
  return guardNodeTypeTuple(metatype, nodeDescription.typeTuple);
  // same or same
  //return (nodeDescription.typeTuple[0] === metatype);
}

