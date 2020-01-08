import { iconT } from "./icon";

export enum NodeMetatypeEnum {
  Single,
  Enumerable
}

export enum SingleNodeTypeEnum {
  Undefined,
  Null,
  Boolean,
  Number,
  String,
  Date,
  Symbol,
  Unknown,
}

export enum EnumerableNodeTypeEnum {
  Array,
  TypedArray,
  Set,
  Map,
  WeakMap,
  Object,
  Unknown,
}

type subEntryKeyT<TEnumerableNodeTypeEnum extends EnumerableNodeTypeEnum> =
  TEnumerableNodeTypeEnum extends EnumerableNodeTypeEnum.Array ?
  number :
  TEnumerableNodeTypeEnum extends EnumerableNodeTypeEnum.TypedArray ?
  number :
  TEnumerableNodeTypeEnum extends EnumerableNodeTypeEnum.Set ?
  number :
  TEnumerableNodeTypeEnum extends EnumerableNodeTypeEnum.Map ?
  {} :
  TEnumerableNodeTypeEnum extends EnumerableNodeTypeEnum.WeakMap ?
  {} :
  TEnumerableNodeTypeEnum extends EnumerableNodeTypeEnum.Object ?
  string :
  TEnumerableNodeTypeEnum extends EnumerableNodeTypeEnum.Unknown ?
  any :
  never;

type NodeTypeEnumT<TNodeMetatypeEnum extends NodeMetatypeEnum> =
  TNodeMetatypeEnum extends NodeMetatypeEnum.Single ?
  SingleNodeTypeEnum :
  TNodeMetatypeEnum extends NodeMetatypeEnum.Enumerable ?
  EnumerableNodeTypeEnum :
  never;

type nodeSubEntriesT<TEnumerableNodeTypeEnum extends EnumerableNodeTypeEnum> =
  TEnumerableNodeTypeEnum extends SingleNodeTypeEnum ?
  undefined :
  TEnumerableNodeTypeEnum extends EnumerableNodeTypeEnum ?
  [subEntryKeyT<TEnumerableNodeTypeEnum>, any] :
  never;

export type nodeDescriptionT<TNodeMetatypeEnum extends NodeMetatypeEnum, TNodeTypeEnum extends NodeTypeEnumT<TNodeMetatypeEnum>> =
  TNodeTypeEnum extends SingleNodeTypeEnum ? {
    metatype: TNodeMetatypeEnum,
    type: TNodeTypeEnum,
    value: string,
    icon?: iconT,
    info?: string | undefined,
  } : TNodeTypeEnum extends EnumerableNodeTypeEnum ? {
    metatype: TNodeMetatypeEnum,
    type: TNodeTypeEnum,
    value: string,
    icon?: iconT,
    info?: string | undefined,
    subEntries: nodeSubEntriesT<TNodeTypeEnum>[],
  }
 : never;

export type anySingleNodeDescriptionT = nodeDescriptionT<NodeMetatypeEnum.Single, SingleNodeTypeEnum>;
export type anyEnumerableNodeDescriptionT = nodeDescriptionT<NodeMetatypeEnum.Enumerable, EnumerableNodeTypeEnum>;
export type anyNodeDescriptionT = anySingleNodeDescriptionT | anyEnumerableNodeDescriptionT;

export type anyNodeDescriptionTemplateT = Partial<anyNodeDescriptionT>;