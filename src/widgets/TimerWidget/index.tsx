import * as React from 'react';
import ReactSVG from 'react-svg';
import autobind from 'autobind-decorator';
import './index.css';
import { IProps } from '../../types';
import Widget from '../Widget';
import iconPath from '../../assets/sharp-timer-24px.svg';
import clearIcon from '../../assets/sharp-close-24px.svg';
import playIcon from '../../assets/sharp-play_arrow-24px.svg';
import pauseIcon from '../../assets/sharp-pause-24px.svg';
import Stopwatch from './Stopwatch';
import { createMinPeriodTimeout } from '../../util';
import Input from 'src/components/Input';

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
  onClearClick() {
    this.setState({
      ...this.state,
      running: false,
      elapsed: 0,
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
  onTitleValueChange(value: string) {
    this.setState({
      ...this.state,
      title: value,
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
        <Input
          className="title"
          name={`${this.props.id}-title`}
          id={`${this.props.id}-title`}
          value={this.state.title}
          onChange={this.onTitleValueChange}
        />
        <div className="button-row">
          <button
            className="toggle"
            onClick={this.onToggleClick}
          >
            <ReactSVG path={this.state.running ? pauseIcon : playIcon} className="icon" />
          </button>
        </div>
        <Stopwatch
          running={this.state.running}
          initial={this.state.elapsed}
          onTimeTick={this.tickHandler}
          onStart={this.tickHandler}
          onStop={this.tickHandler}
        />
      </div>
    );
  }
}

export default TimerWidget;
