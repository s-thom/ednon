import * as React from 'react';
import ReactSVG from 'react-svg';
import autobind from 'autobind-decorator';
import './index.css';
import { IProps } from '../../types';
import Widget from '../Widget';
import iconPath from '../../assets/sharp-speaker_notes-24px.svg';

interface INoteState {
  title: string;
  notes: string;
}

class NotesWidget extends Widget<INoteState> {
  static title = 'Notes';

  static renderIcon() {
    return (
      <ReactSVG path={iconPath} className="icon" />
    );
  }

  static getDefaultData() {
    return {
      title: 'New Note',
      notes: 'Note...',
    };
  }

  constructor(props: IProps<INoteState>) {
    super(props);

    this.state = props.data;
  }

  @autobind
  onTitleChange(event: React.FormEvent) {
    this.setState({
      ...this.state,
      title: (event.target as any).value,
    });
  }

  @autobind
  onNotesChange(event: React.FormEvent) {
    this.setState({
      ...this.state,
      notes: (event.target as any).value,
    });
  }

  render() {
    return (
      <div className="NotesWidget">
        <input
          className="title"
          type="text"
          name={`${this.props.id}-title`}
          id={`${this.props.id}-title`}
          value={this.state.title}
          onChange={this.onTitleChange}
        />
        <textarea
          className="notes"
          name={`${this.props.id}-notes`}
          id={`${this.props.id}-notes`}
          value={this.state.notes}
          onChange={this.onNotesChange}
        />
      </div>
    );
  }
}

export default NotesWidget;
