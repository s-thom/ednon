import Part from '../Part';

type LayoutDirection = 'vertical' | 'horizontal' | 'grid';

interface ILayoutData {
  children: string[];
  direction?: LayoutDirection;
  gridCols?: number;
  gridRow?: number;
}

export default class LayoutPart extends Part<ILayoutData> {

  static get type() {
    return 'layout';
  }
}
