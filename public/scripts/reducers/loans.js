import {
  ADD_LOAN,
  REMOVE_ALL,
  TOGGLE_CALCULATED_FIELD,
  UPDATE_PRINCIPAL,
  UPDATE_INTEREST_RATE,
  UPDATE_MONTHLY_PAYMENT,
  UPDATE_TERM,
} from '../actions/actions';
import {
  createLoan,
  updatePrincipal,
  updateInterestRate,
  updateMonthlyPayment,
  updateTerm,
} from '../utils/loan';
import Immutable from 'immutable';

const initialState = Immutable.List();


export default function (state = initialState, action) {
  var loans = state;
  let updatedIndex,
    loan;
  switch(action.type) {
  case ADD_LOAN:
    loan = createLoan(action.id);
    return loans.push(loan);
  case REMOVE_ALL:
    return loans.clear();
  case TOGGLE_CALCULATED_FIELD:
    updatedIndex = loans.findIndex(loan => loan.get('id') === action.loanId);
    return loans.update(
      updatedIndex,
      loan => loan.set('calculatedTerm', !loan.get('calculatedTerm'))
    );
  case UPDATE_PRINCIPAL:
    return loans.update(
      loans.findIndex(loan => loan.get('id') === action.loanId),
      loan => updatePrincipal(action.value, loan)
    );
  case UPDATE_INTEREST_RATE:
    return loans.update(
      loans.findIndex(loan => loan.get('id') === action.loanId),
      loan => updateInterestRate(action.value, loan)
    );
  case UPDATE_MONTHLY_PAYMENT:
    return loans.update(
      loans.findIndex(loan => loan.get('id') === action.loanId),
      loan => updateMonthlyPayment(action.value, loan)
    );
  case UPDATE_TERM:
    return loans.update(
      loans.findIndex(loan => loan.get('id') === action.loanId),
      loan => updateTerm(action.value, loan)
    );
  default:
    return state;
  }
}
