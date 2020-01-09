
import { chunksPerSpanT } from "./types";
import { StyledSpan, SpanStyle, CleanBreakStyledSpan, UnbreakedStyledSpan } from "./styledSpan";
import { Span, UnbreakedSpan } from "./span";

export function wrapStyledSpans(styledSpans:StyledSpan[], maxWidth: number, eol: string):(CleanBreakStyledSpan | UnbreakedStyledSpan)[] {
  const wrappedStyledSpans:(CleanBreakStyledSpan | UnbreakedStyledSpan)[] = [];
  let currentWrappedLine = '';
  let currentWrappedLineAlreadyPushed = 0;
  let currentStyle: SpanStyle = styledSpans[0].style;
  styledSpans.forEach((styledSpan, styledSpanId) => {
    let isStyledSpanChanged = styledSpanId !== 0;
    const chunkPerSpan = spanToChunksPerSpan(styledSpan.span, maxWidth);
    chunkPerSpan.forEach((chunksPerLine, lineId) => {
      let isLineChanged = lineId !== 0;
      chunksPerLine.forEach((chunksPerToken) => {
        chunksPerToken.forEach((chunk) => {
          const tryWrappedLine = currentWrappedLine + chunk;
          const isOversize = tryWrappedLine.length + currentWrappedLineAlreadyPushed > maxWidth;
          if (isStyledSpanChanged || isLineChanged || isOversize) {
            const wrappedStyledSpan = new UnbreakedStyledSpan(new UnbreakedSpan(currentWrappedLine), currentStyle);
            wrappedStyledSpans.push(wrappedStyledSpan);
            currentWrappedLineAlreadyPushed += wrappedStyledSpan.span.width;
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
          currentStyle = styledSpan.style;
        });
      });
    });
  });
  // tail
  const wrappedStyledSpan = new UnbreakedStyledSpan(new UnbreakedSpan(currentWrappedLine), currentStyle);
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

function spanToChunksPerSpan(span:Span, maxWidth:number):chunksPerSpanT {
  const chunks = span.lines.map((line) => {
    const tokens = lineToTokens(line);
    return tokens.map((token) => {
      const chunks = tokenToChunks(token, maxWidth);
      return chunks;
    });
  });
  return chunks;
}
