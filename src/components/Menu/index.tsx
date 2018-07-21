import * as React from 'react';
import './index.css';
import TimerWidget from '../TimerWidget';
import { StorageConsumer } from '../StorageProvider';
import Widget from '../Widget';
import autobind from '../../../node_modules/autobind-decorator';
import StorageHelper from '../../StorageHelper';
import { IDefinition, IState } from '../../types';

interface IMenuProps {
  widgetTypes: Map<string, typeof Widget>;
  onNewItemClick: (type: string) => void;
}

class Menu extends React.Component<IMenuProps> {

  createWidgetButton(type: string, widgetClass: typeof Widget) {
    return (
      <button
        key={type}
        className="menu-item"
        onClick={() => this.props.onNewItemClick(type)}
      >
        {widgetClass.renderIcon()}
        <span className="item-title">{widgetClass.title}</span>
      </button>
    );
  }

  render() {
    return (
      <div className="Menu">
        <div className="menu-section add-items">
          {
            Array.from(this.props.widgetTypes.entries())
              .map(entry => this.createWidgetButton(entry[0], entry[1]))
          }
        </div>
      </div>
    );
  }
}

export default Menu;
