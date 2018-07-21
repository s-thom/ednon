import * as React from 'react';
import { zeroPad } from '../../util';

interface IProps {
  ms: number;
  separator?: string;
}

const secondsNum = 1000;
const minutesNum = secondsNum * 60;
const hoursNum = minutesNum * 60;

export default function TimerDisplay(props: IProps) {
  const hours = zeroPad(Math.floor(props.ms / hoursNum), 2);
  const minutes = zeroPad(Math.floor((props.ms % hoursNum) / minutesNum), 2);
  const seconds = zeroPad(Math.floor((props.ms % minutesNum) / secondsNum), 2);
  const milliseconds = zeroPad(Math.floor(props.ms % secondsNum), 3);

  const separator = props.separator || ':';

  return (
    <span className="TimerDisplay">
      <span className="hours">{hours}</span>
      <span className="separator">{separator}</span>
      <span className="minutes">{minutes}</span>
      <span className="separator">{separator}</span>
      <span className="seconds">{seconds}</span>
      <span className="separator">{separator}</span>
      <span className="milliseconds">{milliseconds}</span>
    </span>
  );
}
