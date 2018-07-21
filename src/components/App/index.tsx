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
import WidgetMap from '../../WidgetMap';
import { StorageProvider } from '../StorageProvider';
import Widget from '../Widget';
import TimerWidget from '../TimerWidget';
import Menu from '../Menu';
import autobind from '../../../node_modules/autobind-decorator';
import { generateId } from '../../util';

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
        this.setState({
          ...this.state,
          widgets: list,
        });
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

  @autobind
  onNewItemToAdd(type: string) {
    if (!this.state.widgets) {
      this.showMessage(MessageSeverity.WARN, 'Please wait', 'The application is still loading, try again later');
      return;
    }

    const list = [...this.state.widgets];
    const newWidget: IDefinition = {
      id: generateId(),
      type,
      data: (WidgetMap.get(type) || Widget).getDefaultData(),
    };
    list.push(newWidget);
    this.storage.newWidget(newWidget);

    this.setState({
      ...this.state,
      widgets: list,
    });
  }

  render() {
    return (
      <StorageProvider value={this.storage}>
        <div className="App">
          <Menu
            widgetTypes={WidgetMap}
            onNewItemClick={this.onNewItemToAdd}
          />
          <Grid widgets={this.state.widgets} />
        </div>
      </StorageProvider>
    );
  }
}

export default App;
