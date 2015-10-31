import { ADD_LOAN, ADD_LOANS } from '../actions/actions';
import Formulas from '../utils/formulas';
import Immutable from 'immutable';

const initialState = {
  loans: Immutable.List(),
  amountPaidByMonth: Immutable.List(),
  totalAmount: 0,
  monthsToPaidOff: 0
};

var naiveId = 0;

export default function (state = initialState, action) {
  var loans = state.loans;
  switch(action.type) {
  case ADD_LOAN:
    let loan = action.loan;
    let term = Formulas.calculateTerm(loan.interestRate,
                                      loan.principal,
                                      loan.monthlyPayment);
    loans = loans.push({...loan, term, id: naiveId++});
    break;
  case ADD_LOANS:
    let filledInLoans = action.loans.map(function (loan) {
      let term = Formulas.calculateTerm(loan.interestRate,
                                        loan.principal,
                                        loan.monthlyPayment);
      return {...loan, term, id: naiveId++};
    });
    loans = loans.concat(filledInLoans);
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
