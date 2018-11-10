import * as React from 'react';
import ReactSVG from 'react-svg';
import './index.css';
import missingIcon from '../../assets/sharp-help-24px.svg';
import {
  IWidget,
} from '../../types';

interface IMenuProps {
  widgetTypes: Map<string, IWidget>;
  onNewItemClick: (type: string) => void;
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
  return (
    <div className="Menu">
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
