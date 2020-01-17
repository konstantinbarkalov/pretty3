![Version](https://img.shields.io/badge/version-0.2.1 alpha-red.svg?cacheSeconds=2592000) [![License: ISC](https://img.shields.io/badge/License-ISC-green.svg)](#)
# 🌳 pretty3

> Universal tree logger done right. With colors, unicode support and word-wrapping. Typesctipt friendly.

## Install

```sh
npm install pretty3
```

## Basic usage


```javascript
import pretty from 'pretty3';
pretty.printTree(data);
```
## Key features:

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

## Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](todo).

## Author

Konstantin Barkalov @[mail](mailto:mail@barkalov.ru) @[github](https://github.com/konstantinbarkalov)