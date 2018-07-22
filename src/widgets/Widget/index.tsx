import * as React from 'react';
import ReactSVG from 'react-svg';
import defaultIcon from '../../assets/sharp-help-24px.svg';
// import './index.css';
import { IState, IProps } from '../../types';
import { createInactivityTimeout } from '../../util';
import StorageHelper from '../../StorageHelper';

const STATE_SAVE_TIMEOUT = 300;

export default class Widget<State extends IState = IState> extends React.Component<IProps<State>, State> {
  static title = 'Unknown';
  private readonly saveHandler: (state: IState) => void;
  private readonly storage;

  static renderIcon() {
    return (
      <ReactSVG path={defaultIcon} className="icon" />
    );
  }

  static getDefaultData() {
    return {};
  }

  constructor(props: IProps<State>) {
    super(props);

    this.state = props.data;

    this.saveHandler = createInactivityTimeout((s) => this.saveState(s), STATE_SAVE_TIMEOUT);

    this.storage = StorageHelper.getInstance();
  }

  setState(state) {
    super.setState(state);

    this.saveHandler(state);
  }

  saveState(state) {
    this.storage.saveWidgetState(this.props.id, state);
  }
}
