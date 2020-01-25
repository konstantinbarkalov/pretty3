import { StrictUnicodeText } from '../text/strictUnicode';
import { EOL } from 'os';

const maxWidth = 10;
const a = new StrictUnicodeText('well hello, you goonna wrap me now, bitch. ' + EOL + 'me to sir ' + EOL + 'and me');
const b = a.managedWrap(maxWidth);
let la;
do {
  la = b.next(maxWidth);
  console.log(la.value.toString());
} while (!la.done);
console.log('---fin---');
