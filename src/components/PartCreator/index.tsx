import * as React from 'react';
import { IPart, IPartInstanceProps } from '../../types';
import Button from '../../parts/Button';
import Debug from '../../parts/Debug';

export default class PartCreator extends React.Component<IPart> {
  render() {
    let Comp: React.ComponentType<IPartInstanceProps> = null;
    switch (this.props.template) {
      case 'button':
        Comp = Button;
        break;
      default:
        Comp = Debug;
        break;
    }

    return (
      <Comp {...this.props} />
    );
  }
}
