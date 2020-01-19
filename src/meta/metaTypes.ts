import { StrictUnicodeLine, StrictUnicodeText } from '../text/strictUnicode';
import { AnyTextContainer } from '../text/textContainer';

export interface MetaNodeI {
  children: MetaNodeI[];
  nodePattern: LinePatternI;
  childPattern: BranchPatternI;
  leaf: AnyTextContainer;
}
export type patternModeKeyT = 'first' | 'last' | 'other';

type patternT<T> = {
  [key in patternModeKeyT]: T;
}
export interface BranchPatternI extends patternT<LinePatternI> {
  first: LinePatternI;
  other: LinePatternI;
  last: LinePatternI;
}

export interface LinePatternI extends patternT<BasicPatternI> {
  first: BasicPatternI;
  other: BasicPatternI;
  last: BasicPatternI;
}

export interface BasicPatternI extends patternT<StrictUnicodeLine> {
  first: StrictUnicodeLine;
  other: StrictUnicodeLine;
  last: StrictUnicodeLine;
  generateArm(armWidth: number): StrictUnicodeLine;
}