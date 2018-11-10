import * as React from 'react';
import './index.css';
import {
  IDisplayMessage,
} from '../../types';
import Message from './Message';

interface IMessageListProps {
  messages: IDisplayMessage[];
  onMessageRemoveClick: (id: string) => void;
}

export default function MessageList(props: IMessageListProps) {
  return (
    <div className="MessageList">
      {props.messages.map((m) => (
        <Message
          key={m.id}
          message={m}
          onMessageRemoveClick={props.onMessageRemoveClick}
        />
      ))}
    </div>
  );
}
