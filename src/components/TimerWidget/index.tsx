import * as React from 'react';
import autobind from 'autobind-decorator';
import IntervalRenderer from '../IntervalRenderer';
import TimerDisplay from '../TimerDisplay';
import './index.css';

interface ITimerState {
  title: string;
  notes: string;
  elapsed: number;
  running: boolean;
}

class TimerWidget extends React.Component<IDefinition, ITimerState> {
  private readonly oTC: () => void;

  constructor(props: IDefinition) {
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

  render() {
    return (
      <div className="TimerWidget">
        <input className="title" type="text" name={`${this.props.id}-title`} id={`${this.props.id}-title`} value={this.state.title}/>
        <textarea className="notes" name={`${this.props.id}-notes`} id={`${this.props.id}-notes`} value={this.state.notes}/>
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
