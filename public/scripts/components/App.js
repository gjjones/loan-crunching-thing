/*eslint-disable no-unused-vars*/
import React, { Component, } from 'react';
/*eslint-enable no-unused-vars*/
import LoanList from './LoanList';
import LoansSummary from './LoansSummary';
import { connect, } from 'react-redux';

class App extends Component {
  render () {
    return (
      <div>
        <h1>Refinance App</h1>
        <LoanList />
        <LoansSummary
          monthsToPaidOff={this.props.monthsToPaidOff}
          totalAmount={this.props.totalAmount}
        />
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    totalAmount: state.totalAmount,
    monthsToPaidOff: state.monthsToPaidOff,
  };
}

export default connect(mapStateToProps)(App);
