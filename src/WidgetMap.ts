import Widget from './widgets/Widget';
import TimerWidget from './widgets/TimerWidget';
import NotesWidget from './widgets/NotesWidget';
import ChecklistWidget from './widgets/ChecklistWidget';
import { IProps, IState } from './types';

export type WidgetType = (typeof Widget) | ((props: IProps<IState>) => JSX.Element);

const WidgetMap = new Map<string, WidgetType>();
WidgetMap.set('timer', TimerWidget as typeof Widget);
WidgetMap.set('notes', NotesWidget);
WidgetMap.set('checklist', ChecklistWidget as typeof Widget);

export default WidgetMap;
