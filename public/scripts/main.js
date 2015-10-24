import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'

import { createStore } from 'redux';
import refinance from './reducers/refinance';
import { addLoan, addLoans } from './actions/actions';

var store = createStore(refinance);

import nelnet from './nelnet';
import mohela from './mohela';
store.dispatch(addLoans(nelnet));
store.dispatch(addLoan(mohela));

ReactDOM.render(
    <App />,
    document.getElementById('app')
);