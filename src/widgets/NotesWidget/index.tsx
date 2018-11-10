import * as React from 'react';
import ReactSVG from 'react-svg';
import autobind from 'autobind-decorator';
import './index.css';
import { IProps } from '../../types';
import Widget from '../Widget';
import iconPath from '../../assets/sharp-speaker_notes-24px.svg';
import Input from 'src/components/Input';

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
  onTitleValueChange(value: string) {
    this.setState({
      ...this.state,
      title: value,
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
        <Input
          className="title"
          value={this.state.title}
          onChange={this.onTitleValueChange}
          id={`${this.props.id}-title`}
          name={`${this.props.id}-title`}
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
