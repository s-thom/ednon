import * as React from 'react';
import ReactSVG from 'react-svg';
import './index.css';
import autobind from 'autobind-decorator';
import { IDisplayMessage } from '../../types';

interface IMessageProps {
  message: IDisplayMessage;
  onMessageRemoveClick: (message: IDisplayMessage) => void;
}

class Message extends React.Component<IMessageProps> {
  render() {
    return null;
  }
}

export default Message;
