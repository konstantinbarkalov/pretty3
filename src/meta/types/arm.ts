import { AtomicTextContainer } from '../../text/textContainer';
import { StrictUnicodeLine } from '../../text/strictUnicode';

export type ArmPlainLineT = StrictUnicodeLine;

export type ArmT = AtomicTextContainer<ArmPlainLineT>;

export type simpleArmWidthT = number;
export type spacedArmWidthT = {preSpace: number; arm: number; postSpace: number};
export type armWidthT = simpleArmWidthT | spacedArmWidthT;
