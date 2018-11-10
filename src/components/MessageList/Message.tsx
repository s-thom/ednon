import * as React from 'react';
import ReactSVG from 'react-svg';
import './index.css';
import {
  IDisplayMessage,
} from '../../types';
import removeIcon from '../../assets/sharp-close-24px.svg';

interface IMessageProps {
  message: IDisplayMessage;
  onMessageRemoveClick: (id: string) => void;
}

class Message extends React.Component<IMessageProps> {
  render() {
    const message = this.props.message;
    let buttons: JSX.Element;
    if (message.actions && message.actions.length) {
      buttons = (
        <div className="button-list">
        {
          message.actions.map((action, index) => (
            <button
              key={`${message.id}-action-${index}`}
              className="action"
              onClick={() => {
                try {
                  action.onClick();
                } catch (err) {
                  // tslint:disable-next-line:no-console
                  console.error('Error in action click');
                }
                this.props.onMessageRemoveClick(message.id);
              }}
            >{action.text}</button>
          ))
        }
        </div>
      );
    }

    return (
      <div className={`Message ${message.severity}`}>
        <div className="header">
          <p className="title">{message.title}</p>
          <button
            className="close"
            onClick={() => this.props.onMessageRemoveClick(message.id)}
          >
            <ReactSVG path={removeIcon} className="icon" />
          </button>
        </div>
        <div className="body">
          <p className="message">{message.message}</p>
          {buttons}
        </div>
      </div>
    );
  }
}

export default Message;
