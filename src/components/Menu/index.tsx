import * as React from 'react';
import ReactSVG from 'react-svg';
import './index.css';
import editIcon from '../../assets/sharp-edit-24px.svg';
import missingIcon from '../../assets/sharp-help-24px.svg';
import autobind from 'autobind-decorator';
import {
  IWidget,
} from '../../types';

interface IMenuProps {
  widgetTypes: Map<string, IWidget>;
  onNewItemClick: (type: string) => void;
  onEditModeChange: (mode: boolean) => void;
}

interface IMenuState {
  editActive: boolean;
}

class Menu extends React.Component<IMenuProps, IMenuState> {
  constructor(props: IMenuProps) {
    super(props);

    this.state = {
      editActive: false,
    };
  }

  createWidgetButton(type: string, widgetDefinition: IWidget) {
    // let actualClass = (widgetClass.prototype instanceof Widget) ? (widgetClass as typeof Widget) : Widget;

    const icon = widgetDefinition ? (
      <ReactSVG path={widgetDefinition.iconPath} className="icon"></ReactSVG>
    ) : (
      <ReactSVG path={missingIcon} className="icon"></ReactSVG>
    );
    const title = widgetDefinition ? widgetDefinition.title : 'Unknown';

    return (
      <button
        key={type}
        className="menu-item"
        onClick={() => this.props.onNewItemClick(type)}
      >
        {icon}
        <span className="item-title">{title}</span>
      </button>
    );
  }

  @autobind
  toggleEditState() {
    const newMode = !this.state.editActive;

    this.props.onEditModeChange(newMode);

    this.setState({
      ...this.state,
      editActive: newMode,
    });
  }

  render() {
    const editClasses = ['menu-item'];
    if (this.state.editActive) {
      editClasses.push('active');
    }

    return (
      <div className="Menu">
        <div className="menu-section edit-mode">
          <button
            className={editClasses.join(' ')}
            // tslint:disable-next-line:no-unbound-method
            onClick={this.toggleEditState}
          >
            <ReactSVG path={editIcon} className="icon"></ReactSVG>
            <span className="item-title">Edit</span>
          </button>
        </div>
        <div className="menu-section add-items">
          {
            Array.from(this.props.widgetTypes.entries())
              .map((entry) => this.createWidgetButton(entry[0], entry[1]))
          }
        </div>
      </div>
    );
  }
}

export default Menu;
