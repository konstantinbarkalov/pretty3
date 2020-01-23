import { ArmGeneratorI, generateFnParametersT, ArmGeneratorChainElementI } from './types/armGenerator';

export class ArmGeneratorChainElement implements ArmGeneratorChainElementI {
  constructor(public generator: ArmGeneratorI, public parameters: generateFnParametersT) { }
}
