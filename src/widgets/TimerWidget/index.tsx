import * as React from 'react';
import ReactSVG from 'react-svg';
import './index.css';
import {
  IProps,
  IWidget,
} from '../../types';
import iconPath from '../../assets/sharp-timer-24px.svg';
import playIcon from '../../assets/sharp-play_arrow-24px.svg';
import pauseIcon from '../../assets/sharp-pause-24px.svg';
import Input from '../../components/Input';
import useStoredState from '../../useStoredState';
import TimerDisplay from '../../components/TimerDisplay';

interface ITimerState {
  title: string;
  savedTime: number;
  running: boolean;
}

function TimerWidget(props: IProps<ITimerState>) {
  const [title, setTitle] = useStoredState(props, 'title', 'New Timer');
  const [savedTime, setSavedTime] = useStoredState(props, 'savedTime', 0);
  const [running, setRunning] = useStoredState(props, 'running', false);

  const [startDate, setStartDate] = React.useState(0);

  function onTitleValueChange(value: string) {
    setTitle(value);
  }
  function onToggleClick() {
    if (running) {
      // Stop
      setRunning(false);
      const diff = Date.now() - startDate;
      setSavedTime(savedTime + diff);
      setStartDate(0);
    } else {
      setStartDate(Date.now());
      setRunning(true);
    }
  }

  const now = Date.now();
  const runningStart = running ? startDate : now;
  const apparentStart = new Date(runningStart - savedTime);
  const apparentEnd = running ? undefined : new Date(now);

  const displayProps = {
    className: 'timer',
    startTime: apparentStart,
    endTime: running ? undefined : apparentEnd,
  };

  return (
    <div className="TimerWidget">
      <Input
        className="title"
        value={title}
        onChange={onTitleValueChange}
        id={`${props.id}-title`}
        name={`${props.id}-title`}
      />
      <div className="button-row">
        <button
          className="toggle"
          onClick={onToggleClick}
        >
          <ReactSVG path={running ? pauseIcon : playIcon} className="icon" />
        </button>
      </div>
      <TimerDisplay {...displayProps} />
    </div>
  );
}

const definition: IWidget = {
  title: 'Timer',
  iconPath,
  component: TimerWidget,
};

export default definition;
