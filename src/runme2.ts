import { AtomicTextContainer, NonatomicTextContainer } from "./sml4/textContainer";

// const abc1 = new AtomicTextContainer('hello my dear friend, how do you do?');
// const abc2 = new AtomicTextContainer('Стандарт состоит из двух основных частей: универсального набора символов (англ. Universal character set, UCS) и семейства кодировок (англ. Unicode transformation format, UTF). Универсальный набор символов перечисляет допустимые по стандарту Юникод символы и присваивает каждому символу код в виде неотрицательного целого числа, записываемого обычно в шестнадцатеричной форме с префиксом U+, например, U+040F. Семейство кодировок определяет способы преобразования кодов символов для передачи в потоке или в файле.');
// console.log(abc1);
// console.log(abc2.wrap(40).wrapped.toString());






//import { EOL } from 'os';
import * as fs from 'fs';

import { Style, StyleSwitches } from "./sml4/style";
import { StyleSwitchesEnum } from "./sml4/styleTypes";
import { AnsiRenderer } from "./sml4/renderers/ansi";

const children = [
  new AtomicTextContainer(
    'GitHub is home to over '
  ),
  new AtomicTextContainer(
    '40 million',
    new Style({r: 210, g: 220, b: 255}, {r: 0, g: 64, b: 32}, new StyleSwitches())
  ),
  new AtomicTextContainer(
    ' developers working together to host and review code, manage projects, and '
  ),
  new AtomicTextContainer(
    'build software together. ',
    new Style(undefined, undefined, new StyleSwitches({[StyleSwitchesEnum.Bold]: true}))
  ),
  // new AtomicTextContainer(
  //   'Since question was ' + EOL + 'regarding clunkiness ' + EOL + 'of property checking, and one regular usecase for that being validation of function argument options objects, thought I\'d mention a library-free short way of testing existence of multiple properties. '
  // ),
  new AtomicTextContainer(
    'Disclaimer: ',
    new Style({r: 128, g: 128, b: 128}, undefined, new StyleSwitches({[StyleSwitchesEnum.Bold]: true}))
  ),
  new AtomicTextContainer(
    'It does require ECMAScript 5 (but IMO anyone still using IE8 deserves a broken web)',
    new Style({r: 128, g: 128, b: 128}, undefined, new StyleSwitches())
  ),
]
const renderer = new AnsiRenderer();

const sheet = new NonatomicTextContainer(children);
const rendered = renderer.render(sheet);
console.log(rendered);

const {wrapped: wrappedSheet} = sheet.wrap(40);
const renderedWrapped = renderer.render(wrappedSheet);
console.log(renderedWrapped);

fs.writeFileSync('./rendered.ansi', renderedWrapped, 'utf8');


