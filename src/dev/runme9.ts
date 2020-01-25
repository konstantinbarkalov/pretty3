/* eslint-disable @typescript-eslint/no-non-null-assertion */
function *gen(): Generator<string, string, number> {
  let da = -99;
  let message = 'initial';
  for (let i = 0; i < 10; i++) {
    console.log('before yield', da!);
    message = 'yo' + da.toFixed();
    da = yield message;
    console.log('after yield', da);
  }
  return message;

}



const rator = gen();
console.log('0, no', rator.next(9999));
console.log('1 ', rator.next(1));
console.log('2 ', rator.next(2));
console.log('3 ', rator.next(3));
console.log('4 ', rator.next(4));
console.log('5 ', rator.next(5));
console.log('6 ', rator.next(6));
