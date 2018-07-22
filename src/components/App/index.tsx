import * as React from 'react';
import './index.css';

import Grid from '../Grid';
import StorageHelper from '../../StorageHelper';
import WidgetMap from '../../WidgetMap';
import Widget from '../../widgets/Widget';
import Menu from '../Menu';
import autobind from 'autobind-decorator';
import {
  IDefinition,
  IDisplayMessage,
  MessageSeverity,
} from '../../types';
import {
  generateId,
} from '../../util';
import MessageList from '../MessageList';

interface IAppState {
  messages: IDisplayMessage[];
  widgets?: IDefinition[];
  editing: boolean;
}

// tslint:disable-next-line:no-any
class App extends React.Component<any, IAppState> {
  private storage: StorageHelper;

  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      widgets: undefined,
      editing: false,
    };

    this.storage = StorageHelper.getInstance();
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

  @autobind
  onItemToRemove(id: string) {
    if (!this.state.widgets) {
      this.showMessage(MessageSeverity.WARN, 'Please wait', 'The application is still loading, try again later');
      return;
    }

    const list = this.state.widgets.filter(d => d.id !== id);
    this.storage.removeWidget(id);

    this.setState({
      ...this.state,
      widgets: list,
    });
  }

  @autobind
  onEditModeChange(mode: boolean) {
    this.setState({
      ...this.state,
      editing: mode,
    });
  }

  @autobind
  onMessageRemove(message: IDisplayMessage) {
    const list = this.state.messages.filter(m => m !== message);

    this.setState({
      ...this.state,
      messages: list,
    });
  }

  render() {
    return (
      <div className="App">
        <Menu
          widgetTypes={WidgetMap}
          onNewItemClick={this.onNewItemToAdd}
          onEditModeChange={this.onEditModeChange}
        />
        <Grid
          widgets={this.state.widgets}
          widgetTypes={WidgetMap}
          onWidgetRemove={this.onItemToRemove}
          showRemoveIcons={this.state.editing}
        />
        <MessageList
          messages={this.state.messages}
          onMessageRemoveClick={this.onMessageRemove}
        />
      </div>
    );
  }
}

export default App;
