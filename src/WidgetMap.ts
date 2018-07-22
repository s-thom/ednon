import Widget from './widgets/Widget';
import TimerWidget from './widgets/TimerWidget';
import NotesWidget from './widgets/NotesWidget';

const WidgetMap = new Map<string, typeof Widget>();
WidgetMap.set('timer', TimerWidget as typeof Widget);
WidgetMap.set('notes', NotesWidget as typeof Widget);

export default WidgetMap;
