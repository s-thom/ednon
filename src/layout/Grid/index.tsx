import * as React from 'react';
import ReactSVG from 'react-svg';
import './index.css';
import {
  IDefinition,
  IWidget,
} from '../../types';
import removeIcon from '../../assets/sharp-close-24px.svg';
import missingIcon from '../../assets/sharp-help-24px.svg';

interface IGridProps {
  widgetTypes: Map<string, IWidget>;
  widgets?: IDefinition[];
  onWidgetRemove: (id: string) => void;
}

export default function Grid(props: IGridProps) {
  function GridItem(def: IDefinition) {
    const Comp = props.widgetTypes.get(def.type);
    return (
      <div
        className="wrapper"
        key={def.id}
      >
        <button
          className="remove-button"
          onClick={() => props.onWidgetRemove(def.id)}
        >
          <ReactSVG path={removeIcon} className="icon"></ReactSVG>
        </button>
        {Comp ? (
          <Comp.component
          id={def.id}
          type={def.type}
          data={def.data}
        />
        ) : (
          <ReactSVG path={missingIcon} className="missing"></ReactSVG>
        )}
      </div>

    );
  }

  if (!props.widgets) {
    return (
      <p>loading</p>
    );
  }

  return (
    <div className="Grid">
      {
        (props.widgets || []).map((d) => <GridItem {...d} key={d.id} />)
      }
    </div>
  );
}
