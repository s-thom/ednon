import * as React from 'react';
import ReactSVG from 'react-svg';
import autobind from 'autobind-decorator';
import './index.css';
import { IProps } from '../../types';
import Widget from '../Widget';
import iconPath from '../../assets/sharp-timer-24px.svg';
import Stopwatch from './Stopwatch';
import { createMinPeriodTimeout } from '../../util';

const STOPWATCH_DB_UPDATE_PERIOD = 1000;

interface ITimerState {
  title: string;
  elapsed: number;
  running: boolean;
}

class TimerWidget extends Widget<ITimerState> {
  static title = 'Timer';
  private tickHandler: (ms: number) => void;

  static renderIcon() {
    return (
      <ReactSVG path={iconPath} className="icon" />
    );
  }

  static getDefaultData() {
    return {
      title: 'New Timer',
      elapsed: 0,
      running: false,
    };
  }

  constructor(props: IProps<ITimerState>) {
    super(props);

    this.state = props.data;

    this.tickHandler = createMinPeriodTimeout(
      (ms: number) => {
        this.setState({
          ...this.state,
          elapsed: ms,
        });
      },
      STOPWATCH_DB_UPDATE_PERIOD,
    );
  }

  @autobind
  onToggleClick() {
    this.setState({
      ...this.state,
      running: !this.state.running,
    });
  }

  @autobind
  onTimerStart(ms) {
    this.setState({
      ...this.state,
      elapsed: ms,
    });
  }

  @autobind
  onTimerStop(ms) {
    this.setState({
      ...this.state,
      elapsed: ms,
    });
  }

  @autobind
  onTitleChange(event: React.FormEvent) {
    this.setState({
      ...this.state,
      title: (event.target as any).value,
    });
  }

  @autobind
  onNotesChange(event: React.FormEvent) {
    this.setState({
      ...this.state,
      notes: (event.target as any).value,
    });
  }

  render() {
    return (
      <div className="TimerWidget">
        <input
          className="title"
          type="text"
          name={`${this.props.id}-title`}
          id={`${this.props.id}-title`}
          value={this.state.title}
          onChange={this.onTitleChange}
        />
        <button
          className="toggle"
          onClick={this.onToggleClick}
        >
          <Stopwatch
            running={this.state.running}
            initial={this.state.elapsed}
            onTimeTick={this.tickHandler}
            onStart={this.tickHandler}
            onStop={this.tickHandler}
          />
        </button>
      </div>
    );
  }
}

export default TimerWidget;
