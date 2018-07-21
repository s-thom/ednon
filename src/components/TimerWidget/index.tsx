import * as React from 'react';
import IntervalRenderer from '../IntervalRenderer';
import TimerDisplay from '../TimerDisplay';
// import './index.css';

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

    this.oTC = this.onToggleClick.bind(this);
  }

  onToggleClick() {
    this.setState({
      ...this.state,
      running: !this.state.running,
    });
  }

  render() {
    return (
      <div className="TimerWidget">
        <input type="text" name={`${this.props.id}-title`} id={`${this.props.id}-title`} value={this.state.title}/>
        <textarea name={`${this.props.id}-notes`} id={`${this.props.id}-notes`} value={this.state.notes}/>
        <IntervalRenderer running={this.state.running}>
          {
            (ms) => <TimerDisplay ms={ms} />
          }
        </IntervalRenderer>
        <button type="button" onClick={this.oTC}>Toggle</button>
      </div>
    );
  }
}

export default TimerWidget;
