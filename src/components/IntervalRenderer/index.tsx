import * as React from 'react';

interface IProps {
  children: (ms: number) => JSX.Element;
  value?: number;
  running?: boolean;
  onStart?: (ms: number) => void;
  onStop?: (ms: number) => void;
}

type HandleFunction = () => any;

interface IState {
  start: number;
  elapsed: number;
  prev: number;
  handler: HandleFunction;
}

let animFrameHandle: number;
const functions: HandleFunction[] = [];

function animFrameFn() {
  functions.forEach((fn) => {
    try {
      fn();
    } catch (err) {
      console.error('Interval handle threw error', err);
    }
  });

  animFrameHandle = requestAnimationFrame(animFrameFn);
}

function addLoop(fn: HandleFunction) {
  const index = functions.indexOf(fn);
  if (index > -1) {
    throw new Error('Handler already added');
  }

  if (!animFrameHandle) {
    animFrameHandle = requestAnimationFrame(animFrameFn);
  }

  functions.push(fn);
}

function removeLoop(fn: HandleFunction) {
  const index = functions.indexOf(fn);
  if (index === -1) {
    throw new Error('Handler already removed');
  }

  functions.splice(index, 1);

  if (functions.length === 0) {
    cancelAnimationFrame(animFrameHandle);
    animFrameHandle = 0;
  }
}

class IntervalRenderer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      start: 0,
      elapsed: props.value || 0,
      prev: 0,
      handler: () => {
        this.setState({
          ...this.state,
          elapsed: this.state.prev + (Date.now() - this.state.start),
        });
      },
    };
  }

  componentDidMount() {
    if (this.props.running !== false) {
      this.startTimer();
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer() {
    if (this.state.start) {
      // Ignore, as timer is already running
      return;
    }

    this.setState({
      ...this.state,
      prev: this.props.value !== undefined ? this.props.value : this.state.prev || 0,
      elapsed: this.state.elapsed || 0,
      start: Date.now(),
    });

    addLoop(this.state.handler);

    if (this.props.onStart) {
      this.props.onStart(this.state.elapsed);
    }
  }

  stopTimer() {
    if (!this.state.start) {
      // Ignore, as timer is not running
      return;
    }

    removeLoop(this.state.handler);

    this.setState({
      ...this.state,
      start: 0,
      prev: this.state.elapsed,
    });

    if (this.props.onStop) {
      this.props.onStop(this.state.elapsed);
    }
  }

  componentDidUpdate() {
    if (this.props.running === false) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  }

  render() {
    return this.props.children(this.state.elapsed);
  }
}

export default IntervalRenderer;
