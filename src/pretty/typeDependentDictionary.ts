
export type fullIconsetT = {
  [key in NodeMetatypeEnum]: iconsetT<key>;
}
export type iconsetT<T extends NodeMetatypeEnum> = {
  [key in NodeTypeEnumT<T>]: iconT;
}
