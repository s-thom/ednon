import * as React from 'react';
import './index.css';

import Grid from '../Grid';
import MessageHelper from '../../MessageHelper';
import StorageHelper from '../../StorageHelper';
import WidgetMap from '../../WidgetMap';
import Menu from '../Menu';
import {
  IDefinition,
  IDisplayMessage,
  MessageSeverity,
} from '../../types';
import {
  generateId,
} from '../../util';
import MessageList from '../../components/MessageList';

const {
  useState,
  useEffect,
} = React;

export default function App() {
  const [messages, setMessages] = useState<IDisplayMessage[]>([]);
  const [widgets, setWidgets] = useState<IDefinition[]>(null);

  const storage = StorageHelper.getInstance();
  const messageHelper = MessageHelper.getInstance();

// tslint:disable:no-floating-promises
  function onNewItemToAdd(type: string) {
    if (!widgets) {
      messageHelper.send(MessageSeverity.WARN, 'Please wait', 'The application is still loading, try again later');
      return;
    }

    const list = widgets.slice();

    const newWidget: IDefinition = {
      id: generateId(),
      type,
      data: {},
      position: widgets.length,
    };
    list.push(newWidget);
    storage.newWidget(newWidget);

    setWidgets(list);
  }

  function onItemToRemove(id: string) {
    if (!widgets) {
      messageHelper.send(MessageSeverity.WARN, 'Please wait', 'The application is still loading, try again later');
      return;
    }

    const list = widgets.filter((d) => d.id !== id);
    storage.removeWidget(id);

    setWidgets(list);
  }

  function onMessageAdd(message: IDisplayMessage) {
    const list = messages.slice();
    list.push(message);

    setMessages(list);
  }

  function onMessageRemove(id: string) {
    const list = messages.filter((m) => m.id !== id);

    setMessages(list);
  }

  async function getListAndSetState() {
    // tslint:disable-next-line:no-console
    console.log('Getting things to display');
    const list = await storage.getAllWidgets();
    list.sort((a, b) => {
      if (a.position === undefined && b.position === undefined) {
        return 0;
      } else if (a.position === undefined) {
        return -1;
      } else if (b.position === undefined) {
        return 1;
      } else {
        return a.position - b.position;
      }
    });
    setWidgets(list);
  }

  useEffect(() => {
    messageHelper.addListener(onMessageAdd);

    return () => {
      messageHelper.removeListener(onMessageAdd);
    };
  });

  useEffect(() => {
    storage.ready()
      .then((isReady) => {
        if (!isReady) {
          messageHelper.send(MessageSeverity.ERROR, 'Unable to open database', 'Further information is available in the developer tools');
          return undefined;
        }

        getListAndSetState();
      });
  // Note: Passing storage (a singleton) as the effect checking parameter. This (should) mean that the effect only
  // gets run once for each "instance" of this component
  // tslint:disable-next-line:align
  }, [storage]);
  // tslint:enable:no-floating-promises

  return (
    <div className="App">
      <Menu
        widgetTypes={WidgetMap}
        onNewItemClick={onNewItemToAdd}
      />
      <Grid
        widgets={widgets}
        widgetTypes={WidgetMap}
        onWidgetRemove={onItemToRemove}
      />
      <MessageList
        messages={messages}
        onMessageRemoveClick={onMessageRemove}
      />
    </div>
  );
}
