import Part from '../Part';

type ButtonType = 'primary' | 'secondary';

interface IButtonData {
  text: string;
  type?: ButtonType;
}

export default class ButtonPart extends Part<IButtonData> {

  static get type() {
    return 'button';
  }
}
