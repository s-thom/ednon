import Widget from './widgets/Widget';
import TimerWidget from './widgets/TimerWidget';
import NotesWidget from './widgets/NotesWidget';
import ChecklistWidget from './widgets/ChecklistWidget';

const WidgetMap = new Map<string, typeof Widget>();
WidgetMap.set('timer', TimerWidget as typeof Widget);
WidgetMap.set('notes', NotesWidget as typeof Widget);
WidgetMap.set('checklist', ChecklistWidget as typeof Widget);

export default WidgetMap;
