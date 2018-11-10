import * as React from 'react';
import ReactSVG from 'react-svg';
import autobind from 'autobind-decorator';
import './index.css';
import { IProps } from '../../types';
import Widget from '../Widget';
import iconPath from '../../assets/sharp-speaker_notes-24px.svg';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import useStoredState from 'src/useStoredState';

interface INoteState {
  title: string;
  notes: string;
}

export default function NotesWidget(props: IProps<INoteState>) {
  const [title, setTitle] = useStoredState(props, 'title');
  const [notes, setNotes] = useStoredState(props, 'notes');

  function onTitleValueChange(value: string) {
    setTitle(value);
  }
  function onNotesValueChange(value: string) {
    setNotes(value);
  }

  return (
    <div className="NotesWidget">
      <Input
        className="title"
        value={title}
        onChange={onTitleValueChange}
        id={`${props.id}-title`}
        name={`${props.id}-title`}
      />
      <Textarea
        className="notes"
        name={`${props.id}-notes`}
        id={`${props.id}-notes`}
        value={notes}
        onChange={onNotesValueChange}
      />
    </div>
  );
}

class NotesWidget2 extends Widget<INoteState> {
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
  onTitleValueChange(value: string) {
    this.setState({
      ...this.state,
      title: value,
    });
  }

  @autobind
  onNotesValueChange(value: string) {
    this.setState({
      ...this.state,
      notes: value,
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
        <Textarea
          className="notes"
          name={`${this.props.id}-notes`}
          id={`${this.props.id}-notes`}
          value={this.state.notes}
          onChange={this.onNotesValueChange}
        />
      </div>
    );
  }
}

// export default NotesWidget;
