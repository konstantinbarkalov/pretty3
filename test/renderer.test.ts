import { expect } from 'chai';
import { AtomicTextContainer, NonatomicTextContainer, TextContainer } from '../src/text/textContainer';
import { PlainRenderer, HtmlRenderer, AnsiRenderer } from '../src/text/renderer/implementation';
import { StrictUnicodeText, StrictUnicodeLine } from '../src/text/strictUnicode';
import { Style, StyleSwitches } from '../src/text/style';
import { StyleSwitchesEnum } from '../src/text/styleTypes';
import { EOL } from 'os';

const simpleLine = new AtomicTextContainer(new StrictUnicodeLine('hello '));
const richText = new NonatomicTextContainer([
  new AtomicTextContainer(new StrictUnicodeLine('my name is ')),
  new AtomicTextContainer(new StrictUnicodeLine('reanderer'), new Style({r: 22, g: 77, b: 55}, {r: 180, g: 200, b: 220}, new StyleSwitches({
    [StyleSwitchesEnum.Bold]: true,
    [StyleSwitchesEnum.Italic]: true,
    [StyleSwitchesEnum.Underline]: true,
  }))),
  new AtomicTextContainer(new StrictUnicodeLine(' ')),
  new NonatomicTextContainer([
    new AtomicTextContainer(new StrictUnicodeLine('and i can ')),
    new AtomicTextContainer(new StrictUnicodeText('mul' + EOL + 'ti' + EOL + 'line ')),
    new AtomicTextContainer(new StrictUnicodeText('and substyle'), new Style(undefined, {r: 255, g: 0, b: 0})),
  ], new Style(undefined, undefined, new StyleSwitches({ [StyleSwitchesEnum.Underline]: true }))),
]);
const wrapped = richText.wrap(20).wrapped;
const wrappedThenFlattened = wrapped.flatten();
const flattened = richText.flatten();
const flattenedThenWrapped = flattened.wrap(20).wrapped;

const textContainers: {[key: string]: TextContainer} = {
  simpleLine,
  richText,
  wrapped,
  wrappedThenFlattened,
  flattened,
  flattenedThenWrapped,
};

for (const [textContainerKey, textContainer] of Object.entries(textContainers)) {
  describe(`${textContainerKey} textContainer`, () => {
    const renderers = {
      plain: new PlainRenderer(),
      html: new HtmlRenderer(),
      ansi: new AnsiRenderer(),
    };
    for (const [rendererKey, renderer] of Object.entries(renderers)) {
      describe(`${rendererKey} renderer`, () => {
        const rendered = renderer.render(textContainer);
        it('must render same as renderFlat ', () => {
          const renderedFlat = renderer.renderFlat(textContainer.flatten());
          expect(rendered).to.be.equal(renderedFlat);
        });
        it('must render same as renderFlatLines ', () => {
          const renderedFlatLines = renderer.renderFlatLines(textContainer.splitToFlatLines());
          expect(rendered).to.be.equal(renderedFlatLines);
        });
        it('must render same as rejoined renderFlatLine ', () => {
          const renderedRejoinedFlatLine = textContainer.splitToFlatLines().map((flatLine) => {
            return renderer.renderFlatLine(flatLine);
          }).join(renderer.eol);
          expect(rendered).to.be.equal(renderedRejoinedFlatLine);
        });
      });
    }
  });

}