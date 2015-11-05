import {
  ADD_LOAN,
  ADD_LOANS,
  TOGGLE_CALCULATED_FIELD,
  UPDATE_MONTHLY_PAYMENT,
  UPDATE_TERM,
} from '../actions/actions';
import Formulas from '../utils/formulas';
import Immutable from 'immutable';

const initialState = Immutable.List();

var naiveId = 0;

export default function (state = initialState, action) {
  var loans = state;
  let updatedIndex;
  switch(action.type) {
  case ADD_LOAN:
    let loan = action.loan;
    let term = Formulas.calculateTerm(loan.interestRate,
                                      loan.principal,
                                      loan.monthlyPayment);
    return loans.push({...loan, term, id: naiveId++, calculatedTerm: true,});
  case ADD_LOANS:
    let filledInLoans = action.loans.map(function (loan) {
      let term = Formulas.calculateTerm(loan.interestRate,
                                        loan.principal,
                                        loan.monthlyPayment);
      return {...loan, term, id: naiveId++, calculatedTerm: true,};
    });
    return loans.concat(filledInLoans);
  case TOGGLE_CALCULATED_FIELD:
    updatedIndex = loans.findIndex(loan => loan.id === action.loanId);
    return loans.update(
      updatedIndex,
      loan => ({...loan, calculatedTerm: !loan.calculatedTerm,})
    );
  case UPDATE_MONTHLY_PAYMENT:
    return loans.update(
      loans.findIndex(loan => loan.id === action.loanId),
      function (loan) {
        let term =
          Formulas.calculateTerm(loan.interestRate,
                                  loan.principal,
                                  action.value);
        return {...loan, monthlyPayment: action.value, term,};
      }
    );
  case UPDATE_TERM:
    return loans.update(
      loans.findIndex(loan => loan.id === action.loanId),
      function (loan) {
        let monthlyPayment =
          Formulas.calculateMonthlyPayment(loan.interestRate,
                                            loan.principal,
                                            action.value);
        return {...loan, term: action.value, monthlyPayment,};
      }
    );
  default:
    return state;
  }
}
