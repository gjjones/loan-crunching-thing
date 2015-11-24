import {
  ADD_LOAN,
  REMOVE_ALL,
  IMPORT_LOAN,
  IMPORT_LOANS,
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
    loan = createLoan();
    return loans.push(loan);
  case REMOVE_ALL:
    return loans.clear();
  case IMPORT_LOAN:
    loan = createLoan();
    loan = updatePrincipal(action.loan.principal, loan);
    loan = updateInterestRate(action.loan.interestRate, loan);
    loan = updateMonthlyPayment(action.loan.monthlyPayment, loan);
    return loans.push(loan);
  case IMPORT_LOANS:
    let filledInLoans = action.loans.map(function (loanData) {
      var loan = createLoan();
      loan = updatePrincipal(loanData.principal, loan);
      loan = updateInterestRate(loanData.interestRate, loan);
      loan = updateMonthlyPayment(loanData.monthlyPayment, loan);
      return loan;
    });
    return loans.concat(filledInLoans);
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
