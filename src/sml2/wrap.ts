import { StyledBreakableSpan, StyledSpan, CleanBreakStyledSpan, SpanStyle } from "../sml/styledSpan";
import { StyledSpanSheet, StyledSpanLine } from "../sml/styledSpanLine";
import { Span } from "../sml/span";

function convertStyledSheetTo(styledBreakableSpans:StyledBreakableSpan[]):StyledSpanSheet {
  let styledSpanLines:StyledSpanLine[] = [];
  styledBreakableSpans.forEach((styledBreakableSpan) => {
    styledBreakableSpan.breakableSpan.lines.forEach((unbreakedLine) => {
      const span = new Span(unbreakedLine);
      const styledSpan = new StyledSpan(span, styledBreakableSpan.style);
      // only one single styleSpan per line because we are splitting one mulityline style
      const styledSpanLine = new StyledSpanLine([styledSpan], 'hard');
      styledSpanLines.push(styledSpanLine);
    });
  });
  const styledSpanSheet = new StyledSpanSheet(styledSpanLines);
  return styledSpanSheet;
}


function rewrapSheet(inputSheet:StyledSpanSheet, maxWidth: number):StyledSpanSheet {
  inputSheet.styledSpanLines.forEach((styledSpanLine) => {
    styledSpanLine.styledSpans.forEach((styledSpan) => {
      const style = styledSpan.style;
      const width = styledSpan.span.width;
      const text = styledSpan.span.toString();
      const chunkPerSpan = spanToChunksPerSpan(styledSpan.span, maxWidth);
    });
  });
  return inputSheet;
}





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
