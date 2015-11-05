import {
  ADD_LOAN,
  ADD_LOANS,
  TOGGLE_CALCULATED_FIELD,
  UPDATE_MONTHLY_PAYMENT,
  UPDATE_TERM,
} from '../actions/actions';
import loansReducer from './loans';
import Formulas from '../utils/formulas';
import Immutable from 'immutable';

const initialState = {
  loans: Immutable.List(),
  loansSummary: {
    monthsToPaidOff: 0,
    totalAmount: 0,
  },
};

function summaryProperties (loans) {
  return {
    monthsToPaidOff: loans.reduce(function (reduction, loan) {
      return Math.max(reduction, loan.term);
    }, 0),
    totalAmount: loans.reduce(function (reduction, loan) {
      return reduction +
              Formulas.calculateTotalPaid(loan.interestRate,
                                          loan.principal,
                                          loan.term);
    }, 0),
  };
}

export default function (state = initialState, action) {
  switch(action.type) {
  case ADD_LOAN:
  case ADD_LOANS:
  case TOGGLE_CALCULATED_FIELD:
  case UPDATE_MONTHLY_PAYMENT:
  case UPDATE_TERM:
    var loans = loansReducer(state.loans, action);
    return {
      loans,
      loansSummary: summaryProperties(loans),
    };
  default:
    return state;
  }
}
