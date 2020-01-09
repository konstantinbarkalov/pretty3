import { StyledSpan, guardUnbreakedStyledSpan, guardCleanBreakStyledSpan } from "./styledSpan";
import { wrapStyledSpans } from "./wrap2";
import { SpanStyleSwitchesEnum } from "./styleTypes";
import { EOL } from 'os';

export function renderStyledSpans(styledSpans:StyledSpan[], maxWidth: number, styleRenderer: styleRendererCallbackT):string {
  const wrappedStyledSpans = wrapStyledSpans(styledSpans, maxWidth, EOL);
  let renderedString = '';
  wrappedStyledSpans.forEach((wrappedStyledSpan) => {
    renderedString += styleRenderer(wrappedStyledSpan);
  })
  return renderedString;
}
type styleRendererCallbackT = (styledSpan: StyledSpan) => string;
export function devStyleRenderer(styledSpan: StyledSpan):string {
  if (guardUnbreakedStyledSpan(styledSpan)) {
    const { style } = styledSpan;
    const text = styledSpan.span.toString();
    let foregroundStyleString = '';
    if (style.foreground) {
      foregroundStyleString = `color: rgb(${style.foreground.r}, ${style.foreground.g}, ${style.foreground.b}); `;
    }
    let backgroundStyleString = '';
    if (style.background) {
      backgroundStyleString = `background-color: rgb(${style.background.r}, ${style.background.g}, ${style.background.b}); `;
    }
    let switchesStyleString = '';
    if (style.switches[SpanStyleSwitchesEnum.Bold]) {
      switchesStyleString += 'font-weight: bold; '
    }
    if (style.switches[SpanStyleSwitchesEnum.Underline]) {
      switchesStyleString += 'text-decoration: underline; '
    }
    const styleString = foregroundStyleString  + backgroundStyleString + switchesStyleString;

    return '<span style="' + styleString + '">' + text + '</span>';
  } else if (guardCleanBreakStyledSpan(styledSpan)) {
    return '</br>';
  } else {
    throw new Error('Unknown StyledSpan type');
  }
}

