import * as React from 'react';
import './index.css';

import Grid from '../Grid';
import MessageHelper from '../../MessageHelper';
import StorageHelper from '../../StorageHelper';
import WidgetMap from '../../WidgetMap';
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
  private messageHelper: MessageHelper;

  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      widgets: undefined,
      editing: false,
    };

    this.messageHelper = MessageHelper.getInstance();
    this.messageHelper.addListener(this.onMessageAdd);

    this.storage = StorageHelper.getInstance();
    this.storage.ready()
      .then((isReady) => {
        if (!isReady) {
          this.messageHelper.send(MessageSeverity.ERROR, 'Unable to open database', 'Further information is available in the developer tools');
          return;
        }

        this.getListAndSetState();
      });
  }

  componentWillUnmount() {
    this.messageHelper.removeListener(this.onMessageAdd);
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

  @autobind
  onNewItemToAdd(type: string) {
    if (!this.state.widgets) {
      this.messageHelper.send(MessageSeverity.WARN, 'Please wait', 'The application is still loading, try again later');
      return;
    }

    const list = [...this.state.widgets];

    const newWidget: IDefinition = {
      id: generateId(),
      type,
      data: {},
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
      this.messageHelper.send(MessageSeverity.WARN, 'Please wait', 'The application is still loading, try again later');
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
  onMessageAdd(message: IDisplayMessage) {
    const list = [...this.state.messages];
    list.push(message);

    this.setState({
      ...this.state,
      messages: list,
    });
  }

  @autobind
  onMessageRemove(id: string) {
    const list = this.state.messages.filter(m => m.id !== id);

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
