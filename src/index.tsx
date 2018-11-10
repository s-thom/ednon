import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
// tslint:disable-next-line:match-default-export-name
import registerServiceWorker from './registerServiceWorker';
import addDomEvents from './addDomEvents';

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
registerServiceWorker();
addDomEvents();
