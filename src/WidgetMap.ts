import Widget from './widgets/Widget';
import TimerWidget from './widgets/TimerWidget';

const widgetTypes = new Map<string, typeof Widget>();
widgetTypes.set('timer', TimerWidget as typeof Widget);

export default widgetTypes;
