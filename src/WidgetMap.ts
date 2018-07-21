import Widget from './components/Widget';
import TimerWidget from './components/TimerWidget';

const widgetTypes = new Map<string, typeof Widget>();
widgetTypes.set('timer', TimerWidget as typeof Widget);

export default widgetTypes;
