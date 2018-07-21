import * as React from 'react';
import ReactSVG from 'react-svg';
import autobind from 'autobind-decorator';
import IntervalRenderer from './IntervalRenderer';
import TimerDisplay from './TimerDisplay';
import './index.css';
import { IProps } from '../../types';
import Widget from '../Widget';
import iconPath from '../../assets/sharp-timer-24px.svg';

interface ITimerState {
  title: string;
  notes: string;
  elapsed: number;
  running: boolean;
}

class TimerWidget extends Widget<ITimerState> {
  static title = 'Timer';

  static renderIcon() {
    return (
      <ReactSVG path={iconPath} className="icon" />
    );
  }

  static getDefaultData() {
    return {
      title: 'New Timer',
      notes: 'Note...',
      elapsed: 0,
      running: false,
    };
  }

  constructor(props: IProps<ITimerState>) {
    super(props);

    this.state = props.data;
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
        <textarea
          className="notes"
          name={`${this.props.id}-notes`}
          id={`${this.props.id}-notes`}
          value={this.state.notes}
          onChange={this.onNotesChange}
        />
        <IntervalRenderer
          running={this.state.running}
          onStart={this.onTimerStart}
          onStop={this.onTimerStop}
          value={this.state.elapsed}
        >
          {
            (ms) => <TimerDisplay ms={ms} />
          }
        </IntervalRenderer>
        <button className="toggle primary-button" type="button" onClick={this.onToggleClick}>Toggle</button>
      </div>
    );
  }
}

export default TimerWidget;
