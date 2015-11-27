/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-enable no-unused-vars*/
import ReactDOM from 'react-dom';
import { Provider, } from 'react-redux';
import App from './components/App';

import { createStore, } from 'redux';
import refinance from './reducers/refinance';

var store = createStore(refinance);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
