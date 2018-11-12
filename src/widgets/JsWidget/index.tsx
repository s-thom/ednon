import * as React from 'react';
import './index.css';
import {
  IProps,
  IWidget,
} from '../../types';
import iconPath from '../../assets/js-24px.svg';
import Input from '../../components/Input';
import useStoredState from '../../useStoredState';
import Card from '../../components/Card';

const {
  useState,
  useEffect,
} = React;

interface IJsHistoryItem {
  isResult: boolean;
  value: string;
  success: boolean;
}

interface IJsState {
  title: string;
  history: IJsHistoryItem[];
}

interface IHistoryListProps {
  history: IJsHistoryItem[];
}

function HistoryItem(props: IJsHistoryItem) {
  const classes = [
    'history-item',
    props.success ? 'success' : 'error',
  ];

  return (
    <div className={classes.join(' ')}>
      <div className={`direction-indicator ${props.isResult ? 'left' : 'right'}`} />
      <div className="content">{props.value}</div>
    </div>
  );
}

function HistoryList(props: IHistoryListProps) {
  return (
    <div className="history-list">
      {
        props.history.map((item, index) => (<HistoryItem {...item} key={index} />))
      }
    </div>
  );
}

function JsWidget(props: IProps<IJsState>) {
  const [title, setTitle] = useStoredState(props, 'title', 'New Console');
  const [history, setHistory] = useStoredState(props, 'history', []);

  const [input, setInput] = useState('');
  const [futureHistoryItems, setFutureHistoryItems] = useState<IJsHistoryItem[]>([]);

  function queueHistoryItem(...items: IJsHistoryItem[]) {
    const newList = futureHistoryItems.slice();
    newList.push(...items);
    setFutureHistoryItems(newList);
  }

  // Effect that will run whenever there's something to add to the console
  useEffect(() => {
    if (futureHistoryItems.length) {
      const newHistory = history.slice();
      newHistory.push(...futureHistoryItems);
      setHistory(newHistory);
      setFutureHistoryItems([]);
    }
  // tslint:disable-next-line:align
  }, [futureHistoryItems.length]);

  function onTitleValueChange(value: string) {
    setTitle(value);
  }
  function onInputValueChange(value: string) {
    setInput(value);
  }

  function onPromptEnter() {
    if (!input) {
      return;
    }

    const str = `return (async () => {return ${input}})()`;

    setInput('');
    const toAdd: IJsHistoryItem[] = [
      {
        isResult: false,
        value: input,
        success: true,
      },
    ];

    let fn: Function;
    try {
      fn = new Function(str);
    } catch (err) {
      toAdd.push({
        isResult: true,
        success: false,
        value: err.message,
      });
      return;
    } finally {
      queueHistoryItem(...toAdd);
    }

    // tslint:disable-next-line:no-any
    const promise: Promise<any> = fn();

    promise
      .then(
        (result) => {
          queueHistoryItem({
            isResult: true,
            success: true,
            value: JSON.stringify(result),
          });
        },
        (err) => {
          queueHistoryItem({
            isResult: true,
            success: false,
            value: (err instanceof Error) ? err.message : JSON.stringify(err),
          });
        },
      );
  }

  return (
    <Card className="JsWidget">
      <Input
        className="title"
        value={title}
        onChange={onTitleValueChange}
        id={`${props.id}-title`}
        name={`${props.id}-title`}
      />
      <HistoryList
        history={history}
      />
      <div className="prompt-container">
        <div className="direction-indicator active right" />
        <Input
          className="input"
          value={input}
          onChange={onInputValueChange}
          onEnter={onPromptEnter}
          id={`${props.id}-input`}
          name={`${props.id}-input`}
        />
      </div>
    </Card>
  );
}

const definition: IWidget = {
  title: 'Prompt',
  iconPath,
  component: JsWidget,
};

export default definition;
