type strictUnicodeRulesT = {
  readonly width: {
    readonly tab: number;
    readonly emoji: number;
    readonly fullwidth: number;
  };
  readonly eol: {
    readonly matcher: RegExp;
    readonly token: string;
  };
  readonly space: {
    readonly matcher: RegExp;
    readonly token: string;
  };
  readonly ingore: {
    readonly matcher: RegExp;
    readonly token: string;
  };
}