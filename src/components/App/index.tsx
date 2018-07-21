import * as React from 'react';
import './index.css';

import logo from '../../assets/logo.svg';
import Grid from '../Grid';
import StorageHelper from '../../StorageHelper';
import {
  IDisplayMessage,
  MessageSeverity,
  IDefinition,
} from '../../types';
import { StorageProvider } from '../StorageProvider';

interface IState {
  messages: IDisplayMessage[];
  widgets?: IDefinition[];
}

// tslint:disable-next-line:no-any
class App extends React.Component<any, IState> {
  private storage: StorageHelper;

  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      widgets: undefined,
    };

    this.storage = new StorageHelper();
    this.storage.ready()
      .then((isReady) => {
        if (!isReady) {
          this.showMessage(MessageSeverity.ERROR, 'Unable to open database', 'Further information is available in the developer tools');
          return;
        }

        this.getListAndSetState();
      });
  }

  getListAndSetState() {
    this.storage.getAllWidgets()
      .then((list) => {
        if (list.length === 0) {
          this.storage.newWidget('foo', 'timer', {
            title: 'foo',
            notes: 'some notes',
            running: false,
          })
            .then(() => {
              console.log('uh oh');
              this.getListAndSetState();
            });
        } else {
          this.setState({
            ...this.state,
            widgets: list,
          });
        }
      });
  }

  showMessage(severity: MessageSeverity, title: string, message: string) {
    // Do shallow copy of messages array
    const messageArray = [...this.state.messages];

    messageArray.push({
      severity,
      title,
      message,
    });

    this.setState({
      ...this.state,
      messages: messageArray,
    });
  }

  render() {
    return (
      <StorageProvider value={this.storage}>
        <div className="App">
          <Grid widgets={this.state.widgets} />
        </div>
      </StorageProvider>
    );
  }
}

export default App;
