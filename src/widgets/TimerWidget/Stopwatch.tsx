import * as React from 'react';
import TimerDisplay from './TimerDisplay';
import IntervalHelper from '../../IntervalHelper';

interface IStopwatchProps {
  initial?: number;
  running?: boolean;
  onTimeTick?: (ms: number) => void;
  onStart?: (ms: number) => void;
  onStop?: (ms: number) => void;
}

interface IStopwatchState {
  elapsed: number;
  prev: number;
  start: number;
}

export default class Stopwatch extends React.Component<IStopwatchProps, IStopwatchState> {
  private readonly handler: () => void;
  private readonly intervalHelper: IntervalHelper;

  constructor(props: IStopwatchProps) {
    super(props);

    this.state = {
      prev: 0,
      elapsed: this.props.initial || 0,
      start: 0,
    };

    this.handler = () => {
      this.setState({
        ...this.state,
        elapsed: this.state.prev + (Date.now() - this.state.start),
      });

      if (this.props.onTimeTick) {
        this.props.onTimeTick(this.state.elapsed);
      }
    };

    this.intervalHelper = IntervalHelper.getInstance();
  }

  startTimer() {
    if (this.state.start) {
      console.warn('Tried to start stopwatch but it was already running');
      // Ignore, as timer is already running
      return;
    }

    this.setState({
      ...this.state,
      prev: this.props.initial !== undefined ? this.props.initial : this.state.prev || 0,
      elapsed: this.state.elapsed || 0,
      start: Date.now(),
    });

    this.intervalHelper.add(this.handler);

    if (this.props.onStart) {
      this.props.onStart(this.state.elapsed);
    }
  }

  stopTimer() {
    if (!this.state.start) {
      console.warn('Tried to stop stopwatch but it was not running');
      // Ignore, as timer is not running
      return;
    }

    this.intervalHelper.remove(this.handler);

    this.setState({
      ...this.state,
      start: 0,
      prev: this.state.elapsed,
    });

    if (this.props.onStop) {
      this.props.onStop(this.state.elapsed);
    }
  }

  shouldComponentUpdate(nextProps: IStopwatchProps, nextState: IStopwatchState, nextContext) {
    // Don't update if only the initial value changes
    return (
      this.props.running !== nextProps.running ||
      this.state.elapsed !== nextState.elapsed ||
      this.props.onStart !== nextProps.onStart ||
      this.props.onStop !== nextProps.onStop ||
      this.props.onTimeTick !== nextProps.onTimeTick ||
      this.state.prev !== nextState.prev ||
      this.state.start !== nextState.start ||
      false
    );
  }

  componentDidMount() {
    if (this.props.running) {
      this.startTimer();
    }
  }

  componentDidUpdate(prevProps: IStopwatchProps, prevState: IStopwatchState) {
    if (this.props.running && !prevProps.running) {
      this.startTimer();
    } else if (!this.props.running && prevProps.running) {
      this.stopTimer();
    }
  }

  componentWillUnmount() {
    if (this.props.running) {
      this.stopTimer();
    }
  }

  render() {
    return (
      <TimerDisplay ms={this.state.elapsed} />
    );
  }
}
