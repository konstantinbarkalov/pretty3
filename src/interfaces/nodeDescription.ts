import { iconT } from './icon';

export enum NodeMetatypeEnum {
  Dead,
  Single,
  Enumerable,
}

export enum DeadNodeTypeEnum {
  Elipsis,
  CircularReference,
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


type NodeTypeEnumT<TNodeMetatypeEnum extends NodeMetatypeEnum> =
TNodeMetatypeEnum extends NodeMetatypeEnum.Dead ?
DeadNodeTypeEnum :
TNodeMetatypeEnum extends NodeMetatypeEnum.Single ?
SingleNodeTypeEnum :
TNodeMetatypeEnum extends NodeMetatypeEnum.Enumerable ?
EnumerableNodeTypeEnum :
never;


export type nodeDescriptionKeyT = string | number | object | undefined;
export type nodeDescriptionT<TNodeMetatypeEnum extends NodeMetatypeEnum, TNodeTypeEnum extends NodeTypeEnumT<TNodeMetatypeEnum>> =
  TNodeTypeEnum extends DeadNodeTypeEnum ? {
    metatype: TNodeMetatypeEnum;
    type: TNodeTypeEnum;
    icon?: iconT;
    info?: string | undefined;
  } : TNodeTypeEnum extends SingleNodeTypeEnum ? {
    metatype: TNodeMetatypeEnum;
    type: TNodeTypeEnum;
    key: nodeDescriptionKeyT;
    value: string;
    icon?: iconT;
    info?: string | undefined;
  } : TNodeTypeEnum extends EnumerableNodeTypeEnum ? {
    metatype: TNodeMetatypeEnum;
    type: TNodeTypeEnum;
    key: nodeDescriptionKeyT;
    value: string;
    icon?: iconT;
    info?: string | undefined;
    subEntries: anyNodeDescriptionT[];
  }
 : never;

export type anyDeadNodeDescriptionT = nodeDescriptionT<NodeMetatypeEnum.Dead, DeadNodeTypeEnum>;
export type anySingleNodeDescriptionT = nodeDescriptionT<NodeMetatypeEnum.Single, SingleNodeTypeEnum>;
export type anyEnumerableNodeDescriptionT = nodeDescriptionT<NodeMetatypeEnum.Enumerable, EnumerableNodeTypeEnum>;
export type anyNodeDescriptionT = anyDeadNodeDescriptionT | anySingleNodeDescriptionT | anyEnumerableNodeDescriptionT;
export type anyNodeDescriptionTemplateT = Partial<anyNodeDescriptionT>;