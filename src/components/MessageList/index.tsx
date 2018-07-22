import * as React from 'react';
import ReactSVG from 'react-svg';
import './index.css';
import autobind from 'autobind-decorator';
import { IDisplayMessage } from '../../types';

interface IMessageListProps {
  messages: IDisplayMessage[];
  onMessageRemoveClick: (message: IDisplayMessage) => void;
}

class MessageList extends React.Component<IMessageListProps> {
  render() {
    return null;
  }
}

export default MessageList;
