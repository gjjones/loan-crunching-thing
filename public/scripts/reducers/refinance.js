import {
  ADD_LOAN,
  ADD_LOANS,
  TOGGLE_CALCULATED_FIELD,
  UPDATE_FIXED_VALUE,
} from '../actions/actions';
import Formulas from '../utils/formulas';
import Immutable from 'immutable';

const initialState = {
  loans: Immutable.List(),
  amountPaidByMonth: Immutable.List(),
  totalAmount: 0,
  monthsToPaidOff: 0,
};

var naiveId = 0;

export default function (state = initialState, action) {
  var loans = state.loans;
  let updatedIndex;
  switch(action.type) {
  case ADD_LOAN:
    let loan = action.loan;
    let term = Formulas.calculateTerm(loan.interestRate,
                                      loan.principal,
                                      loan.monthlyPayment);
    loans = loans.push({...loan, term, id: naiveId++, calculatedTerm: true});
    break;
  case ADD_LOANS:
    let filledInLoans = action.loans.map(function (loan) {
      let term = Formulas.calculateTerm(loan.interestRate,
                                        loan.principal,
                                        loan.monthlyPayment);
      return {...loan, term, id: naiveId++, calculatedTerm: true};
    });
    loans = loans.concat(filledInLoans);
    break;
  case TOGGLE_CALCULATED_FIELD:
    updatedIndex = loans.findIndex(loan => loan.id === action.loanId);
    loans = loans.update(
      updatedIndex,
      loan => ({...loan, calculatedTerm: !loan.calculatedTerm})
    );
    break;
  case UPDATE_FIXED_VALUE:
    updatedIndex = loans.findIndex(loan => loan.id === action.loanId);
    loans = loans.update(
      updatedIndex,
      function (loan) {
        if (loan.calculatedTerm) {
          let term =
            Formulas.calculateTerm(loan.interestRate,
                                    loan.principal,
                                    action.value);
          return {...loan, monthlyPayment: action.value, term}
        }
        else {
          let monthlyPayment =
            Formulas.calculateMonthlyPayment(loan.interestRate,
                                              loan.principal,
                                              action.value);
          return {...loan, monthlyPayment, term: action.value}
        }
      }
    );
    break;
  }

  var monthsToPaidOff = loans.reduce(function (reduction, loan) {
    return Math.max(reduction, loan.term);
  }, 0);

  var totalAmount = loans.reduce(function (reduction, loan) {
    return reduction +
            Formulas.calculateTotalPaid(loan.interestRate,
                                        loan.principal,
                                        loan.term);
  }, 0);

  return {
    loans,
    totalAmount,
    monthsToPaidOff
  };
}
