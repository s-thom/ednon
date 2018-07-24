import * as React from 'react';
import './index.css';
import autobind from 'autobind-decorator';
import { IPartState, IPartInstanceProps } from '../../types';
import Part from '../Part';

type ButtonType = 'primary' | 'secondary';

interface IButtonState extends IPartState {
  text: string;
  type?: ButtonType;
}

interface IButtonProps extends IPartInstanceProps {
  onClick: () => void;
}

export default class Button extends Part<IButtonProps, IButtonState> {
  render() {
    const state = this.state;

    const computedProps = {
      id: this.props.id,
    };

    const classes = ['Button'];
    if (state.type) {
      classes.push(state.type);
    }
    if (state.size) {
      classes.push(state.size);
    }

    return (
      <button {...computedProps}>{this.state.text}</button>
    );
  }
}
