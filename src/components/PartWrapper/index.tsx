import * as React from 'react';
import {
  IPart,
} from '../../types';
import PartCreator from '../PartCreator';
import StorageHelper from '../../StorageHelper';

interface IProps {
  id: string;
}

interface IState {
  iPart?: IPart;
}

export default class PartWrapper extends React.Component<IProps, IState> {
  private readonly storageHelper: StorageHelper;

  constructor(props) {
    super(props);

    this.storageHelper = StorageHelper.getInstance();
  }

  requestPart(id: string) {
    this.setState({
      ...this.state,
      iPart: undefined,
    });

    this.storageHelper.getPartFromId(id)
      .then((part) => {
        this.setState({
          ...this.state,
          iPart: part,
        });
      });
  }

  componentWillReceiveProps(nextProps: IProps, nextContext) {
    if (nextProps.id !== this.props.id) {
      this.requestPart(nextProps.id);
    }
  }

  render() {
    if (this.state.iPart) {
      return (<PartCreator {...this.state.iPart} />);
    } else {
      return (
        <div className="Loading">Loading</div>
      );
    }
  }
}
