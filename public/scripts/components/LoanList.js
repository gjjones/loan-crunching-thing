import React, { Component } from 'react';
import LoanItem from './LoanItem';

class LoanList extends Component {
  render () {
    let loansMarkup = this.props.loans.map(function (loan) {
      return <LoanItem key={loan.id} loan={loan} />;
    });
    return (
      <div>
        <h2>I am loan info!</h2>
        {loansMarkup}
      </div>
    );
  }
}

export default LoanList;
