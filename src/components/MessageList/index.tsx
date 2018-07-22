import * as React from 'react';
import ReactSVG from 'react-svg';
import './index.css';
import autobind from 'autobind-decorator';
import { IDisplayMessage } from '../../types';
import Message from './Message';

interface IMessageListProps {
  messages: IDisplayMessage[];
  onMessageRemoveClick: (id: string) => void;
}

class MessageList extends React.Component<IMessageListProps> {
  render() {
    return (
      <div className="MessageList">
        {this.props.messages.map(m => (
          <Message
            key={m.id}
            message={m}
            onMessageRemoveClick={this.props.onMessageRemoveClick}
          />
        ))}
      </div>
    );
  }
}

export default MessageList;
