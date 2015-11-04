import React, { Component } from 'react';

class LoanInfo extends Component {
  render () {
    var totalAmountAsCurrency = '$' + this.props.totalAmount.toFixed(2);
    return (
      <div>
        <h2>I am loan summary!</h2>
        <div>{this.props.monthsToPaidOff} months left till paid off</div>
        <div>You will have paid {totalAmountAsCurrency}</div>
      </div>
    );
  }
}

export default LoanInfo;
