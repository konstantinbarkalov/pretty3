import { StrictUnicodeText } from '../text/strictUnicode';
import { EOL } from 'os';
import { NonatomicTextContainer, AtomicTextContainer } from '../text/textContainer';
import { AnsiRenderer } from '../text/renderer/implementation';
import { Style } from '../text/style';

const renderer = new AnsiRenderer();
const maxWidth = 10;
const luxStyle = new Style({r: 200, g: 100, b: 50});
const a = new NonatomicTextContainer([
  new AtomicTextContainer(new StrictUnicodeText('well hello, you goonna wrap me now, bitch. ' + EOL + 'me')),
  new AtomicTextContainer(new StrictUnicodeText('to sir ' + EOL + 'and me'), luxStyle),
]);
const b = a.managedWrap(maxWidth);
let la;
do {
  la = b.next(maxWidth);
  //console.log(la.value.toString());
  console.log(renderer.render(la.value));
} while (!la.done);
console.log('---fin---');
