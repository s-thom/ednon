import * as React from 'react';
// import './index.css';
import { IState, IProps } from '../../types';
import { createInactivityTimeout } from '../../util';

const STATE_SAVE_TIMEOUT = 300;

export default class Widget<State extends IState> extends React.Component<IProps<State>, State> {
  private saveHandler: (state: IState) => void;

  constructor(props: IProps<State>) {
    super(props);

    this.state = props.data;

    this.saveHandler = createInactivityTimeout((s) => this.saveState(s), STATE_SAVE_TIMEOUT);
  }

  setState(state) {
    super.setState(state);

    this.saveHandler(state);
  }

  saveState(state) {
    this.props.storage.saveWidgetState(this.props.id, state);
  }
}
