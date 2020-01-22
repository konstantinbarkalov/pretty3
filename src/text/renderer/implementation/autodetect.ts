import { FlatNonatomicTextContainer, AnyTextContainer } from '../../textContainer';
import { StrictUnicodeLine, AnyStrictUnicodeT } from '../../strictUnicode';
import { Renderer } from '../abstract/renderer';
import { PlainRenderer } from './plain';
import { AnsiRenderer } from './ansi';
import { HtmlRenderer } from './html';

type featuresT = {
  width: number;
  readonly env: 'terminal' | 'browser' | 'unknown';
  readonly allowStyles: boolean;
};
export class AutodetectRenderer extends Renderer {
  public readonly eol: string;
  protected renderer: Renderer;
  public readonly features: featuresT;
  constructor() {
    super();
    this.features = this.detectFeatures();
    this.renderer = this.createRenderer();
    this.eol = this.renderer.eol;
  }
  protected detectFeatures(): featuresT {
    return {
      width: Infinity,
      env: 'unknown',
      allowStyles: false,
    };
  }
  protected createRenderer(): Renderer {
    if (!this.features.allowStyles) {
      return new PlainRenderer();
    } else {
      if (this.features.env === 'unknown') {
        return new PlainRenderer();
      } else if (this.features.env === 'terminal') {
        return new AnsiRenderer();
      } else if (this.features.env === 'browser') {
        return new HtmlRenderer();
      } else {
        throw new Error('unsupported features env');
      }
    }
  }
  public render(textContainer: AnyTextContainer<AnyStrictUnicodeT>): string {
    return this.renderer.render(textContainer);
  }
  public renderFlat(flatTextContainer: FlatNonatomicTextContainer<AnyStrictUnicodeT>): string {
    return this.renderer.renderFlat(flatTextContainer);
  }
  public renderFlatLines(flatLines: FlatNonatomicTextContainer<StrictUnicodeLine>[]): string {
    return this.renderer.renderFlatLines(flatLines);
  }
  public renderFlatLine(flatLineContainer: FlatNonatomicTextContainer<StrictUnicodeLine>): string {
    return this.renderer.renderFlatLine(flatLineContainer);
  }
}