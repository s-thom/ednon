import * as React from 'react';
import './index.css';
import TimerWidget from '../TimerWidget';
import Widget from '../Widget';
import autobind from '../../../node_modules/autobind-decorator';
import StorageHelper from '../../StorageHelper';
import { IDefinition, IState } from '../../types';

const widgetTypes = {
  timer: TimerWidget,
};

interface IGridProps {
  widgets?: IDefinition[];
}

class Grid extends React.Component<IGridProps> {

  createWidget(def: IDefinition, storage) {
    const Comp: typeof Widget = widgetTypes[def.type];
    return (
      <Comp
        key={def.id}
        storage={storage}
        id={def.id}
        type={def.type}
        data={def.data}
      />
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
