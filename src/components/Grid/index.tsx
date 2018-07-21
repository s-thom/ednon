import * as React from 'react';
import ReactSVG from 'react-svg';
import './index.css';
import TimerWidget from '../TimerWidget';
import Widget from '../Widget';
import autobind from '../../../node_modules/autobind-decorator';
import StorageHelper from '../../StorageHelper';
import { IDefinition, IState } from '../../types';
import removeIcon from '../../assets/sharp-timer-24px.svg';

const widgetTypes = {
  timer: TimerWidget,
};

interface IGridProps {
  widgets?: IDefinition[];
  onWidgetRemove: (id: string) => void;
}

class Grid extends React.Component<IGridProps> {

  createWidget(def: IDefinition) {
    const Comp: typeof Widget = widgetTypes[def.type];
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

    return (
      <div className="Grid">
        {
          (this.props.widgets || []).map(d => this.createWidget(d))
        }
      </div>
    );
  }
}

export default Grid;
