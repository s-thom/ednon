import * as React from 'react';
import './index.css';
import Part, { IPartDataEvent } from '../../part/Part';
import PartFactory from '../../part/PartFactory';
import TextPart from '../../part/parts/TextPart';
import TextPartRenderer from './parts/TextPartRenderer';
import autobind from '../../../node_modules/autobind-decorator';

interface IPartRendererProps {
  id: string;
}

interface IPartRendererState {
  part?: Part;
}

const RENDERER_MAP: {
  [x: string]: PartRenderFunction;
} = {
  [TextPart.type]: TextPartRenderer,
};

export default class PartRenderer extends React.Component<IPartRendererProps, IPartRendererState> {
  private factory = PartFactory.getInstance();

  constructor(props: IPartRendererProps) {
    super(props);

    if (props.id) {
      this.factory.getPartById(props.id)
        .then(part => this.setState({
          ...this.state,
          part,
        }));
    } else {
      throw new Error('Invalid props given to PartRenderer');
    }
  }

  @autobind
  onDataUpdate(evt: IPartDataEvent) {
    this.forceUpdate();
  }

  componentWillReceiveProps(nextProps: IPartRendererProps, nextContext) {
    if (this.props.id !== nextProps.id) {
      this.setState({
        part: null,
      });
    }
  }

  componentWillUpdate(nextProps: IPartRendererProps, nextState: IPartRendererState, nextContext) {
    if (nextState.part) {
      if (!this.state.part || this.state.part.id !== nextState.part.id) {
        nextState.part.on('data', this.onDataUpdate);
      }
    }
    if (this.state.part && (!nextState.part || nextState.part.id !== this.state.part.id)) {
      this.state.part.off('data', this.onDataUpdate);
    }
  }

  componentWillUnmount() {
    if (this.state.part) {
      this.state.part.off('data', this.onDataUpdate);
    }
  }

  render() {
    if (this.state.part) {
      if (RENDERER_MAP[this.state.part.type]) {
        return RENDERER_MAP[this.state.part.type](this.state.part);
      } else {
        return (
          <div className="PartRenderer error">error</div>
        );
      }
    } else {
      return (
        <div className="PartRenderer loading">loading</div>
      );
    }
  }
}

export type PartRenderFunction = (part: Part) => JSX.Element;
