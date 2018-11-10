import * as React from 'react';
import ReactSVG from 'react-svg';
import './index.css';
import { IProps } from '../../types';
import iconPath from '../../assets/sharp-timer-24px.svg';
import playIcon from '../../assets/sharp-play_arrow-24px.svg';
import pauseIcon from '../../assets/sharp-pause-24px.svg';
import Input from '../../components/Input';
import useStoredState from '../../useStoredState';
import TimerDisplay from '../../components/TimerDisplay';

interface ITimerState {
  title: string;
  startTime: number;
  previous: number;
  running: boolean;
}

export default function TimerWidget(props: IProps<ITimerState>) {
  const [title, setTitle] = useStoredState(props, 'title', 'New Timer');
  const [startTime, setStartTime] = useStoredState(props, 'startTime', undefined);
  const [previous, setPrevious] = useStoredState(props, 'previous', 0);
  const [running, setRunning] = useStoredState(props, 'running', false);
  console.log(title, startTime, previous, running);

  function onTitleValueChange(value: string) {
    setTitle(value);
  }
  function onToggleClick() {
    if (running) {
      // Stop
      setRunning(false);
      const diff = Date.now() - startTime;
      setPrevious(diff);
    } else {
      setStartTime(Date.now() - previous);
      setRunning(true);
    }
  }

  const previousNow = new Date(Date.now() - previous);
  const actualStartTime = (running && startTime) ? new Date(startTime) : previousNow;
  const displayProps = {
    className: 'timer',
    startTime: actualStartTime,
    endTime: running ? undefined : actualStartTime,
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
