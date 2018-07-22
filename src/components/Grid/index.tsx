import * as React from 'react';
import ReactSVG from 'react-svg';
import './index.css';
import Widget from '../../widgets/Widget';
import { IDefinition } from '../../types';
import removeIcon from '../../assets/sharp-close-24px.svg';

interface IGridProps {
  widgetTypes: Map<string, typeof Widget>;
  widgets?: IDefinition[];
  showRemoveIcons: boolean;
  onWidgetRemove: (id: string) => void;
}

class Grid extends React.Component<IGridProps> {

  createWidget(def: IDefinition) {
    const Comp: typeof Widget = this.props.widgetTypes.get(def.type) || Widget;
    return (
      <div
        className="wrapper"
        key={def.id}
      >
        <button
          className="remove-button"
          onClick={() => this.props.onWidgetRemove(def.id)}
        >
          <ReactSVG path={removeIcon} className="icon"></ReactSVG>
        </button>
        <Comp
          id={def.id}
          type={def.type}
          data={def.data}
        />
      </div>

    );
  }

  render() {
    if (!this.props.widgets) {
      return (
        <p>loading</p>
      );
    }

    const classNames = [
      'Grid',
    ];
    if (this.props.showRemoveIcons) {
      classNames.push('removing');
    }

    return (
      <div className={classNames.join(' ')}>
        {
          (this.props.widgets || []).map(d => this.createWidget(d))
        }
      </div>
    );
  }
}

export default Grid;
