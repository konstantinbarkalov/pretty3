import { ArmGeneratorI, generateFnParametersT, ArmWidthGeneratorI } from '../types/arm/armGenerator';
import { AtomicTextContainer } from '../../text/textContainer';
import { StrictUnicodeLine } from '../../text/strictUnicode';

export class ArmGeneratorChainElement {
  constructor(public armGenerator: ArmGeneratorI, public armWidthGenerator: ArmWidthGeneratorI, public parameters: generateFnParametersT) { }
  generateArm(): AtomicTextContainer<StrictUnicodeLine> {
    const armWidth = this.armWidthGenerator.generateArmWidth(this.parameters);
    const arm = this.armGenerator.generateArm(this.parameters, armWidth);
    return arm;
  }
}

export class ArmGeneratorChain {
  constructor(public elements: ArmGeneratorChainElement[]) { }
  generateArmChain(): AtomicTextContainer<StrictUnicodeLine>[] {
    const chain: AtomicTextContainer<StrictUnicodeLine>[] = this.elements.map((element) => {
      return element.generateArm();
    });
    return chain;
  }
}
