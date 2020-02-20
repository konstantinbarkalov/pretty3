import { StrictUnicodeText, StrictUnicodeLine, StrictUnicodeChar } from './strictUnicode';

/* eslint-disable @typescript-eslint/no-inferrable-types */


// type AnyStrictUnicodeT<TRules extends strictUnicodeRulesT> =
//   StrictUnicodeText<TRules> |
//   StrictUnicodeLine<TRules> |
//   StrictUnicodeChar<TRules>;

class StrictUnicodeFactory<TRules extends strictUnicodeRulesT> {
  StrictUnicodeText: typeof StrictUnicodeText;
  StrictUnicodeLine: typeof StrictUnicodeLine;
  StrictUnicodeChar: typeof StrictUnicodeChar;
  constructor(public readonly rules: TRules) {
    this.StrictUnicodeText = class FactoryfiedStrictUnicodeText extends StrictUnicodeText<TRules> {
      constructor(public readonly rawString: string, isSkipChecks: boolean = false) {
        super(rules, rawString, isSkipChecks);
      }
    };
    this.StrictUnicodeLine = class FactoryfiedStrictUnicodeLine extends StrictUnicodeLine<TRules> {
      constructor(public readonly rawString: string, isSkipChecks: boolean = false) {
        super(rules, rawString, isSkipChecks);
      }
    };
    this.StrictUnicodeChar = class FactoryfiedStrictUnicodeChar extends StrictUnicodeChar<TRules> {
      constructor(public readonly rawString: string, isSkipChecks: boolean = false) {
        super(rules, rawString, isSkipChecks);
      }
    };
  }
}

class DaRules implements strictUnicodeRulesT {
  tabWidth = 4
}
const daRules = new DaRules();



const factory = new StrictUnicodeFactory(daRules);
const char = new factory.StrictUnicodeChar('x');
console.log(char);
factory.StrictUnicodeChar.