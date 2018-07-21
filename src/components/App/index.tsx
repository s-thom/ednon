import * as React from 'react';
import './index.css';

import logo from '../../assets/logo.svg';
import Grid from '../Grid';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Grid />
      </div>
    );
  }
}

export default App;
