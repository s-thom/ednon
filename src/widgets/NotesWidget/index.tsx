import * as React from 'react';
import './index.css';
import {
  IProps,
  IWidget,
} from '../../types';
import iconPath from '../../assets/sharp-speaker_notes-24px.svg';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import useStoredState from '../../useStoredState';
import Card from '../../components/Card';

interface INoteState {
  title: string;
  notes: string;
}

function NotesWidget(props: IProps<INoteState>) {
  const [title, setTitle] = useStoredState(props, 'title', 'New Note');
  const [notes, setNotes] = useStoredState(props, 'notes', '');

  function onTitleValueChange(value: string) {
    setTitle(value);
  }
  function onNotesValueChange(value: string) {
    setNotes(value);
  }

  return (
    <Card className="NotesWidget">
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
        placeholder="Write a note..."
      />
    </Card>
  );
}

const definition: IWidget = {
  title: 'Notes',
  iconPath,
  component: NotesWidget,
};

export default definition;
