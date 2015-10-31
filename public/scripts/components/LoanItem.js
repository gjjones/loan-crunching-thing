import React, { Component } from 'react';

class LoanItem extends Component {
  render () {
    return (
      <div style={{float: 'right', width: '50%'}}>
        <h3>I am a loan</h3>
        <div>loan principal: {this.props.loan.principal}</div>
        <div>loan interest rate: {this.props.loan.interestRate}</div>
        <div>loan monthly payment: {this.props.loan.monthlyPayment}</div>
        <div>loan term: {this.props.loan.term}</div>
      </div>
    );
  }
}

export default LoanItem;
