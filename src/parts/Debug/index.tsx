import * as React from 'react';
import SimplePart from '../SimplePart';

export default class Debug extends SimplePart {
  render() {
    return (
      <div className="Debug">{JSON.stringify(this.state)}</div>
    );
  }
}
