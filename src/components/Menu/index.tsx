import * as React from 'react';
import ReactSVG from 'react-svg';
import './index.css';
import editIcon from '../../assets/sharp-edit-24px.svg';
import missingIcon from '../../assets/sharp-help-24px.svg';
import {
  IWidget,
} from '../../types';

const {
  useState,
} = React;

interface IMenuProps {
  widgetTypes: Map<string, IWidget>;
  onNewItemClick: (type: string) => void;
  onEditModeChange: (mode: boolean) => void;
}

interface IWidgetButtonProps {
  definition: IWidget;
  onClick: () => void;
}

function WidgetButton(props: IWidgetButtonProps) {
  // let actualClass = (widgetClass.prototype instanceof Widget) ? (widgetClass as typeof Widget) : Widget;

  const icon = props.definition ? (
    <ReactSVG path={props.definition.iconPath} className="icon"></ReactSVG>
  ) : (
    <ReactSVG path={missingIcon} className="icon"></ReactSVG>
  );
  const title = props.definition ? props.definition.title : 'Unknown';

  return (
    <button
      key={props.definition.title}
      className="menu-item"
      onClick={props.onClick}
    >
      {icon}
      <span className="item-title">{title}</span>
    </button>
  );
}

export default function Menu(props: IMenuProps) {
  const [editActive, setEditActive] = useState(false);

  function toggleEditState() {
    const newMode = !editActive;
    setEditActive(newMode);

    props.onEditModeChange(newMode);
  }

  const editClasses = ['menu-item'];
  if (editActive) {
    editClasses.push('active');
  }

  return (
    <div className="Menu">
      <div className="menu-section edit-mode">
        <button
          className={editClasses.join(' ')}
          onClick={toggleEditState}
        >
          <ReactSVG path={editIcon} className="icon"></ReactSVG>
          <span className="item-title">Edit</span>
        </button>
      </div>
      <div className="menu-section add-items">
        {
          Array.from(props.widgetTypes.entries())
            .map(([type, widget]) => <WidgetButton
              key={type}
              definition={widget}
              onClick={() => props.onNewItemClick(type)}
            />)
        }
      </div>
    </div>
  );
}
