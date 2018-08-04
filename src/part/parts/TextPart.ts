import Part from '../Part';

interface ITextData {
  label?: string;
  text: string;
  multiline?: boolean;
}

export default class TextPart extends Part<ITextData> {

  static get type() {
    return 'text';
  }
}
