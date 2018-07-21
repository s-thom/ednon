import * as React from 'react';
import './index.css';
import TimerWidget from '../TimerWidget';

class Grid extends React.Component {
  render() {
    return (
      <div className="Grid">
        {this.props.children}
        <TimerWidget id="test" type="timer" data={{
          title: 'foo',
          notes: 'some notes',
          running: false,
        }} />
        <TimerWidget id="test2" type="timer" data={{
          title: 'foobar',
          notes: 'some notes',
          running: false,
        }} />
        <div className="add-new" />
      </div>
    );
  }
}

export default Grid;
