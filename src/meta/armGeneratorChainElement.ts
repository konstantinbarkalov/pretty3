import { ArmGeneratorChainElementI, ArmGeneratorI, generateFnParametersT } from './types/armGenerator';
import { AtomicTextContainer } from '../text/textContainer';
import { StrictUnicodeLine } from '../text/strictUnicode';

export class ArmGeneratorChainElement implements ArmGeneratorChainElementI {
  constructor(public generator: ArmGeneratorI, public parameters: generateFnParametersT) { }
  generateArm(): AtomicTextContainer<StrictUnicodeLine> {
    const arm = this.generator.generateArm(this.parameters);
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
