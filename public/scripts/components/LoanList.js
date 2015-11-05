/*eslint-disable no-unused-vars*/
import React, { Component, } from 'react';
/*eslint-enable no-unused-vars*/
import LoanItem from './LoanItem';
import { connect, } from 'react-redux';

import {
  toggleCalculatedField,
  updateMonthlyPayment,
  updateTerm,
} from '../actions/actions';

class LoanList extends Component {
  render () {
    let loansMarkup = this.props.loans.map(function (loan, index) {
      return <LoanItem
                key={index}
                loan={loan}
                onToggleCalculatedField={this.toggleCalculatedField.bind(this)}
                onUpdateMonthlyPayment={this.updateMonthlyPayment.bind(this)}
                onUpdateTerm={this.updateTerm.bind(this)}
              />;
    }.bind(this));
    return (
      <div>
        <h2>I am loan info!</h2>
        {loansMarkup}
      </div>
    );
  }

  toggleCalculatedField (loanId) {
    this.props.dispatch(toggleCalculatedField(loanId));
  }

  updateMonthlyPayment (loanId, event) {
    this.props.dispatch(updateMonthlyPayment(loanId, event.target.value));
  }

  updateTerm (loanId, event) {
    this.props.dispatch(updateTerm(loanId, event.target.value));
  }
}

function mapStateToProps (state) {
  return {
    loans: state.loans,
  };
}

export default connect(mapStateToProps)(LoanList);
