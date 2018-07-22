import * as React from 'react';
import ReactSVG from 'react-svg';
import './index.css';
import Widget from '../../widgets/Widget';
import editIcon from '../../assets/sharp-edit-24px.svg';
import autobind from 'autobind-decorator';

interface IMenuProps {
  widgetTypes: Map<string, typeof Widget>;
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
            onClick={this.toggleEditState}
          >
            <ReactSVG path={editIcon} className="icon"></ReactSVG>
            <span className="item-title">Edit</span>
          </button>
        </div>
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
