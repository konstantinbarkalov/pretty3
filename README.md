[![Version](https://img.shields.io/npm/v/pretty3)](https://www.npmjs.com/package/pretty3) [![Coverage](https://img.shields.io/codecov/c/github/konstantinbarkalov/pretty3)](https://codecov.io/github/konstantinbarkalov/pretty3) [![Minified size](https://img.shields.io/bundlephobia/minzip/pretty3)](https://www.npmjs.com/package/pretty3) [![Last commit](https://img.shields.io/github/last-commit/konstantinbarkalov/pretty3)](https://github.com/konstantinbarkalov/pretty3) [![License: MIT](https://img.shields.io/npm/l/pretty3)](https://github.com/konstantinbarkalov/pretty3/blob/master/LICENSE)
# pretty3

> Ultimate javascript tree-data logger. With colors, unicode support and word-wrapping. Typesctipt friendly.

## 🌳 [Live demo](https://konstantinbarkalov.github.io/pretty3/)

Try it [online](https://konstantinbarkalov.github.io/pretty3/)!

## Install

```sh
npm install pretty3
```

## Basic usage

```javascript
import { Pretty } from 'pretty3';
Pretty.print(data);
```

## Features roadmap

  - [x] Rich support for **all javasctipt types**, including `TypedArray`, `Map`, `Symbol` and `Error`.
  - [x] Colors support for **ANSI** terminal output.
  - [x] Color support for **HTML** output.
  - [x] Deeply customizable **stackable themes**.
  - [x] **Collapsable** long lists with ellipsis.
  - [x] Gracefull fit and **wrap long/multiline data** into limited-width console. Tree stucture does not breaks!
  - [ ] **Word-wrap**.
  - [ ] Accurate **Unicode**  width calucating for proper word-wrap.
  - [ ] Color support for **browser console** via `console.log()` styling.
  - [ ] Support for **circular references**.
  - [ ] Support for **endless** iterators.
  - [ ] **Collapse long leaves** with ellipsis.

## Advanced usage

```javascript
const rootKey = 'My gorgeous data';
Pretty.print(data, rootKey, options);
```

#### javasctipt
```javascript
const options = {
  renderer: new AutodetectRenderer(),
  logLineCallback: (line) => { console.log(line); },
  maxLevel: 6,
  maxItemsPerLevel: [30, 10],
  maxLineWidth: 80,
  themeStack: [defaultTheme, noSimplestIcon],
};
```

#### typescript
```typescript
type options = {
  renderer?: Renderer;
  logLineCallback?: logLineCallbackT,
  maxLevel?: number,
  maxItemsPerLevel?: number || number[],
  maxLineWidth?: number,
  themeStack?: themeT[],
};
```

## API Documetation

Poorly comented, but actual autogenerated docs (by tsdoc) are [hosted here](https://konstantinbarkalov.github.io/pretty3/docs/).

Intense documentation with examples is **planned after API stabilization**.

## Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/konstantinbarkalov/pretty3/issues).

## Author

Konstantin Barkalov @[mail](mailto:mail@barkalov.ru) @[github](https://github.com/konstantinbarkalov)