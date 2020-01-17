![Version](https://img.shields.io/npm/v/pretty3) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/konstantinbarkalov/pretty3/blob/master/LICENSE)
# 🌳 pretty3


> Universal tree logger done right. With colors, unicode support and word-wrapping. Typesctipt friendly.

# Warning: module is in early alpha and not ready for use yet. Beta release is planned on February 2020

## Install

```sh
npm install pretty3
```

## Basic usage


```javascript
import pretty from 'pretty3';
pretty.printTree(data);
```
## Features

- Rich support for **all javasctipt types**, including `TypedArray`, `Map`, `Proxy` and `Symbol`

- Gracefull fit and **word-wrap** long/multiline data into limited-width console. Tree stucture does not breaks.

- Accurate **Unicode**  width calucating for proper word-wrap.

- Colors support not only in terminal, but in a **browser** `console.log()` too. Render to html is also supported.

## Advanced usage


```javascript
import pretty from 'pretty3';
const options = {
  ...
}
pretty.printTree(data, options);
```
##### javasctipt
```javascript
const options = {
  renderer: new AutodetectRenderer(),
  maxLevel: 6,
  maxItemsPerLevel: [30, 10],
  maxLineWidth: 80,
  arrayItemTextPattern: {
    other: {
      first: pretty.textPatternString('├─╸'),
      other: pretty.textPatternString('│  ') },
    last: {
      first: pretty.textPatternString('└─╸'),
      other: pretty.textPatternString('   ') }
  },
  objectItemTextPattern: {
    other: {
      first: pretty.textPatternString('├─╴'),
      other: pretty.textPatternString('│  ') },
    last: {
      first: pretty.textPatternString('╰─╴'),
      other: pretty.textPatternString('   ') }
  },
  tabSize: 4,
  paddingSpace: 0,
  eol: '\n',
  logLineCallback: (line) => {
    console.log(line);
  }
};
```
##### typescript
```typescript
type options = Partial<{
  renderer: Renderer;
  maxLevel: number;
  maxItemsPerLevel: number[] | number;
  maxLineWidth: number;
  arrayItemTextPattern: itemTextPatternT;
  objectItemTextPattern: itemTextPatternT;
  tabSize: number;
  paddingSpace: number;
  eol: string;
  logLineCallback: (line: string) => void;
}>;
```

## Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](todo).

## Author

Konstantin Barkalov @[mail](mailto:mail@barkalov.ru) @[github](https://github.com/konstantinbarkalov)