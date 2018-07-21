import * as React from 'react';
import autobind from 'autobind-decorator';
import IntervalRenderer from '../IntervalRenderer';
import TimerDisplay from '../TimerDisplay';
// import './index.css';
import { IState, IProps } from '../../types';

class Widget<State extends IState> extends React.Component<IProps<State>, State> {
  constructor(props: IProps<State>) {
    super(props);

    this.state = props.data;
  }

  setState(state) {
    super.setState(state);

    this.props.storage.saveWidgetState(this.props.id, state);
  }
}

export default Widget;
