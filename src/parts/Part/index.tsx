import * as React from 'react';
import { IPartInstanceProps, IPartState } from '../../types';
import StorageHelper from '../../StorageHelper';

export default class Part<Props extends IPartInstanceProps = IPartInstanceProps, State extends IPartState = IPartState> extends React.Component<Props, State> {
  private storage: StorageHelper;

  constructor(props: Props) {
    super(props);

    this.storage = StorageHelper.getInstance();
  }

  setState(state: State) {
    super.setState(state);

    this.storage.savePartInstanceState(this.props.id, state);
  }
}
