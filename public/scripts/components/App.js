/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
/*eslint-enable no-unused-vars*/
import LoanList from './LoanList';
import LoansSummary from './LoansSummary';
import { connect } from 'react-redux';

import { addLoan, removeAll } from '../actions/actions';

class App extends Component {
  render () {
    return (
      <div>
        <h1>Refinance App</h1>
        <button onClick={this.handleAddClicked.bind(this)}>
          Add Loan
        </button>
        <button onClick={this.handleRemoveAllClicked.bind(this)}>
          Remove All
        </button>
        <LoanList />
        <LoansSummary
          monthsToPaidOff={this.props.monthsToPaidOff}
          totalAmount={this.props.totalAmount}
        />
      </div>
    );
  }

  handleAddClicked () {
    this.props.dispatch(addLoan());
  }

  handleRemoveAllClicked () {
    this.props.dispatch(removeAll());
  }
}

function mapStateToProps (state) {
  return {
    totalAmount: state.loansSummary.totalAmount,
    monthsToPaidOff: state.loansSummary.monthsToPaidOff
  };
}

export default connect(mapStateToProps)(App);
