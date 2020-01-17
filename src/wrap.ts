import { linesT, maxLineWidthT } from './types/general';

export function wrapLines(lines: linesT, maxLineWidth: maxLineWidthT, stepsToGo: number): linesT {
  const wrappedLines: string[] = [];
  lines.forEach((line) => {
    const tokens = line.split(' ');
    const { tokensChunks } = tokensToTokensChunks(tokens, maxLineWidth, stepsToGo);
    let wrappedLine = '';
    tokensChunks.forEach((tokenChunks) => {
      tokenChunks.forEach((tokenChunk) => {
        let currentMaxLineWidth = (wrappedLines.length === 0) ? maxLineWidth.first : maxLineWidth.other;
        if (wrappedLine.length + tokenChunk.length >= currentMaxLineWidth) {
          wrappedLines.push(wrappedLine);
          wrappedLine = '';
        }
        wrappedLine += tokenChunk;
      });
      wrappedLine += ' ';
    })
    wrappedLines.push(wrappedLine);
  });
  return wrappedLines;
}

export function stringToLines(text:string):linesT {
  // to be less sensitive on input
  // and to allow cross-OS compatibility
  // with same (locked to any of EOLs) input
  const lines = text.split(/\r\n|\n/);
  return lines;
}

export function stringToWrappedLines(text:string, maxLineWidth:maxLineWidthT, stepsToGo: number):linesT {
  const lines = stringToLines(text);
  return wrapLines(lines, maxLineWidth, stepsToGo);
}

function tokensToTokensChunks(tokens:string[], maxLineWidth:maxLineWidthT, stepsToGo: number):{tokensChunks: string[][], remains: string, stepsDone: number} {
  let tokensChunks:string[][] = [];
  let stepsDoneTotal:number = 0;
  let lastRemains:string = '';
  for (let tokenId = 0; tokenId < tokens.length; tokenId++) {
    const token = tokens[tokenId];
    const isFirst = tokenId === 0;
    const {chunks: tokenChunks, remains, stepsDone} = tokenToChunks(token, maxLineWidth, stepsToGo - stepsDoneTotal, isFirst);
    lastRemains = remains;
    stepsDoneTotal += stepsDone;
    tokensChunks.push(tokenChunks);
    if (stepsDoneTotal >= stepsToGo) {
      break;
    }
  }
  return {tokensChunks, remains: lastRemains, stepsDone: stepsDoneTotal};
}

function tokenToChunks(token:string, maxLineWidth:maxLineWidthT, stepsToGo: number, isFirst:boolean):{chunks: string[], remains:string, stepsDone: number} {
  let remainsFirst: string;
  let stepsDoneFirst: number;
  let chunksFirst: string[];
  if (isFirst) {
    const {chunks, remains, stepsDone} = tokenToChunksSomeSteps(token, maxLineWidth.first, 1);
    remainsFirst = remains;
    stepsDoneFirst = stepsDone;
    chunksFirst = chunks;
  } else {
    remainsFirst = token;
    stepsDoneFirst = 0;
    chunksFirst = [];
  }
  const {chunks: chunksOther, remains, stepsDone: stepsDoneOther} = tokenToChunksSomeSteps(remainsFirst, maxLineWidth.other, stepsToGo - stepsDoneFirst);
  const tokenChunks = chunksFirst.concat(chunksOther);
  return {chunks: tokenChunks, remains, stepsDone: stepsDoneFirst + stepsDoneOther};
}

function tokenToChunksSomeSteps(token:string, currentMaxLineWidth:number, stepsToGo: number):{chunks: string[], remains: string, stepsDone: number} {
  const chunks:string[] = [];
  let remains:string = token;
  let stepsDone:number = 0;
  for (let stepId = 0; stepId < stepsToGo; stepId++) {
    let chunk = remains.substr(0, currentMaxLineWidth);
    remains = remains.substr(currentMaxLineWidth);
    chunks.push(chunk);
    stepsDone++;
    if (remains === '') {
      break;
    }
  }
  return {chunks, remains, stepsDone}
}