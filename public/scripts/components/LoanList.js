/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
/*eslint-enable no-unused-vars*/
import LoanItem from './LoanItem';
import { connect } from 'react-redux';

import {
  toggleCalculatedField,
  updatePrincipal,
  updateInterestRate,
  updateMonthlyPayment,
  updateTerm
} from '../actions/actions';

var LoanList = ({
  loans,
  onLoanToggleCalculatedField,
  onLoanUpdatePrincipal,
  onLoanUpdateInterestRate,
  onLoanUpdateMonthlyPayment,
  onLoanUpdateTerm
}) => (
  <div>
    <h2>I am loan info!</h2>
    {loans.map(loan =>
      <LoanItem
        key={loan.get('id')}
        loan={loan}
        onToggleCalculatedField={() =>
          onLoanToggleCalculatedField(loan.get('id'))
        }
        onUpdatePrincipal={(event) =>
          onLoanUpdatePrincipal(loan.get('id'), event.target.value)
        }
        onUpdateInterestRate={(event) =>
          onLoanUpdateInterestRate(loan.get('id'), event.target.value)
        }
        onUpdateMonthlyPayment={(event) =>
          onLoanUpdateMonthlyPayment(loan.get('id'), event.target.value)
        }
        onUpdateTerm={(event) =>
          onLoanUpdateTerm(loan.get('id'), event.target.value)
        }
      />
    )}
  </div>
)


function mapStateToProps (state) {
  return {
    loans: state.loans
  };
}
function mapDispatchToProps (dispatch) {
  return {
    onLoanToggleCalculatedField: (loanId) => {
      dispatch(toggleCalculatedField(loanId))
    },
    onLoanUpdatePrincipal: (loanId, value) => {
      dispatch(updatePrincipal(loanId, value))
    },
    onLoanUpdateInterestRate: (loanId, value) => {
      dispatch(updateInterestRate(loanId, value))
    },
    onLoanUpdateMonthlyPayment: (loanId, value) => {
      dispatch(updateMonthlyPayment(loanId, value))
    },
    onLoanUpdateTerm: (loanId, value) => {
      dispatch(updateTerm(loanId, value))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoanList);
