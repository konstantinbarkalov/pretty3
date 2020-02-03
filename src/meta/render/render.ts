import { MetaNodeI } from '../interfaces/node';
import { Renderer } from '../../text/renderer/abstract/renderer';
import { generateFnParametersT } from '../interfaces/arm/armGenerator';
import { NonatomicTextContainer, AnyTextContainer } from '../../text/textContainer';
import { StrictUnicodeLine } from '../../text/strictUnicode';

import { ArmGeneratorChain, ArmGeneratorChainElement } from './armGeneratorChain';
import { logLineCallbackT } from '../../pretty/interfaces/general';



export function renderMetaNode(node: MetaNodeI, maxWidth: number, renderer: Renderer, logLineCallback: logLineCallbackT): void {
  const emptyChain = new ArmGeneratorChain([]);
  return renderMetaNodeRecursive(node, emptyChain, maxWidth, renderer, logLineCallback);
}

function renderMetaNodeRecursive(node: MetaNodeI, parentChain: ArmGeneratorChain, maxWidth: number, renderer: Renderer, logLineCallback: logLineCallbackT): void {
  const hasChildren = (node.children.length > 0);
  const generateArmParameters: generateFnParametersT = {
    node,
    childNum: null,
    lineNum: 0,
    isLastLine: false,
    lineOfKnotNum: 0,
    isLastLineOfKnot: false,
  };
  const currentChainElement = new ArmGeneratorChainElement(
    node.armGenerator,
    node.armWidthGenerator,
    generateArmParameters,
  );

  // iterating through leaf lines

  let currentArm: AnyTextContainer<StrictUnicodeLine>;
  let parentArmChain: AnyTextContainer<StrictUnicodeLine>[];
  let armChain: AnyTextContainer<StrictUnicodeLine>[];
  let arm: AnyTextContainer<StrictUnicodeLine>;
  let currentLineMaxWidth: number;
  let leafLineWrapGenerator: Generator<AnyTextContainer<StrictUnicodeLine>, AnyTextContainer<StrictUnicodeLine>, number> | undefined;
  let generatorResult: IteratorResult<AnyTextContainer<StrictUnicodeLine>, AnyTextContainer<StrictUnicodeLine>>;

  let isLastLineOfLeaf: boolean;

  do {
    currentArm = currentChainElement.generateArm();
    parentArmChain = parentChain.generateArmChain();
    armChain = parentArmChain.concat(currentArm);
    arm = new NonatomicTextContainer(armChain);
    currentLineMaxWidth = maxWidth - arm.calcSize().width.first;
    if (!leafLineWrapGenerator) {
      leafLineWrapGenerator = node.leaf.managedWrap(currentLineMaxWidth);
    }
    generatorResult = leafLineWrapGenerator.next(currentLineMaxWidth);

    isLastLineOfLeaf = !!generatorResult.done;

    parentChain.elements.forEach((parentElement) => {
      const isLastChildOfParent = parentElement.parameters.childNum === parentElement.parameters.node.children.length - 1;
      if (isLastChildOfParent && isLastLineOfLeaf) {
        parentElement.parameters.isLastLine = true;
        parentElement.parameters.isLastLineOfKnot = true;
      }
    });
    if (!hasChildren && isLastLineOfLeaf) {
      currentChainElement.parameters.isLastLine = true;
      currentChainElement.parameters.isLastLineOfKnot = true;
    }
    const wrappedLineContainer = generatorResult.value;
    const lineToRender = new NonatomicTextContainer<StrictUnicodeLine>([arm, wrappedLineContainer]);
    const rendered = renderer.render(lineToRender);
    logLineCallback(rendered.rendered, rendered.trailingEol);

    parentChain.elements.forEach((parentElement) => {
      parentElement.parameters.lineNum++;
      parentElement.parameters.lineOfKnotNum++;
    });
    currentChainElement.parameters.lineNum++;
    currentChainElement.parameters.lineOfKnotNum++;
  } while (!generatorResult.done);

  const chain = new ArmGeneratorChain(parentChain.elements.concat(currentChainElement));

  // iterating through children
  node.children.forEach((childNode, childNodeId) => {
    currentChainElement.parameters.childNum = childNodeId;
    currentChainElement.parameters.lineOfKnotNum = 0;
    currentChainElement.parameters.isLastLineOfKnot = false;
    renderMetaNodeRecursive(childNode, chain, maxWidth, renderer, logLineCallback);
  });
}
