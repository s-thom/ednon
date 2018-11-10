import * as React from 'react';

import './index.css';
import { zeroPad, stringAppendWithSpace } from '../../util';

const {
  useEffect,
  useRef,
} = React;

const MS_PER_S = 1000;
const MS_PER_M = MS_PER_S * 60;
const MS_PER_H = MS_PER_M * 60;

interface ITimerDisplayProps {
  startTime?: Date;
  endTime?: Date;
  separator?: string;
  className?: string;
}

function dateDiff(props: ITimerDisplayProps) {
  const start = props.startTime || new Date();
  const end = props.endTime || new Date();
  return end.getTime() - start.getTime();
}

function msToComponents(ms: number) {
  const hours = zeroPad(Math.floor(ms / MS_PER_H), 2);
  const minutes = zeroPad(Math.floor((ms % MS_PER_H) / MS_PER_M), 2);
  const seconds = zeroPad(Math.floor((ms % MS_PER_M) / MS_PER_S), 2);
  const milliseconds = zeroPad(Math.floor(ms % MS_PER_S), 3);

  return {
    hours,
    minutes,
    seconds,
    milliseconds,
  };
}

export default function TimerDisplay(props: ITimerDisplayProps) {
  const hRef = useRef<HTMLSpanElement>(null);
  const mRef = useRef<HTMLSpanElement>(null);
  const sRef = useRef<HTMLSpanElement>(null);
  const msRef = useRef<HTMLSpanElement>(null);

  // The timer is not changing if both times are set, or if both are unset (and default to now)
  // So it is changing if either is set (but not both)
  const isChanging = (props.startTime || props.endTime) && !(props.startTime && props.endTime);

  useEffect(() => {
    let animationFrame;

    if (isChanging) {
      const animFn = () => {
        const {
          hours: animHrs,
          minutes: animMins,
          seconds: animSecs,
          milliseconds: animMs,
        } = msToComponents(dateDiff(props));

        if (hRef.current) {
          hRef.current.textContent = animHrs;
        }
        if (mRef.current) {
          mRef.current.textContent = animMins;
        }
        if (sRef.current) {
          sRef.current.textContent = animSecs;
        }
        if (msRef.current) {
          msRef.current.textContent = animMs;
        }

        animationFrame = requestAnimationFrame(animFn);
      };

      animFn();
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  });

  const {
    hours,
    minutes,
    seconds,
    milliseconds,
  } = msToComponents(dateDiff(props));

  const separator = props.separator || ':';

  return (
    <span className={stringAppendWithSpace('TimerDisplay', props.className)}>
      <span className="hours" ref={hRef}>{hours}</span>
      <span className="separator">{separator}</span>
      <span className="minutes" ref={mRef}>{minutes}</span>
      <span className="separator">{separator}</span>
      <span className="seconds" ref={sRef}>{seconds}</span>
      <span className="separator">{separator}</span>
      <span className="milliseconds" ref={msRef}>{milliseconds}</span>
    </span>
  );
}
