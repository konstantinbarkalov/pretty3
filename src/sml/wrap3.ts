
import { chunksPerSpanT } from "./types";
import { StyledBreakableSpan, SpanStyle, CleanBreakStyledSpan, StyledSpan } from "./styledSpan";
import { BreakableSpan, Span } from "./span";
import { StyledSpanSheet, StyledSpanLine } from "./styledSpanLine";


export function wrapStyledSpans(styledSpans:StyledBreakableSpan[], maxWidth: number, eol: string):(CleanBreakStyledSpan | StyledSpan)[] {
  const wrappedStyledSpans:(CleanBreakStyledSpan | StyledSpan)[] = [];
  let currentWrappedLine = '';
  let currentWrappedLineAlreadyPushed = 0;
  let currentStyle: SpanStyle = styledSpans[0].style;
  styledSpans.forEach((styledBreakableSpan, styledSpanId) => {
    let isStyledSpanChanged = styledSpanId !== 0;
    const chunkPerSpan = spanToChunksPerSpan(styledBreakableSpan.breakableSpan, maxWidth);
    chunkPerSpan.forEach((chunksPerLine, lineId) => {
      let isLineChanged = lineId !== 0;
      chunksPerLine.forEach((chunksPerToken) => {
        chunksPerToken.forEach((chunk) => {
          const tryWrappedLine = currentWrappedLine + chunk;
          const isOversize = tryWrappedLine.length + currentWrappedLineAlreadyPushed > maxWidth;
          if (isStyledSpanChanged || isLineChanged || isOversize) {
            const wrappedStyledSpan = new StyledSpan(new Span(currentWrappedLine), currentStyle);
            wrappedStyledSpans.push(wrappedStyledSpan);
            currentWrappedLineAlreadyPushed += wrappedStyledSpan.breakableSpan.width;
            currentWrappedLine = chunk;
            if (isLineChanged || isOversize) {
              const emptyCleanBreakStyledSpan = new CleanBreakStyledSpan(eol);
              wrappedStyledSpans.push(emptyCleanBreakStyledSpan);
              currentWrappedLineAlreadyPushed = 0;
            }
          } else {
            currentWrappedLine = tryWrappedLine;
          }
          isLineChanged = false;
          isStyledSpanChanged = false;
          currentStyle = styledBreakableSpan.style;
        });
      });
    });
  });
  // tail
  const wrappedStyledSpan = new StyledSpan(new Span(currentWrappedLine), currentStyle);
  wrappedStyledSpans.push(wrappedStyledSpan);
  currentWrappedLine = '';
  return wrappedStyledSpans;
}


function lineToTokens(text:string):string[] {
  const tokens = text.split(' ');
  const respacedTokens = tokens.map((token, tokenId) => {
    // because of [ token ] ' ' [ token ] ' ' [ (maybe empty) token ]
    const isLast = (tokenId === tokens.length - 1);
    return token + (isLast ? '' : ' ');
  });
  return respacedTokens;
}
function tokenToChunks(text:string, maxWidth: number):string[] {
  const chunks: string[] = [];
  const stepsTotal = Math.ceil(text.length / maxWidth);
  for (let stepId = 0; stepId < stepsTotal; stepId++) {
    let chunk = text.substr(maxWidth * stepId, maxWidth);
    chunks.push(chunk);
  }
  return chunks;
}

function spanToChunksPerSpan(breakableSpan:BreakableSpan, maxWidth:number):chunksPerSpanT {
  const chunks = breakableSpan.lines.map((line) => {
    const tokens = lineToTokens(line);
    return tokens.map((token) => {
      const chunks = tokenToChunks(token, maxWidth);
      return chunks;
    });
  });
  return chunks;
}
