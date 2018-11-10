
// tslint:disable:match-default-export-name
import TimerWidget from './widgets/TimerWidget';
import NotesWidget from './widgets/NotesWidget';
import ChecklistWidget from './widgets/ChecklistWidget';
// tslint:enable:match-default-export-name
import {
  IWidget,
} from './types';

const WidgetMap = new Map<string, IWidget>();
WidgetMap.set('timer', TimerWidget);
WidgetMap.set('notes', NotesWidget);
WidgetMap.set('checklist', ChecklistWidget);

export default WidgetMap;
