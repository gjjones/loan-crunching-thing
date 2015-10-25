import React, { Component } from 'react';
import LoanInfo from './LoanInfo';
import { connect } from 'react-redux';

class App extends Component {
  render () {
    return (
      <div>
        <h1>Refinance App</h1>
        <LoanInfo
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
    monthsToPaidOff: state.monthsToPaidOff
  }
}

export default connect(mapStateToProps)(App);