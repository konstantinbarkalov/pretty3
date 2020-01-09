import { StyledSpan, SpanStyle, SpanStyleSwitches } from './sml/styledSpan';
import { SpanStyleSwitchesEnum } from './sml/styleTypes';
import { renderStyledSpans, devStyleRenderer } from './sml/render';
import { EOL } from 'os';
import * as fs from 'fs';
import { Span } from './sml/span';

const styledSpans = [
  new StyledSpan(new Span(
    'GitHub is home to over '
    ), SpanStyle.default
  ),
  new StyledSpan(new Span(
    '40 million '
    ), new SpanStyle({r: 210, g: 220, b: 255}, {r: 0, g: 64, b: 32}, new SpanStyleSwitches())
  ),
  new StyledSpan(new Span(
    'developers working together to host and review code, manage projects, and '
    ), SpanStyle.default
  ),
  new StyledSpan(new Span(
    'build software together. '
    ), new SpanStyle(undefined, undefined, new SpanStyleSwitches({[SpanStyleSwitchesEnum.Bold]: true}))
  ),
  new StyledSpan(new Span(
    'Since question was ' + EOL + 'regarding clunkiness ' + EOL + 'of property checking, and one regular usecase for that being validation of function argument options objects, thought I\'d mention a library-free short way of testing existence of multiple properties. '
    ), SpanStyle.default
  ),
  new StyledSpan(new Span(
    'Disclaimer: '
    ), new SpanStyle({r: 128, g: 128, b: 128}, undefined, new SpanStyleSwitches({[SpanStyleSwitchesEnum.Bold]: true}))
  ),
  new StyledSpan(new Span(
    'It does require ECMAScript 5 (but IMO anyone still using IE8 deserves a broken web)'
    ), new SpanStyle({r: 128, g: 128, b: 128}, undefined, new SpanStyleSwitches())
  ),
]

const rendered = renderStyledSpans(styledSpans, 40, devStyleRenderer);
console.log(rendered);
fs.writeFileSync('./rendered.html', rendered, 'utf8');


