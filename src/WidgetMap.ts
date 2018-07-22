import Widget from './widgets/Widget';
import TimerWidget from './widgets/TimerWidget';
import NotesWidget from './widgets/NotesWidget';

const widgetTypes = new Map<string, typeof Widget>();
widgetTypes.set('timer', TimerWidget as typeof Widget);
widgetTypes.set('notes', NotesWidget as typeof Widget);

export default widgetTypes;
