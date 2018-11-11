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
  useRef,
} = React;

interface IJsHistoryItem {
  isResult: boolean;
  value: string;
  success?: boolean;
}

interface IJsState {
  title: string;
  history: IJsHistoryItem[];
}

interface IHistoryListProps {
  history: IJsHistoryItem[];
}

function HistoryItem(props: IJsHistoryItem) {
  return (
    <div className="history-item">
      <div className="input">{props.value}</div>
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
  const [storedHistory, setHistory] = useStoredState(props, 'history', []);

  const historyRef = useRef(storedHistory);

  const [input, setInput] = useState('');

  function onTitleValueChange(value: string) {
    setTitle(value);
  }
  function onInputValueChange(value: string) {
    setInput(value);
  }

  function addHistoryItem(item: IJsHistoryItem) {
    const newHistory = historyRef.current.slice();
    newHistory.push(item);
    setHistory(newHistory);
  }

  function onPromptEnter() {
    if (!input) {
      return;
    }

    const str = `return (async () => {return ${input}})()`;

    const historyItem: IJsHistoryItem = {
      isResult: false,
      value: input,
    };
    addHistoryItem(historyItem);

    console.log(str);
    const fn = new Function(str);
    console.log(fn);
    // tslint:disable-next-line:no-any
    const promise: Promise<any> = fn();

    promise
      .then(
        (result) => {
          addHistoryItem({
            isResult: true,
            success: true,
            value: JSON.stringify(result),
          });
        },
        (err) => {
          addHistoryItem({
            isResult: true,
            success: false,
            value: JSON.stringify((err instanceof Error) ? err.message : err),
          });
        },
      );

    setInput('');
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
        history={historyRef.current}
      />
      <Input
        className="input"
        value={input}
        onChange={onInputValueChange}
        onEnter={onPromptEnter}
        id={`${props.id}-input`}
        name={`${props.id}-input`}
        placeholder=">"
      />
    </Card>
  );
}

const definition: IWidget = {
  title: 'Console',
  iconPath,
  component: JsWidget,
};

export default definition;
